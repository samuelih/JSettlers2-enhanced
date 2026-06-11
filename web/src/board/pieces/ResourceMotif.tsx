import type { JSX } from 'react';
import type { HexKind } from '../types';
import styles from '../BoardSVG.module.css';

export interface ResourceMotifProps {
  kind: HexKind;
  /** Hex center pixel. */
  cx: number;
  cy: number;
  /** Half hex width / height (HALFDELTA_X / HALFDELTA_Y). */
  hx: number;
  hy: number;
}

/**
 * A small decorative emblem painted in the center-ish of a resource hex so each
 * terrain type is recognizable at a glance even on a color-blind palette:
 *
 *  - clay   → stacked brick rows
 *  - ore    → angular ore chunks / crystals
 *  - sheep  → a fluffy sheep
 *  - wheat  → a wheat sheaf
 *  - wood   → a pine tree
 *  - desert → drifting sand dunes
 *  - gold   → a glinting gold ingot
 *  - water  → rolling waves
 *  - fog / unknown → nothing (kept neutral)
 *
 * Every shape is stroked/filled from CSS custom properties (the `motif*`
 * classes), so it stays subtle and theme-aware. The group never receives
 * pointer events, so the hex polygon underneath remains the click target. The
 * whole motif is clipped to the hex outline so nothing bleeds across tile
 * boundaries.
 */
export function ResourceMotif({ kind, cx, cy, hx, hy }: ResourceMotifProps): JSX.Element | null {
  // Position the emblem in the upper portion of the hex, clear of the dice
  // token that sits at center on numbered tiles.
  const my = cy - hy * 0.42;
  const body = renderBody(kind, cx, my, hx, hy);
  if (body === null) {
    return null; // <--- Early return: fog / unknown have no motif ---
  }
  return (
    <g className={styles.motif} clipPath="url(#hex-clip)" transform={`translate(${cx} ${cy})`} pointerEvents="none">
      <g transform={`translate(${-cx} ${-cy})`} data-motif={kind}>
        {body}
      </g>
    </g>
  );
}

/** Build the motif shapes for a given kind; null = draw nothing. */
function renderBody(kind: HexKind, x: number, y: number, hx: number, hy: number): JSX.Element | null {
  switch (kind) {
    case 'clay':
      return brickMotif(x, y, hx, hy);
    case 'ore':
      return oreMotif(x, y, hx, hy);
    case 'sheep':
      return sheepMotif(x, y, hx, hy);
    case 'wheat':
      return wheatMotif(x, y, hx, hy);
    case 'wood':
      return treeMotif(x, y, hx, hy);
    case 'desert':
      return desertMotif(x, y, hx, hy);
    case 'gold':
      return goldMotif(x, y, hx, hy);
    case 'water':
      return waterMotif(x, y, hx, hy);
    default:
      return null;
  }
}

/** Two staggered rows of bricks. */
function brickMotif(x: number, y: number, hx: number, _hy: number): JSX.Element {
  const w = hx * 0.34;
  const h = hx * 0.2;
  const gap = w * 0.16;
  const cols = [-1, 0, 1];
  return (
    <g className={styles.motifBrick}>
      {cols.map((c) => (
        <rect key={`a${c}`} className={styles.motifFill} x={x + c * (w + gap) - w / 2} y={y - h - gap / 2} width={w} height={h} rx={1.2} />
      ))}
      {[-0.5, 0.5].map((c) => (
        <rect key={`b${c}`} className={styles.motifFill} x={x + c * (w + gap) - w / 2} y={y + gap / 2} width={w} height={h} rx={1.2} />
      ))}
    </g>
  );
}

/** A cluster of angular ore crystals. */
function oreMotif(x: number, y: number, hx: number, _hy: number): JSX.Element {
  const s = hx * 0.4;
  const chunk = (ox: number, oy: number, k: number): JSX.Element => {
    const a = s * k;
    return (
      <polygon
        key={`${ox}-${oy}`}
        className={styles.motifFill}
        points={[
          `${x + ox} ${y + oy - a}`,
          `${x + ox + a * 0.7} ${y + oy - a * 0.2}`,
          `${x + ox + a * 0.45} ${y + oy + a * 0.7}`,
          `${x + ox - a * 0.5} ${y + oy + a * 0.6}`,
          `${x + ox - a * 0.75} ${y + oy - a * 0.15}`,
        ].join(', ')}
      />
    );
  };
  return (
    <g className={styles.motifOre}>
      {chunk(-s * 0.7, s * 0.3, 0.8)}
      {chunk(s * 0.6, s * 0.2, 0.7)}
      {chunk(0, -s * 0.35, 1)}
    </g>
  );
}

