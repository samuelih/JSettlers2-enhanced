/**
 * Higher-level map-editor UX helpers: starter templates, balance analysis,
 * quick authoring mutations, validation issue targeting, and readiness scoring.
 *
 * These helpers stay pure so the screen can combine them with undo/redo and
 * autosave without special cases.
 */

import {
  type CustomMap,
  type HexTypeName,
  type MapLandHex,
  encodeCoord,
  parseCoord,
  mapWithCanonicalLandAreas,
  parseMapJson,
} from './mapSchema';
import { enumerateHexCells, boardSizeForMap } from './editorGrid';
import { placeHex, smartFillPorts } from './editorActions';
import { SAMPLE_MAP_JSON } from './sampleMapData';
import { type ValidationIssue } from './validation';

export type EditorOverlay = 'none' | 'probability' | 'areas' | 'issues';

export interface EditorTemplate {
  id: string;
  name: string;
  detail: string;
  create: () => CustomMap;
}

export interface IssueTarget {
  kind: 'hex' | 'port' | 'field';
  coord?: number;
  edge?: number;
  field?: string;
}

export interface MapBalanceMetrics {
  resourcePips: Record<string, number>;
  resourceHexes: number;
  numberedHexes: number;
  hotHexes: number;
  resourceSpread: number;
  readinessScore: number;
  recommendations: string[];
}

const RESOURCE_TYPES: readonly HexTypeName[] = ['clay', 'ore', 'sheep', 'wheat', 'wood'];

const DICE_PIPS: Readonly<Record<number, number>> = {
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  8: 5,
  9: 4,
  10: 3,
  11: 2,
  12: 1,
};

const CLASSIC_COORDS = [
  0x0307, 0x0309, 0x030b,
  0x0506, 0x0508, 0x050a, 0x050c,
  0x0705, 0x0707, 0x0709, 0x070b, 0x070d,
  0x0906, 0x0908, 0x090a, 0x090c,
  0x0b07, 0x0b09, 0x0b0b,
];

const CLASSIC_TYPES: readonly HexTypeName[] = [
  'wood', 'sheep', 'wheat',
  'clay', 'ore', 'sheep', 'wood',
  'wheat', 'clay', 'desert', 'ore', 'sheep',
  'wood', 'wheat', 'clay', 'ore',
  'sheep', 'wheat', 'wood',
];

const CLASSIC_DICE = [5, 2, 6, 3, 8, 10, 9, 12, 11, 0, 4, 8, 10, 9, 4, 5, 6, 3, 11];

export const EDITOR_TEMPLATES: readonly EditorTemplate[] = [
  {
    id: 'blank',
    name: 'Blank Board',
    detail: 'Start empty with the compact authoring frame.',
    create: () => ({
      name: '',
      playerCounts: [4],
      shuffle: false,
      boardHeight: 0x10,
      boardWidth: 0x11,
      landHexes: [],
    }),
  },
  {
    id: 'classic',
    name: 'Classic Island',
    detail: 'Balanced 19-hex land board with ports and robber.',
    create: () => smartFillPorts(buildClassicMap('Classic Island', [3, 4], 0x10, 0x11)),
  },
  {
    id: 'six',
    name: '5-6 Player Island',
    detail: 'Larger frame and player support for expansion games.',
    create: () => smartFillPorts(buildClassicMap('Six Player Island', [4, 6], 0x12, 0x13)),
  },
  {
    id: 'two-islands',
    name: 'Two Islands',
    detail: 'Shipped sea-board sample with land areas and pirate.',
    create: () => parseMapJson(SAMPLE_MAP_JSON),
  },
  {
    id: 'archipelago',
    name: 'Archipelago',
    detail: 'Two-island sample expanded with a water ring and smart ports.',
    create: () => smartFillPorts(fillWaterRing({ ...parseMapJson(SAMPLE_MAP_JSON), name: 'Archipelago' })),
  },
];

