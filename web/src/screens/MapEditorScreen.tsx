import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';

import { Button, Panel } from '../components';
import { useUiStore } from '../store/uiStore';
import {
  type CustomMap,
  type HexTypeName,
  type PortTypeName,
  type FacingName,
  type EditorOverlay,
  type EditorBoardSize,
  emptyMap,
  parseCoord,
  encodeCoord,
  parseMapJson,
  serializeMapJson,
  validate,
  boardSizeForMap,
  minimumBoardSizeForMap,
  mapWithInferredLandAreas,
  MIN_BOARD_HEIGHT,
  MIN_BOARD_WIDTH,
  MAX_BOARD_HEIGHT,
  MAX_BOARD_WIDTH,
  HEX_TYPE_NAMES,
  PORT_TYPE_NAMES,
  FACING_NAMES,
  EDITOR_TEMPLATES,
  autoBalanceDice,
  replaceTerrain,
  fillWaterRing,
  analyzeMapBalance,
  targetForIssue,
  edgesAroundHex,
} from '../map-editor';
import {
  placeHex,
  clearHex,
  setHexDice,
  setHexLandArea,
  placePortAutoFacing,
  placePortNearHex,
  clearNearestPortToHex,
  smartFillPorts,
  clearAllPorts,
  clearPort,
  placePort,
  toggleRobber,
  togglePirate,
  setName,
  setDescription,
  togglePlayerCount,
  setPlayerCounts,
  setShuffle,
  setBoardSize,
  indexOfHexAt,
  indexOfPortAt,
} from '../map-editor/editorActions';
import { SAMPLE_MAP_JSON } from '../map-editor/sampleMapData';
import { EditorCanvas, type EditorTool } from '../map-editor/components/EditorCanvas';
import { EditorPalette } from '../map-editor/components/EditorPalette';
import { ValidationPanel } from '../map-editor/components/ValidationPanel';
import { ImportExportPanel } from '../map-editor/components/ImportExportPanel';
import { MapReadinessPanel } from '../map-editor/components/MapReadinessPanel';
import styles from './MapEditorScreen.module.css';

const AUTOSAVE_KEY = 'jsettlers.mapEditor.draft.v2';
const AUTOSAVE_ENABLED = import.meta.env.MODE !== 'test';
const HISTORY_LIMIT = 80;
const DICE_CHOICES = [0, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12] as const;

type EditorSelection =
  | { kind: 'hex'; coord: number }
  | { kind: 'port'; edge: number }
  | null;

interface EditorHistory {
  past: CustomMap[];
  present: CustomMap;
  future: CustomMap[];
}

/**
 * Standalone visual board/map editor (Phase 5).
 *
 * Composes the map-editor data layer (`src/map-editor/`: schema, validation,
 * mutation actions) with an interactive SVG canvas, a tool palette, a live
 * validation panel, and import/export of `.map.json`. The exported document is
 * byte-compatible with the Java `soc.server.CustomMapValidator` (proven by the
 * Playwright round-trip in `web/e2e/map-editor.spec.ts`).
 *
 * The "Back" action returns to the lobby/connect flow via the UI store's appView.
 */
