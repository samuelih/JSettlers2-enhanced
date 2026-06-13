import { useEffect, useMemo, useState } from 'react';

import { Button, Panel, Spinner, useToast } from '../components';
import { NewGameDialog, type NewGameScenario } from '../components/newgame';
import type { GameOptionDescriptor, ScenarioDetails } from '../protocol';
import {
  STANDARD_SCENARIO_KEYS,
  createGame,
  joinGame as joinGameAction,
  requestGameOptions,
  useGameStore,
} from '../store/gameStore';
import styles from './LobbyScreen.module.css';

/**
 * Build the ordered list of option descriptors to show in the New Game dialog
 * from the known-options registry. Internal / hidden options (keys starting
 * with "_") are filtered out, matching the Swing client's New Game UI which
 * only shows user-facing options.
 */
function dialogOptions(
  known: Record<string, GameOptionDescriptor>,
): GameOptionDescriptor[] {
  return Object.values(known)
    .filter(
      (o) =>
        !o.key.startsWith('_') &&
        o.key !== 'SC' &&
        // The server returns type UNKNOWN for options whose descriptors are
        // unchanged since this client version (it only sends localized desc
        // text). Such options can't be rendered/serialized, so skip them.
        o.optType !== 'unknown',
    )
    .sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0));
}

const BASE_EXPANSION: NewGameScenario = {
  key: '',
  desc: 'Standard Catan',
  group: 'Base game',
  meta: 'Base game',
  details: 'Classic land board with the standard rule set.',
};

const EXPANSION_GROUP_ORDER: Record<string, number> = {
  'Base game': 0,
  Seafarers: 1,
  'Cities & Knights': 2,
  'Custom maps': 3,
  Scenarios: 4,
};

/** Classify a server scenario into a New Game expansion group. */
function scenarioGroup(sc: ScenarioDetails): string {
  if (sc.key.startsWith('SC_X')) {
    return 'Custom maps';
  }
  if (sc.key === 'SC_CK' || sc.opts.includes('_CK_')) {
    return 'Cities & Knights';
  }
  if (sc.opts.includes('SBL=t')) {
    return 'Seafarers';
  }
  return 'Scenarios';
}

/** Build concise metadata for the selected-expansion summary. */
function scenarioMeta(sc: ScenarioDetails, group: string): string {
  return sc.key.startsWith('SC_X') ? `${group} · ${sc.key}` : group;
}

/** Pick a compact description for the selected-expansion summary. */
function scenarioDetails(sc: ScenarioDetails, group: string): string {
  if (sc.longDesc != null && sc.longDesc !== '') {
    return sc.longDesc;
  }
  if (group === 'Cities & Knights') {
    return 'Adds commodities, city improvements, progress cards, knights, and barbarian attacks.';
  }
  if (group === 'Seafarers') {
    return 'Adds the sea board, ships, islands, and scenario-specific victory goals.';
  }
  if (group === 'Custom maps') {
    return 'Server-provided custom map scenario.';
  }
  return 'Scenario-specific setup and rules.';
}

/** Stable sort for built-in scenarios first, then server/custom scenarios by title. */
function compareScenarios(a: ScenarioDetails, b: ScenarioDetails): number {
  const aGroup = scenarioGroup(a);
  const bGroup = scenarioGroup(b);
  const groupDiff =
    (EXPANSION_GROUP_ORDER[aGroup] ?? 99) - (EXPANSION_GROUP_ORDER[bGroup] ?? 99);
  if (groupDiff !== 0) {
    return groupDiff; // <--- Early return: group order decides first ---
  }

  const aBuiltIn = STANDARD_SCENARIO_KEYS.indexOf(a.key);
  const bBuiltIn = STANDARD_SCENARIO_KEYS.indexOf(b.key);
  if (aBuiltIn !== bBuiltIn) {
    if (aBuiltIn === -1) {
      return 1;
    }
    if (bBuiltIn === -1) {
      return -1;
    }
    return aBuiltIn - bBuiltIn;
  }

  return a.title.localeCompare(b.title);
}

/** Convert known server scenarios into New Game expansion choices. */
function expansionChoices(scenarios: Record<string, ScenarioDetails>): NewGameScenario[] {
  const known = Object.values(scenarios).sort(compareScenarios);
  return [
    BASE_EXPANSION,
    ...known.map((sc) => {
      const group = scenarioGroup(sc);
      return {
        key: sc.key,
        desc: sc.title,
        group,
        details: scenarioDetails(sc, group),
        meta: scenarioMeta(sc, group),
      };
    }),
  ];
}

/**
 * Lobby screen: shows the server version and the current list of games, a
 * "New Game" button that opens the {@link NewGameDialog} (populated from the
 * option registry), and a Join control per game. Creating/joining a game sends
 * the matching protocol message; the store advances to the game room once the
 * server replies with SOCJoinGameAuth.
 */