/** Assign a balanced dice-token sequence to every resource hex. */
export function autoBalanceDice(map: CustomMap): CustomMap {
  const hexes = [...(map.landHexes ?? [])];
  const resourceIndexes = hexes
    .map((hex, index) => ({ hex, index, coord: parseCoord(hex.coord) ?? index }))
    .filter(({ hex }) => RESOURCE_TYPES.includes((hex.type ?? '').toLowerCase() as HexTypeName))
    .sort((a, b) => a.coord - b.coord)
    .map(({ index }) => index);
  const tokens = diceTokensFor(resourceIndexes.length);
  for (let i = 0; i < hexes.length; ++i) {
    const type = (hexes[i].type ?? '').toLowerCase() as HexTypeName;
    if (!RESOURCE_TYPES.includes(type)) {
      hexes[i] = { ...hexes[i], diceNum: 0 };
    }
  }
  for (let i = 0; i < resourceIndexes.length; ++i) {
    const index = resourceIndexes[i];
    hexes[index] = { ...hexes[index], diceNum: tokens[i] ?? 0 };
  }
  return { ...map, landHexes: hexes };
}

/** Replace all placed hexes of one terrain type with another terrain type. */
export function replaceTerrain(map: CustomMap, from: HexTypeName, to: HexTypeName): CustomMap {
  const hexes = (map.landHexes ?? []).map((hex): MapLandHex => {
    if ((hex.type ?? '').toLowerCase() !== from) {
      return hex;
    }
    return {
      ...hex,
      type: to,
      diceNum: to === 'desert' || to === 'water' ? 0 : hex.diceNum,
    };
  });
  return mapWithCanonicalLandAreas({ ...map, landHexes: hexes });
}

/** Add a one-cell water ring around every placed non-water land hex. */
export function fillWaterRing(map: CustomMap): CustomMap {
  const boardSize = boardSizeForMap(map);
  const legal = new Set(enumerateHexCells(boardSize.height, boardSize.width).map((cell) => cell.coord));
  const occupied = new Set((map.landHexes ?? []).map((hex) => parseCoord(hex.coord)).filter(isNumber));
  let next = map;
  for (const coord of [...occupied]) {
    const hex = map.landHexes.find((h) => parseCoord(h.coord) === coord);
    if (!hex || (hex.type ?? '').toLowerCase() === 'water') {
      continue;
    }
    for (const neighbor of neighboringHexCoords(coord)) {
      if (!legal.has(neighbor) || occupied.has(neighbor)) {
        continue;
      }
      next = placeHex(next, neighbor, 'water');
      occupied.add(neighbor);
    }
  }
  return next;
}

/** Build probability and readiness metrics for the current map. */
export function analyzeMapBalance(map: CustomMap, issues: ValidationIssue[]): MapBalanceMetrics {
  const resourcePips: Record<string, number> = { clay: 0, ore: 0, sheep: 0, wheat: 0, wood: 0 };
  let resourceHexes = 0;
  let numberedHexes = 0;
  let hotHexes = 0;
  for (const hex of map.landHexes ?? []) {
    const type = (hex.type ?? '').toLowerCase();
    if (!RESOURCE_TYPES.includes(type as HexTypeName)) {
      continue;
    }
    resourceHexes += 1;
    const pips = DICE_PIPS[hex.diceNum] ?? 0;
    if (pips > 0) {
      numberedHexes += 1;
    }
    if (hex.diceNum === 6 || hex.diceNum === 8) {
      hotHexes += 1;
    }
    resourcePips[type] += pips;
  }

  const values = Object.values(resourcePips);
  const active = values.filter((v) => v > 0);
  const resourceSpread = active.length > 0 ? Math.max(...active) - Math.min(...active) : 0;
  const errors = issues.filter((issue) => issue.severity === 'error').length;
  const warnings = issues.filter((issue) => issue.severity === 'warning').length;
  const missingNumbers = Math.max(0, resourceHexes - numberedHexes);
  const recommendations: string[] = [];
  if (missingNumbers > 0 && !map.shuffle) {
    recommendations.push(`${missingNumbers} resource hex${missingNumbers === 1 ? '' : 'es'} still need dice.`);
  }
  if (resourceSpread >= 7) {
    recommendations.push('Resource probability is uneven; consider balancing dice or terrain.');
  }
  if ((map.ports?.length ?? 0) === 0 && Math.max(0, ...(map.playerCounts ?? [])) >= 3) {
    recommendations.push('Add trade ports for 3+ player maps.');
  }
  if (!map.robberHex && resourceHexes > 0) {
    recommendations.push('Set a robber start hex.');
  }
  if (recommendations.length === 0) {
    recommendations.push('Map fundamentals look ready for playtesting.');
  }

  const readinessScore = clamp(
    100 - errors * 28 - warnings * 7 - missingNumbers * 4 - Math.max(0, resourceSpread - 4) * 2,
    0,
    100,
  );

  return { resourcePips, resourceHexes, numberedHexes, hotHexes, resourceSpread, readinessScore, recommendations };
}