export function MapEditorScreen(): JSX.Element {
  const setAppView = useUiStore((s) => s.setAppView);

  const [history, setHistory] = useState<EditorHistory>(() => ({
    past: [],
    present: loadDraftMap(),
    future: [],
  }));
  const map = history.present;
  const setMap = useCallback((updater: CustomMap | ((map: CustomMap) => CustomMap)): void => {
    setHistory((h) => {
      const next = typeof updater === 'function' ? updater(h.present) : updater;
      if (sameMap(next, h.present)) {
        return h;
      }
      return {
        past: [...h.past, h.present].slice(-HISTORY_LIMIT),
        present: next,
        future: [],
      };
    });
  }, []);
  const undo = useCallback((): void => {
    setHistory((h) => {
      if (h.past.length === 0) {
        return h;
      }
      const present = h.past[h.past.length - 1];
      return {
        past: h.past.slice(0, -1),
        present,
        future: [h.present, ...h.future].slice(0, HISTORY_LIMIT),
      };
    });
  }, []);
  const redo = useCallback((): void => {
    setHistory((h) => {
      if (h.future.length === 0) {
        return h;
      }
      const present = h.future[0];
      return {
        past: [...h.past, h.present].slice(-HISTORY_LIMIT),
        present,
        future: h.future.slice(1),
      };
    });
  }, []);

  // Palette selections (what the next click paints).
  const [tool, setTool] = useState<EditorTool>('hex');
  const [hexType, setHexType] = useState<HexTypeName>('clay');
  const [diceNum, setDiceNum] = useState<number>(6);
  const [landArea, setLandArea] = useState<number>(1);
  const [portType, setPortType] = useState<PortTypeName>('misc');
  const [portFacing, setPortFacing] = useState<FacingName>('SE');
  const [showCoordinates, setShowCoordinates] = useState<boolean>(false);
  const [overlay, setOverlay] = useState<EditorOverlay>('none');
  const [previewMode, setPreviewMode] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(1);
  const [panMode, setPanMode] = useState<boolean>(false);
  const [selection, setSelection] = useState<EditorSelection>(null);
  const [highlight, setHighlight] = useState<EditorSelection>(null);
  const canvasViewportRef = useRef<HTMLDivElement | null>(null);
  const panRef = useRef<{ x: number; y: number; left: number; top: number } | null>(null);

  // Live validation, recomputed whenever the map changes.
  const issues = useMemo(() => validate(map), [map]);
  const errorCount = issues.filter((issue) => issue.severity === 'error').length;
  const warningCount = issues.filter((issue) => issue.severity === 'warning').length;
  const boardSize = useMemo(() => boardSizeForMap(map), [map]);
  const minBoardSize = useMemo(() => minimumBoardSizeForMap(map), [map]);
  const balance = useMemo(() => analyzeMapBalance(map, issues), [map, issues]);

  useEffect(() => {
    if (!AUTOSAVE_ENABLED) {
      return;
    }
    try {
      window.localStorage.setItem(AUTOSAVE_KEY, serializeMapJson(map));
    } catch {
      // Ignore storage failures; editing must remain usable in private contexts.
    }
  }, [map]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if (isTypingTarget(event.target)) {
        return;
      }
      const key = event.key.toLowerCase();
      if ((event.metaKey || event.ctrlKey) && key === 'z') {
        event.preventDefault();
        if (event.shiftKey) {
          redo();
        } else {
          undo();
        }
        return;
      }
      if ((event.metaKey || event.ctrlKey) && key === 'y') {
        event.preventDefault();
        redo();
        return;
      }
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }
      const toolByKey: Partial<Record<string, EditorTool>> = {
        h: 'hex',
        d: 'dice',
        a: 'area',
        p: 'port',
        r: 'robber',
        i: 'pirate',
      };
      const nextTool = toolByKey[key];
      if (nextTool !== undefined) {
        event.preventDefault();
        setTool(nextTool);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [redo, undo]);

  const scrollSelectionIntoView = useCallback((next: EditorSelection): void => {
    if (next === null) {
      return;
    }
    window.setTimeout(() => {
      const id = next.kind === 'hex' ? `editor-hex-${encodeCoord(next.coord)}` : `editor-port-${encodeCoord(next.edge)}`;
      const target = document.querySelector(`[data-testid="${id}"]`);
      if (target !== null && typeof target.scrollIntoView === 'function') {
        target.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' });
      }
    }, 0);
  }, []);

  const zoomBy = (delta: number): void => {
    setZoom((z) => clampNumber(Math.round((z + delta) * 100) / 100, 0.65, 1.9));
  };

  const fitBoard = (): void => {
    setZoom(1);
    window.setTimeout(() => {
      const viewport = canvasViewportRef.current;
      if (viewport !== null) {
        viewport.scrollLeft = 0;
        viewport.scrollTop = 0;
      }
    }, 0);
  };

  const fitContent = (): void => {
    setZoom(1.25);
    scrollSelectionIntoView(selection);
  };

  const startPan = (event: React.PointerEvent<HTMLDivElement>): void => {
    if (!panMode) {
      return;
    }
    const viewport = canvasViewportRef.current;
    if (viewport === null) {
      return;
    }
    event.preventDefault();
    viewport.setPointerCapture(event.pointerId);
    panRef.current = {
      x: event.clientX,
      y: event.clientY,
      left: viewport.scrollLeft,
      top: viewport.scrollTop,
    };
  };

  const movePan = (event: React.PointerEvent<HTMLDivElement>): void => {
    const start = panRef.current;
    const viewport = canvasViewportRef.current;
    if (start === null || viewport === null) {
      return;
    }
    viewport.scrollLeft = start.left - (event.clientX - start.x);
    viewport.scrollTop = start.top - (event.clientY - start.y);
  };

  const stopPan = (): void => {
    panRef.current = null;
  };

  // --- Canvas interaction handlers ---------------------------------------
  const handleHexClick = (coord: number, alt: boolean): void => {
    setSelection({ kind: 'hex', coord });
    setHighlight(null);
    switch (tool) {
      case 'hex':
        setMap((m) => (alt ? clearHex(m, coord) : placeHex(m, coord, hexType, landArea)));
        break;
      case 'dice':
        // Dice tool only applies to a placed hex; clicking empty does nothing.
        setMap((m) =>
          indexOfHexAt(m, coord) >= 0 ? setHexDice(m, coord, alt ? 0 : diceNum) : m,
        );
        break;
      case 'area':
        setMap((m) => (alt ? m : setHexLandArea(m, coord, landArea)));
        break;
      case 'robber':
        setMap((m) => (alt ? clearRobberAt(m, coord) : toggleRobber(m, coord)));
        break;
      case 'pirate':
        setMap((m) => (alt ? clearPirateAt(m, coord) : togglePirate(m, coord)));
        break;
      case 'port':
        setMap((m) =>
          alt ? clearNearestPortToHex(m, coord) : placePortNearHex(m, coord, portType, portFacing),
        );
        break;
      default:
        break;
    }
  };

  const handlePortClick = (edge: number, alt: boolean): void => {
    if (tool !== 'port') {
      setSelection({ kind: 'port', edge });
      return;
    }
    setSelection({ kind: 'port', edge });
    setHighlight(null);
    setMap((m) => (alt ? clearPort(m, edge) : placePortAutoFacing(m, edge, portType, portFacing)));
  };

  // --- Metadata + IO handlers --------------------------------------------
  const loadMap = (next: CustomMap): void => {
    setMap(mapWithInferredLandAreas(ensureEditorBoardSize(next)));
    setSelection(null);
    setHighlight(null);
  };

  const handleNew = (): void => {
    if (
      map.landHexes.length === 0 ||
      // eslint-disable-next-line no-alert
      window.confirm('Start a new empty map? Unsaved changes will be lost.')
    ) {
      setMap(emptyMap());
      setSelection(null);
      setHighlight(null);
    }
  };

  const handleIssueClick = (issueIndex: number): void => {
    const target = targetForIssue(issues[issueIndex], map);
    const next =
      target.kind === 'hex' && target.coord !== undefined
        ? { kind: 'hex' as const, coord: target.coord }
        : target.kind === 'port' && target.edge !== undefined
          ? { kind: 'port' as const, edge: target.edge }
          : null;
    setHighlight(next);
    if (next !== null) {
      setSelection(next);
      scrollSelectionIntoView(next);
    } else if (target.field !== undefined) {
      focusField(target.field);
    }
  };

  const applyTemplate = (templateId: string): void => {
    const template = EDITOR_TEMPLATES.find((t) => t.id === templateId);
    if (template === undefined) {
      return;
    }
    loadMap(template.create());
  };

  const mutateSelectedHex = (coord: number, updater: (map: CustomMap, coord: number) => CustomMap): void => {
    setMap((m) => updater(m, coord));
    setSelection({ kind: 'hex', coord });
  };

  const mutateSelectedPort = (edge: number, updater: (map: CustomMap, edge: number) => CustomMap): void => {
    setMap((m) => updater(m, edge));
    setSelection({ kind: 'port', edge });
  };

  return (
    <div className={styles.wrap} data-testid="map-editor-screen">
      <header className={styles.header}>
        <div className={styles.headerText}>
          <h2 className={styles.title}>Map Editor</h2>
          <p className={styles.subtitle}>
            Design a custom board and export it as a <code>.map.json</code> file.
          </p>
        </div>
        <span className={styles.headerSpacer} />
        <Button variant="secondary" size="sm" data-testid="editor-new" onClick={handleNew}>
          New map
        </Button>
        <Button
          variant="ghost"
          size="sm"
          data-testid="map-editor-back"
          onClick={() => setAppView('lobby')}
        >
          ← Back to lobby
        </Button>
      </header>

      <div className={styles.layout}>
        <EditorPalette
          map={map}
          tool={tool}
          onToolChange={setTool}
          hexType={hexType}
          onHexTypeChange={setHexType}
          diceNum={diceNum}
          onDiceNumChange={setDiceNum}
          landArea={landArea}
          onLandAreaChange={setLandArea}
          portType={portType}
          onPortTypeChange={setPortType}
          portFacing={portFacing}
          onPortFacingChange={setPortFacing}
          onSmartPorts={() => setMap((m) => smartFillPorts(m))}
          onClearPorts={() => setMap((m) => clearAllPorts(m))}
          onNameChange={(name) => setMap((m) => setName(m, name))}
          onDescriptionChange={(d) => setMap((m) => setDescription(m, d))}
          onTogglePlayerCount={(c) => setMap((m) => togglePlayerCount(m, c))}
          onPlayerCountsChange={(counts) => setMap((m) => setPlayerCounts(m, counts))}
          onShuffleChange={(b) => setMap((m) => setShuffle(m, b))}
        />

        <div className={styles.workbench}>
          <div className={styles.boardColumn}>
            <Panel
              title="Board"
              flushBody
              className={styles.canvasPanel}
              data-testid="editor-board"
              headerActions={
                <div className={styles.boardActions}>
                  <span className={styles.statusReadout} data-testid="editor-map-stats">
                    {balance.readinessScore}% ready · {map.landHexes.length} hexes · {(map.ports ?? []).length} ports
                    · {errorCount} errors
                    {warningCount > 0 ? ` · ${warningCount} warnings` : ''}
                  </span>
                  <label className={styles.viewToggle}>
                    <input
                      type="checkbox"
                      checked={showCoordinates}
                      onChange={(e) => setShowCoordinates(e.target.checked)}
                    />
                    Coords
                  </label>
                </div>
              }
            >
              <EditorWorkflowBar
                canUndo={history.past.length > 0}
                canRedo={history.future.length > 0}
                zoom={zoom}
                panMode={panMode}
                previewMode={previewMode}
                overlay={overlay}
                onUndo={undo}
                onRedo={redo}
                onZoomOut={() => zoomBy(-0.12)}
                onZoomIn={() => zoomBy(0.12)}
                onFitBoard={fitBoard}
                onFitContent={fitContent}
                onPanModeChange={setPanMode}
                onPreviewModeChange={setPreviewMode}
                onOverlayChange={setOverlay}
                onBalanceDice={() => setMap((m) => autoBalanceDice(m))}
                onWaterRing={() => setMap((m) => fillWaterRing(m))}
                onReplaceTerrain={() => setMap((m) => replaceTerrain(m, hexType, 'water'))}
              />
              <BoardSizeControls
                size={boardSize}
                minimum={minBoardSize}
                onSizeChange={(height, width) => setMap((m) => setBoardSize(m, height, width))}
              />
              <div
                ref={canvasViewportRef}
                className={`${styles.canvasViewport}${panMode ? ` ${styles.canvasViewportPanning}` : ''}`}
                data-testid="editor-canvas-viewport"
                style={{ '--editor-canvas-width': `${Math.round(920 * zoom)}px` } as CSSProperties}
                onPointerDown={startPan}
                onPointerMove={movePan}
                onPointerUp={stopPan}
                onPointerCancel={stopPan}
              >
                <EditorCanvas
                  map={map}
                  tool={tool}
                  showCoordinates={showCoordinates}
                  overlay={overlay}
                  previewMode={previewMode}
                  selectedCoord={selection?.kind === 'hex' ? selection.coord : null}
                  selectedEdge={selection?.kind === 'port' ? selection.edge : null}
                  highlightCoord={highlight?.kind === 'hex' ? highlight.coord : null}
                  highlightEdge={highlight?.kind === 'port' ? highlight.edge : null}
                  onHexClick={handleHexClick}
                  onPortClick={handlePortClick}
                />
              </div>
            </Panel>
          </div>

          <div className={styles.sideColumn}>
            <TemplateGallery activeMap={map} onTemplate={applyTemplate} />
            <TileInspector
              map={map}
              selection={selection}
              hexType={hexType}
              diceNum={diceNum}
              landArea={landArea}
              portType={portType}
              portFacing={portFacing}
              onSelectHexType={setHexType}
              onSelectDice={setDiceNum}
              onSelectLandArea={setLandArea}
              onSelectPortType={setPortType}
              onSelectPortFacing={setPortFacing}
              onHexMutate={mutateSelectedHex}
              onPortMutate={mutateSelectedPort}
            />
            <MapReadinessPanel map={map} issues={issues} metrics={balance} />
            <ValidationPanel issues={issues} onIssueClick={handleIssueClick} />
            <ImportExportPanel map={map} issues={issues} onLoad={loadMap} sampleJson={SAMPLE_MAP_JSON} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Clear the robber only if it currently sits on `coord`. */
function clearRobberAt(map: CustomMap, coord: number): CustomMap {
  if (parseCoord(map.robberHex) !== coord) {
    return map;
  }
  const next = { ...map };
  delete next.robberHex;
  return next;
}

/** Clear the pirate only if it currently sits on `coord`. */
function clearPirateAt(map: CustomMap, coord: number): CustomMap {
  if (parseCoord(map.pirateHex) !== coord) {
    return map;
  }
  const next = { ...map };
  delete next.pirateHex;
  return next;
}

export default MapEditorScreen;

/** Add explicit fitted board size when importing old maps that predate size fields. */
function ensureEditorBoardSize(map: CustomMap): CustomMap {
  if (map.boardHeight !== undefined && map.boardWidth !== undefined) {
    return map;
  }
  const size = boardSizeForMap(map);
  return {
    ...map,
    boardHeight: map.boardHeight ?? size.height,
    boardWidth: map.boardWidth ?? size.width,
  };
}

function EditorWorkflowBar({
  canUndo,
  canRedo,
  zoom,
  panMode,
  previewMode,
  overlay,
  onUndo,
  onRedo,
  onZoomOut,
  onZoomIn,
  onFitBoard,
  onFitContent,
  onPanModeChange,
  onPreviewModeChange,
  onOverlayChange,
  onBalanceDice,
  onWaterRing,
  onReplaceTerrain,
}: {
  canUndo: boolean;
  canRedo: boolean;
  zoom: number;
  panMode: boolean;
  previewMode: boolean;
  overlay: EditorOverlay;
  onUndo: () => void;
  onRedo: () => void;
  onZoomOut: () => void;
  onZoomIn: () => void;
  onFitBoard: () => void;
  onFitContent: () => void;
  onPanModeChange: (enabled: boolean) => void;
  onPreviewModeChange: (enabled: boolean) => void;
  onOverlayChange: (overlay: EditorOverlay) => void;
  onBalanceDice: () => void;
  onWaterRing: () => void;
  onReplaceTerrain: () => void;
}): JSX.Element {
  return (
    <div className={styles.workflowBar} data-testid="editor-workflow-bar">
      <div className={styles.commandGroup}>
        <Button size="sm" variant="secondary" data-testid="editor-undo" disabled={!canUndo} onClick={onUndo}>
          Undo
        </Button>
        <Button size="sm" variant="secondary" data-testid="editor-redo" disabled={!canRedo} onClick={onRedo}>
          Redo
        </Button>
      </div>
      <div className={styles.commandGroup}>
        <Button size="sm" variant="ghost" data-testid="editor-zoom-out" onClick={onZoomOut}>
          -
        </Button>
        <span className={styles.zoomReadout} data-testid="editor-zoom-readout">
          {Math.round(zoom * 100)}%
        </span>
        <Button size="sm" variant="ghost" data-testid="editor-zoom-in" onClick={onZoomIn}>
          +
        </Button>
        <Button size="sm" variant="ghost" data-testid="editor-fit-board" onClick={onFitBoard}>
          Fit board
        </Button>
        <Button size="sm" variant="ghost" data-testid="editor-fit-content" onClick={onFitContent}>
          Focus
        </Button>
      </div>
      <div className={styles.commandGroup}>
        <label className={styles.checkboxRow}>
          <input
            type="checkbox"
            data-testid="editor-pan-mode"
            checked={panMode}
            onChange={(e) => onPanModeChange(e.target.checked)}
          />
          Pan
        </label>
        <label className={styles.checkboxRow}>
          <input
            type="checkbox"
            data-testid="editor-preview-mode"
            checked={previewMode}
            onChange={(e) => onPreviewModeChange(e.target.checked)}
          />
          Preview
        </label>
        <select
          className={styles.selectCompact}
          data-testid="editor-overlay"
          aria-label="Editor overlay"
          value={overlay}
          onChange={(e) => onOverlayChange(e.target.value as EditorOverlay)}
        >
          <option value="none">No overlay</option>
          <option value="probability">Probability</option>
          <option value="areas">Areas</option>
          <option value="issues">Issues</option>
        </select>
      </div>
      <div className={styles.commandGroup}>
        <Button size="sm" variant="secondary" data-testid="editor-balance-dice" onClick={onBalanceDice}>
          Balance dice
        </Button>
        <Button size="sm" variant="secondary" data-testid="editor-water-ring" onClick={onWaterRing}>
          Water ring
        </Button>
        <Button size="sm" variant="ghost" data-testid="editor-replace-terrain" onClick={onReplaceTerrain}>
          Replace with water
        </Button>
      </div>
    </div>
  );
}

function TemplateGallery({
  activeMap,
  onTemplate,
}: {
  activeMap: CustomMap;
  onTemplate: (templateId: string) => void;
}): JSX.Element {
  return (
    <Panel title="Templates" data-testid="editor-templates">
      <div className={styles.templateGrid}>
        {EDITOR_TEMPLATES.map((template) => (
          <button
            key={template.id}
            type="button"
            className={styles.templateButton}
            data-testid={`editor-template-${template.id}`}
            aria-pressed={activeMap.name === template.name}
            onClick={() => onTemplate(template.id)}
          >
            <strong>{template.name}</strong>
            <span>{template.detail}</span>
          </button>
        ))}
      </div>
    </Panel>
  );
}

function TileInspector({
  map,
  selection,
  hexType,
  diceNum,
  landArea,
  portType,
  portFacing,
  onSelectHexType,
  onSelectDice,
  onSelectLandArea,
  onSelectPortType,
  onSelectPortFacing,
  onHexMutate,
  onPortMutate,
}: {
  map: CustomMap;
  selection: EditorSelection;
  hexType: HexTypeName;
  diceNum: number;
  landArea: number;
  portType: PortTypeName;
  portFacing: FacingName;
  onSelectHexType: (type: HexTypeName) => void;
  onSelectDice: (dice: number) => void;
  onSelectLandArea: (area: number) => void;
  onSelectPortType: (type: PortTypeName) => void;
  onSelectPortFacing: (facing: FacingName) => void;
  onHexMutate: (coord: number, updater: (map: CustomMap, coord: number) => CustomMap) => void;
  onPortMutate: (edge: number, updater: (map: CustomMap, edge: number) => CustomMap) => void;
}): JSX.Element {
  if (selection === null) {
    return (
      <Panel title="Inspector" data-testid="editor-inspector">
        <p className={styles.emptyInspector}>Select a hex or port to edit it directly.</p>
      </Panel>
    );
  }

  if (selection.kind === 'port') {
    const portIndex = indexOfPortAt(map, selection.edge);
    const port = portIndex >= 0 ? (map.ports?.[portIndex] ?? null) : null;
    return (
      <Panel title="Inspector" data-testid="editor-inspector">
        <div className={styles.inspectorStack}>
          <strong>{encodeCoord(selection.edge)}</strong>
          {port === null ? (
            <p className={styles.emptyInspector}>No port is placed on this edge.</p>
          ) : (
            <>
              <select
                className={styles.select}
                data-testid="editor-inspector-port-type"
                value={port.type}
                onChange={(e) => {
                  const next = e.target.value as PortTypeName;
                  onSelectPortType(next);
                  onPortMutate(selection.edge, (m, edge) => placePort(m, edge, next, normalizeFacing(port.facing)));
                }}
              >
                {PORT_TYPE_NAMES.map((type) => (
                  <option key={type} value={type}>
                    {type === 'misc' || type === '3:1' ? '3:1 (misc)' : type}
                  </option>
                ))}
              </select>
              <select
                className={styles.select}
                data-testid="editor-inspector-port-facing"
                value={normalizeFacing(port.facing)}
                onChange={(e) => {
                  const next = e.target.value as FacingName;
                  onSelectPortFacing(next);
                  onPortMutate(selection.edge, (m, edge) => placePort(m, edge, normalizePortType(port.type), next));
                }}
              >
                {FACING_NAMES.map((facing) => (
                  <option key={facing} value={facing}>
                    {facing}
                  </option>
                ))}
              </select>
              <Button size="sm" variant="ghost" data-testid="editor-inspector-clear-port" onClick={() => {
                onPortMutate(selection.edge, (m, edge) => clearPort(m, edge));
              }}>
                Remove port
              </Button>
            </>
          )}
        </div>
      </Panel>
    );
  }

  const coord = selection.coord;
  const hexIndex = indexOfHexAt(map, coord);
  const hex = hexIndex >= 0 ? map.landHexes[hexIndex] : null;
  const attachedPorts = (map.ports ?? []).filter((port) => {
    const edge = parseCoord(port.edge);
    return edge !== null && edgesAroundHex(coord).includes(edge);
  });

  return (
    <Panel title="Inspector" data-testid="editor-inspector">
      <div className={styles.inspectorStack}>
        <strong>{encodeCoord(coord)}</strong>
        {hex === null ? (
          <>
            <p className={styles.emptyInspector}>Empty cell.</p>
            <Button
              size="sm"
              variant="secondary"
              data-testid="editor-inspector-place-hex"
              onClick={() => onHexMutate(coord, (m, c) => placeHex(m, c, hexType, landArea))}
            >
              Place {hexType}
            </Button>
          </>
        ) : (
          <>
            <select
              className={styles.select}
              data-testid="editor-inspector-hex-type"
              value={normalizeHexType(hex.type)}
              onChange={(e) => {
                const next = e.target.value as HexTypeName;
                onSelectHexType(next);
                onHexMutate(coord, (m, c) => placeHex(m, c, next, hex.landArea ?? landArea));
              }}
            >
              {HEX_TYPE_NAMES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <select
              className={styles.select}
              data-testid="editor-inspector-dice"
              value={hex.diceNum}
              onChange={(e) => {
                const next = Number(e.target.value);
                onSelectDice(next);
                onHexMutate(coord, (m, c) => setHexDice(m, c, next));
              }}
            >
              {DICE_CHOICES.map((n) => (
                <option key={n} value={n}>
                  {n === 0 ? 'none' : n}
                </option>
              ))}
            </select>
            <label className={styles.sizeField}>
              <span>Area</span>
              <input
                className={styles.sizeInput}
                data-testid="editor-inspector-area"
                type="number"
                min={1}
                value={hex.landArea ?? landArea}
                onChange={(e) => {
                  const next = Math.max(1, Number(e.target.value) || 1);
                  onSelectLandArea(next);
                  onHexMutate(coord, (m, c) => setHexLandArea(m, c, next));
                }}
              />
            </label>
            <div className={styles.inlineRow}>
              <Button size="sm" variant="secondary" data-testid="editor-inspector-robber" onClick={() => {
                onHexMutate(coord, (m, c) => toggleRobber(m, c));
              }}>
                Toggle robber
              </Button>
              <Button size="sm" variant="secondary" data-testid="editor-inspector-pirate" onClick={() => {
                onHexMutate(coord, (m, c) => togglePirate(m, c));
              }}>
                Toggle pirate
              </Button>
            </div>
            <Button size="sm" variant="ghost" data-testid="editor-inspector-clear-hex" onClick={() => {
              onHexMutate(coord, (m, c) => clearHex(m, c));
            }}>
              Clear hex
            </Button>
          </>
        )}
        <div className={styles.inspectorMeta}>
          <span>{attachedPorts.length} adjacent port{attachedPorts.length === 1 ? '' : 's'}</span>
          <span>Next: {portType} / {portFacing}</span>
          <span>Dice brush: {diceNum === 0 ? 'none' : diceNum}</span>
        </div>
      </div>
    </Panel>
  );
}

function BoardSizeControls({
  size,
  minimum,
  onSizeChange,
}: {
  size: EditorBoardSize;
  minimum: EditorBoardSize;
  onSizeChange: (height: number, width: number) => void;
}): JSX.Element {
  const minHeight = Math.max(MIN_BOARD_HEIGHT, minimum.height);
  const minWidth = Math.max(MIN_BOARD_WIDTH, minimum.width);
  return (
    <div className={styles.boardSizeBar} data-testid="editor-board-size">
      <div className={styles.sizeTitle}>
        <span className={styles.groupLabel}>Board frame</span>
        <span className={styles.sizeRange}>
          rows 1..{size.height - 1} · cols 1..{size.width - 1}
        </span>
      </div>
      <label className={styles.sizeField}>
        <span>Height</span>
        <input
          className={styles.sizeInput}
          data-testid="editor-board-height"
          type="number"
          min={minHeight}
          max={MAX_BOARD_HEIGHT}
          value={size.height}
          onChange={(e) => onSizeChange(Number(e.target.value), size.width)}
        />
      </label>
      <div className={styles.sizeStepper} aria-label="Adjust board height">
        <button
          type="button"
          data-testid="editor-board-height-dec"
          disabled={size.height <= minHeight}
          onClick={() => onSizeChange(size.height - 2, size.width)}
        >
          -
        </button>
        <button
          type="button"
          data-testid="editor-board-height-inc"
          disabled={size.height >= MAX_BOARD_HEIGHT}
          onClick={() => onSizeChange(size.height + 2, size.width)}
        >
          +
        </button>
      </div>
      <label className={styles.sizeField}>
        <span>Width</span>
        <input
          className={styles.sizeInput}
          data-testid="editor-board-width"
          type="number"
          min={minWidth}
          max={MAX_BOARD_WIDTH}
          value={size.width}
          onChange={(e) => onSizeChange(size.height, Number(e.target.value))}
        />
      </label>
      <div className={styles.sizeStepper} aria-label="Adjust board width">
        <button
          type="button"
          data-testid="editor-board-width-dec"
          disabled={size.width <= minWidth}
          onClick={() => onSizeChange(size.height, size.width - 2)}
        >
          -
        </button>
        <button
          type="button"
          data-testid="editor-board-width-inc"
          disabled={size.width >= MAX_BOARD_WIDTH}
          onClick={() => onSizeChange(size.height, size.width + 2)}
        >
          +
        </button>
      </div>
      <Button
        size="sm"
        variant="ghost"
        data-testid="editor-board-fit"
        disabled={size.height === minimum.height && size.width === minimum.width}
        onClick={() => onSizeChange(minimum.height, minimum.width)}
      >
        Fit content
      </Button>
      <Button
        size="sm"
        variant="ghost"
        data-testid="editor-board-max"
        disabled={size.height >= MAX_BOARD_HEIGHT && size.width >= MAX_BOARD_WIDTH}
        onClick={() => onSizeChange(MAX_BOARD_HEIGHT, MAX_BOARD_WIDTH)}
      >
        Max frame
      </Button>
    </div>
  );
}

function loadDraftMap(): CustomMap {
  if (!AUTOSAVE_ENABLED) {
    return emptyMap();
  }
  try {
    const text = window.localStorage.getItem(AUTOSAVE_KEY);
    return text ? mapWithInferredLandAreas(ensureEditorBoardSize(parseMapJson(text))) : emptyMap();
  } catch {
    return emptyMap();
  }
}

function sameMap(a: CustomMap, b: CustomMap): boolean {
  return serializeMapJson(a) === serializeMapJson(b);
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }
  const tag = target.tagName.toLowerCase();
  return tag === 'input' || tag === 'textarea' || tag === 'select' || target.isContentEditable;
}

function focusField(field: string): void {
  const id =
    field === 'name'
      ? 'editor-name'
      : field === 'description'
        ? 'editor-description'
        : field === 'playerCounts'
          ? 'editor-playercounts'
          : field === 'ports'
            ? 'editor-port-type'
            : field === 'landHexes'
              ? 'editor-canvas'
              : '';
  if (id === '') {
    return;
  }
  const el = document.querySelector(`[data-testid="${id}"]`);
  if (el instanceof HTMLElement || el instanceof SVGElement) {
    if (typeof el.scrollIntoView === 'function') {
      el.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' });
    }
    if (el instanceof HTMLElement && typeof el.focus === 'function') {
      el.focus();
    }
  }
}

function normalizeHexType(type: string): HexTypeName {
  const normalized = (type ?? '').toLowerCase() as HexTypeName;
  return HEX_TYPE_NAMES.includes(normalized) ? normalized : 'clay';
}

function normalizePortType(type: string): PortTypeName {
  const normalized = (type ?? '').toLowerCase() as PortTypeName;
  return PORT_TYPE_NAMES.includes(normalized) ? normalized : 'misc';
}

function normalizeFacing(facing: string): FacingName {
  const normalized = (facing ?? '').toUpperCase() as FacingName;
  return FACING_NAMES.includes(normalized) ? normalized : 'SE';
}

function clampNumber(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