export function LobbyScreen(): JSX.Element {
  const serverVersion = useGameStore((s) => s.serverVersion);
  const serverVersionStr = useGameStore((s) => s.serverVersionStr);
  const games = useGameStore((s) => s.games);
  const gamesLoaded = useGameStore((s) => s.gamesLoaded);
  const knownOptions = useGameStore((s) => s.knownOptions);
  const optionsLoaded = useGameStore((s) => s.optionsLoaded);
  const optionsRequested = useGameStore((s) => s.optionsRequested);
  const scenarios = useGameStore((s) => s.scenarios);
  const nickname = useGameStore((s) => s.nickname);
  const error = useGameStore((s) => s.error);
  const setError = useGameStore((s) => s.setError);
  const { showToast } = useToast();

  const [dialogOpen, setDialogOpen] = useState(false);

  // Surface server-side rejections received while in the lobby (SOCStatusMessage
  // non-OK svalues: name-in-use, new-game already exists / name rejected / too
  // many created, unknown/too-new option, etc.). The store captures the text in
  // `error`; show it once as a toast, then clear it so it doesn't persist or
  // re-fire. Without this a name collision on create is a silent dead end (no
  // JOINGAMEAUTH arrives, so the lobby never advances).
  useEffect(() => {
    if (error != null && error !== '') {
      showToast(error, { variant: 'danger' });
      setError(undefined);
    }
  }, [error, showToast, setError]);

  const versionLabel =
    serverVersionStr != null
      ? serverVersionStr
      : serverVersion != null
        ? String(serverVersion)
        : 'unknown';

  const optionList = useMemo(() => dialogOptions(knownOptions), [knownOptions]);
  const scenarioList = useMemo<NewGameScenario[]>(
    () => expansionChoices(scenarios),
    [scenarios],
  );

  const openDialog = (): void => {
    // Lazily fetch option descriptors the first time the dialog opens.
    requestGameOptions();
    setDialogOpen(true);
  };

  const handleCreate = (
    name: string,
    nick: string,
    chosen: GameOptionDescriptor[],
    scenarioKey?: string,
  ): void => {
    if (name === '') {
      showToast('Enter a game name.', { variant: 'warning' });
      return;
    }
    createGame(name, nick, chosen, scenarioKey);
    setDialogOpen(false);
    showToast(`Creating game "${name}"…`, { variant: 'info' });
  };

  const handleJoin = (gameName: string): void => {
    joinGameAction(gameName, nickname);
  };

  return (
    <div className={styles.wrap} data-testid="lobby-screen">
      <div className={styles.toolbar}>
        <div className={styles.toolbarText}>
          <h2 className={styles.heading}>Game Lobby</h2>
          <p className={styles.serverLine}>
            <span className={styles.serverDot} aria-hidden="true" />
            Connected · server{' '}
            <span className={styles.version} data-testid="server-version">
              {versionLabel}
            </span>
          </p>
        </div>
        <Button
          variant="primary"
          onClick={openDialog}
          data-testid="new-game-button"
        >
          New Game
        </Button>
      </div>

      <Panel title={`Open games (${games.length})`} flushBody>
        {!gamesLoaded ? (
          <div className={styles.loadingRow} data-testid="game-list-loading">
            <Spinner size="sm" label="Loading games" />
            <span>Fetching the game list…</span>
          </div>
        ) : games.length === 0 ? (
          <div className={styles.empty} data-testid="game-list-empty">
            <span className={styles.emptyMark} aria-hidden="true">
              ♜
            </span>
            <p className={styles.emptyTitle}>No games yet</p>
            <p className={styles.emptyHint}>
              Create a game to start playing against friends or bots.
            </p>
            <Button variant="secondary" size="sm" onClick={openDialog}>
              Create a game
            </Button>
          </div>
        ) : (
          <ul className={styles.list} data-testid="game-list">
            {games.map((g) => (
              <li key={g.name} className={styles.item} data-testid="game-item">
                <div className={styles.itemMain}>
                  <span className={styles.name} data-testid="game-item-name">
                    {g.name}
                  </span>
                  {g.options !== '' && (
                    <span className={styles.options} data-testid="game-options">
                      {g.options}
                    </span>
                  )}
                </div>
                {g.started ? (
                  <span className={styles.started} data-testid="game-started">
                    In progress
                  </span>
                ) : (
                  <Button
                    variant="secondary"
                    size="sm"
                    className={styles.joinButton}
                    onClick={() => handleJoin(g.name)}
                    data-testid={`join-${g.name}`}
                  >
                    Join
                  </Button>
                )}
              </li>
            ))}
          </ul>
        )}
      </Panel>

      {dialogOpen && (
        <NewGameDialog
          open={dialogOpen}
          options={optionList}
          optionsLoading={optionsRequested && !optionsLoaded}
          scenarios={scenarioList}
          onCreate={handleCreate}
          onCancel={() => setDialogOpen(false)}
        />
      )}
    </div>
  );
}