/** Map a validation issue to the canvas object or form field it references. */
export function targetForIssue(issue: ValidationIssue, map: CustomMap): IssueTarget {
  const field = issue.field ?? '';
  const hexMatch = /landHexes\[(\d+)\]/.exec(field);
  if (hexMatch) {
    const index = Number(hexMatch[1]);
    const coord = parseCoord(map.landHexes[index]?.coord);
    return coord !== null ? { kind: 'hex', coord, field } : { kind: 'field', field };
  }
  const portMatch = /ports\[(\d+)\]/.exec(field);
  if (portMatch) {
    const index = Number(portMatch[1]);
    const edge = parseCoord(map.ports?.[index]?.edge);
    return edge !== null ? { kind: 'port', edge, field } : { kind: 'field', field };
  }
  if (field === 'robberHex') {
    const coord = parseCoord(map.robberHex);
    return coord !== null ? { kind: 'hex', coord, field } : { kind: 'field', field };
  }
  if (field === 'pirateHex') {
    const coord = parseCoord(map.pirateHex);
    return coord !== null ? { kind: 'hex', coord, field } : { kind: 'field', field };
  }
  const coordMatch = /0x[0-9a-f]+/i.exec(issue.message);
  const coord = coordMatch ? parseCoord(coordMatch[0]) : null;
  return coord !== null ? { kind: 'hex', coord, field } : { kind: 'field', field };
}

/** Probability pips for an individual dice number. */
export function dicePips(diceNum: number): number {
  return DICE_PIPS[diceNum] ?? 0;
}

function buildClassicMap(name: string, playerCounts: number[], boardHeight: number, boardWidth: number): CustomMap {
  const landHexes = CLASSIC_COORDS.map((coord, i): MapLandHex => ({
    type: CLASSIC_TYPES[i],
    coord: encodeCoord(coord),
    diceNum: CLASSIC_DICE[i],
    landArea: 1,
  }));
  return {
    name,
    description: 'Balanced starter island generated by the web map editor.',
    playerCounts,
    shuffle: false,
    boardHeight,
    boardWidth,
    landHexes,
    robberHex: encodeCoord(CLASSIC_COORDS[9]),
  };
}

function diceTokensFor(count: number): number[] {
  const base = [5, 2, 6, 3, 8, 10, 9, 12, 11, 4, 8, 10, 9, 4, 5, 6, 3, 11, 2, 12];
  const out: number[] = [];
  for (let i = 0; i < count; ++i) {
    out.push(base[i % base.length]);
  }
  return out;
}

function neighboringHexCoords(coord: number): number[] {
  const row = coord >> 8;
  const col = coord & 0xff;
  return [
    ((row << 8) | (col - 2)) & 0xffff,
    ((row << 8) | (col + 2)) & 0xffff,
    (((row - 2) << 8) | (col - 1)) & 0xffff,
    (((row - 2) << 8) | (col + 1)) & 0xffff,
    (((row + 2) << 8) | (col - 1)) & 0xffff,
    (((row + 2) << 8) | (col + 1)) & 0xffff,
  ];
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function isNumber(value: number | null): value is number {
  return value !== null;
}
