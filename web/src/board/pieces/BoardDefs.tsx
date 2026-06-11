import type { JSX } from 'react';
import { HALFDELTA_X, HALFDELTA_Y, hexPolygonPoints } from '../coords';
import { type HexKind } from '../types';

/** Hex kinds that get a gradient sheen, paired with their gradient id. */
const GRADIENT_KINDS: ReadonlyArray<HexKind> = [
  'clay',
  'ore',
  'sheep',
  'wheat',
  'wood',
  'desert',
  'gold',
  'water',
  'fog',
  'unknown',
];

/**
 * Shared SVG `<defs>` for the board: one subtle light→dark vertical gradient per
 * hex kind, a hex-shaped clip path (so resource motifs stay inside their tile),
 * and a soft drop-shadow filter used by raised pieces.
 *
 * Gradients use a transparent-white top stop and a translucent-black bottom stop
 * (theme-independent overlay) so they layer over any CSS-variable hex fill and
 * automatically read correctly in light and dark themes. The opacity is small,
 * keeping fills faithful to their tokens while adding depth.
 *
 * Rendered exactly once near the top of {@link BoardSVG}.
 */
export function BoardDefs(): JSX.Element {
  // A unit hex centered at (0,0) for the clip path; consumers translate the
  // clip into place via the motif group's own transform.
  const clipPoints = hexPolygonPoints(0, 0);
  return (
    <defs>
      {GRADIENT_KINDS.map((kind) => (
        <linearGradient key={kind} id={`hexgrad-${kind}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="42%" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.18" />
        </linearGradient>
      ))}

      {/* Glossy radial highlight for the dice-number token. */}
      <radialGradient id="dice-token-grad" cx="0.5" cy="0.36" r="0.75">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
        <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
      </radialGradient>

      {/* Hex outline clip (unit hex at origin, ±HALFDELTA). */}
      <clipPath id="hex-clip" clipPathUnits="userSpaceOnUse">
        <polygon points={clipPoints} />
      </clipPath>

      {/* Soft drop shadow for raised pieces (settlements/cities/robber). */}
      <filter id="piece-shadow" x="-40%" y="-40%" width="180%" height="180%">
        <feDropShadow dx="0" dy="0.8" stdDeviation="0.9" floodColor="#000000" floodOpacity="0.45" />
      </filter>

      {/* Marker used by the clip; HALFDELTA constants documented for clarity. */}
      <metadata data-halfdelta-x={HALFDELTA_X} data-halfdelta-y={HALFDELTA_Y} />
    </defs>
  );
}