/** A simple fluffy sheep (cloud body + head + legs). */
function sheepMotif(x: number, y: number, hx: number, _hy: number): JSX.Element {
  const s = hx * 0.4;
  return (
    <g className={styles.motifSheep}>
      {/* legs */}
      <rect className={styles.motifInk} x={x - s * 0.45} y={y + s * 0.35} width={s * 0.18} height={s * 0.5} rx={1} />
      <rect className={styles.motifInk} x={x + s * 0.27} y={y + s * 0.35} width={s * 0.18} height={s * 0.5} rx={1} />
      {/* wool body */}
      <path
        className={styles.motifFill}
        d={`M ${x - s} ${y + s * 0.2}
            a ${s * 0.5} ${s * 0.5} 0 0 1 ${s * 0.45} ${-s * 0.55}
            a ${s * 0.5} ${s * 0.5} 0 0 1 ${s * 1.1} 0
            a ${s * 0.5} ${s * 0.5} 0 0 1 ${s * 0.45} ${s * 0.55}
            a ${s * 0.45} ${s * 0.45} 0 0 1 ${-s * 0.5} ${s * 0.4}
            l ${-s} 0
            a ${s * 0.45} ${s * 0.45} 0 0 1 ${-s * 0.5} ${-s * 0.4} Z`}
      />
      {/* head */}
      <ellipse className={styles.motifInk} cx={x + s * 0.95} cy={y - s * 0.05} rx={s * 0.32} ry={s * 0.38} />
    </g>
  );
}

/** A wheat sheaf: several grain stalks fanning out. */
function wheatMotif(x: number, y: number, hx: number, _hy: number): JSX.Element {
  const s = hx * 0.46;
  const stalk = (angle: number, key: number): JSX.Element => {
    const rad = (angle * Math.PI) / 180;
    const dx = Math.sin(rad) * s;
    const dy = -Math.cos(rad) * s;
    return (
      <g key={key}>
        <line className={styles.motifStroke} x1={x} y1={y + s * 0.7} x2={x + dx} y2={y + dy} />
        <ellipse
          className={styles.motifFill}
          cx={x + dx}
          cy={y + dy}
          rx={s * 0.16}
          ry={s * 0.34}
          transform={`rotate(${angle} ${x + dx} ${y + dy})`}
        />
      </g>
    );
  };
  return (
    <g className={styles.motifWheat}>
      {stalk(-28, 0)}
      {stalk(0, 1)}
      {stalk(28, 2)}
    </g>
  );
}

/** A pine/conifer tree. */
function treeMotif(x: number, y: number, hx: number, _hy: number): JSX.Element {
  const s = hx * 0.46;
  return (
    <g className={styles.motifTree}>
      <rect className={styles.motifTrunk} x={x - s * 0.12} y={y + s * 0.55} width={s * 0.24} height={s * 0.5} rx={1} />
      <polygon
        className={styles.motifFill}
        points={`${x} ${y - s} ${x + s * 0.7} ${y + s * 0.1} ${x - s * 0.7} ${y + s * 0.1}`}
      />
      <polygon
        className={styles.motifFill}
        points={`${x} ${y - s * 0.45} ${x + s * 0.85} ${y + s * 0.65} ${x - s * 0.85} ${y + s * 0.65}`}
      />
    </g>
  );
}

/** Drifting sand dunes for the desert. */
function desertMotif(x: number, y: number, hx: number, hy: number): JSX.Element {
  const s = hx * 0.7;
  const dune = (oy: number, key: number): JSX.Element => (
    <path
      key={key}
      className={styles.motifStroke}
      d={`M ${x - s} ${y + oy} q ${s * 0.5} ${-s * 0.45} ${s} 0 q ${s * 0.5} ${s * 0.45} ${s} 0`}
    />
  );
  return (
    <g className={styles.motifDesert} transform={`translate(0 ${hy * 0.35})`}>
      {dune(0, 0)}
      {dune(s * 0.5, 1)}
    </g>
  );
}

/** A glinting gold ingot. */
function goldMotif(x: number, y: number, hx: number, _hy: number): JSX.Element {
  const w = hx * 0.95;
  const h = hx * 0.42;
  return (
    <g className={styles.motifGold}>
      <polygon
        className={styles.motifFill}
        points={`${x - w / 2} ${y + h / 2} ${x - w / 2 + h * 0.5} ${y - h / 2} ${x + w / 2} ${y - h / 2} ${x + w / 2 - h * 0.5} ${y + h / 2}`}
      />
      {/* glint */}
      <path className={styles.motifGlint} d={`M ${x + w * 0.18} ${y - h * 0.1} l ${h * 0.28} 0 l ${-h * 0.14} ${h * 0.28} Z`} />
    </g>
  );
}

/** Rolling waves for water hexes. */
function waterMotif(x: number, y: number, hx: number, hy: number): JSX.Element {
  const s = hx * 0.6;
  const wave = (oy: number, key: number): JSX.Element => (
    <path
      key={key}
      className={styles.motifWaveStroke}
      d={`M ${x - s} ${y + oy} q ${s * 0.5} ${-s * 0.32} ${s} 0 q ${s * 0.5} ${s * 0.32} ${s} 0`}
    />
  );
  return (
    <g className={styles.motifWater} transform={`translate(0 ${hy * 0.55})`}>
      {wave(0, 0)}
      {wave(s * 0.55, 1)}
    </g>
  );
}
