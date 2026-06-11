import type { JSX } from 'react';
import {
  type BoardPiece,
  PIECE_ROAD,
  PIECE_SETTLEMENT,
  PIECE_CITY,
  PIECE_SHIP,
} from '../types';
import { edgeToPixel, nodeToPixel, HALFDELTA_X } from '../coords';
import styles from '../BoardSVG.module.css';

export interface PieceProps {
  piece: BoardPiece;
  /** Owning player's color (hex/rgb string from the playerColors prop). */
  color: string;
}

/** Dispatch a board piece to its glyph by piece type. */
export function Piece({ piece, color }: PieceProps): JSX.Element | null {
  switch (piece.ptype) {
    case PIECE_ROAD:
      return <RoadOrShip piece={piece} color={color} ship={false} />;
    case PIECE_SHIP:
      return <RoadOrShip piece={piece} color={color} ship />;
    case PIECE_SETTLEMENT:
      return <Settlement piece={piece} color={color} />;
    case PIECE_CITY:
      return <City piece={piece} color={color} />;
    default:
      return null; // <--- Early return: unknown piece type ---
  }
}

/** Slightly darken a player color for outlines/keylines. */
function darken(color: string): string {
  // The piece outline comes from a CSS variable; we only fall back to a color
  // mix when the browser supports it. Keep it simple and theme-driven.
  return `color-mix(in srgb, ${color} 62%, #000)`;
}

/**
 * A road (solid rounded bar) or a ship (segmented hull motif) drawn along its
 * edge. A dark outline underneath gives the player-colored bar contrast on any
 * hex fill; ships additionally get a little hull silhouette so they read as
 * boats, not just dashed roads. Pieces fade/pop in via the `.piecePop` class.
 */
function RoadOrShip({
  piece,
  color,
  ship,
}: PieceProps & { ship: boolean }): JSX.Element {
  const e = edgeToPixel(piece.coord);
  const w = HALFDELTA_X * 0.32;
  const testid = ship ? `ship-${piece.coord}` : `road-${piece.coord}`;
  const mx = (e.x1 + e.x2) / 2;
  const my = (e.y1 + e.y2) / 2;
  return (
    <g data-testid={testid} data-player={piece.playerNumber} className={styles.piecePop} pointerEvents="none">
      {/* dark keyline for contrast */}
      <line
        className={styles.roadOutline}
        x1={e.x1}
        y1={e.y1}
        x2={e.x2}
        y2={e.y2}
        strokeWidth={w + 3}
      />
      {/* player-colored bar */}
      <line
        className={styles.road}
        x1={e.x1}
        y1={e.y1}
        x2={e.x2}
        y2={e.y2}
        stroke={color}
        strokeWidth={w}
      />
      {ship && (
        // A small boat hull centered on the edge to distinguish ships clearly.
        <g transform={`translate(${mx} ${my}) rotate(${e.angle})`}>
          <path
            className={styles.shipHull}
            d={`M ${-w * 1.2} 0 q ${w * 1.2} ${w * 1.5} ${w * 2.4} 0 Z`}
            fill={color}
          />
          <line className={styles.shipMast} x1={0} y1={0} x2={0} y2={-w * 1.3} />
          <path className={styles.shipSail} d={`M 0 ${-w * 1.25} L ${w * 1.1} ${-w * 0.35} L 0 ${-w * 0.35} Z`} fill={color} />
        </g>
      )}
    </g>
  );
}

/** A settlement: a small house glyph (square base + roof) at its node. */
function Settlement({ piece, color }: PieceProps): JSX.Element {
  const { x, y } = nodeToPixel(piece.coord);
  const s = HALFDELTA_X * 0.34;
  return (
    <g
      data-testid={`settlement-${piece.coord}`}
      data-player={piece.playerNumber}
      className={styles.piecePop}
      pointerEvents="none"
    >
      <path className={styles.settlement} d={housePath(x, y, s)} fill={color} stroke={darken(color)} />
      {/* door for a touch of detail */}
      <rect className={styles.pieceDetail} x={x - s * 0.22} y={y + s * 0.1} width={s * 0.44} height={s * 0.9} rx={1} />
    </g>
  );
}

/** A city: a larger house glyph with a second block, at its node. */
function City({ piece, color }: PieceProps): JSX.Element {
  const { x, y } = nodeToPixel(piece.coord);
  const s = HALFDELTA_X * 0.46;
  return (
    <g
      data-testid={`city-${piece.coord}`}
      data-player={piece.playerNumber}
      className={styles.piecePop}
      pointerEvents="none"
    >
      <path className={styles.city} d={cityPath(x, y, s)} fill={color} stroke={darken(color)} />
      {/* windows on the tower */}
      <rect className={styles.pieceDetail} x={x + s * 0.06} y={y - s * 0.55} width={s * 0.3} height={s * 0.34} rx={0.8} />
      <rect className={styles.pieceDetail} x={x + s * 0.06} y={y - s * 0.02} width={s * 0.3} height={s * 0.34} rx={0.8} />
    </g>
  );
}

/** House silhouette (square body + triangular roof) centered at (x, y). */
function housePath(x: number, y: number, s: number): string {
  const left = x - s;
  const right = x + s;
  const top = y - s;
  const bottom = y + s;
  const roof = y - s * 1.9;
  return [
    `M ${left} ${bottom}`,
    `L ${left} ${top}`,
    `L ${x} ${roof}`,
    `L ${right} ${top}`,
    `L ${right} ${bottom}`,
    'Z',
  ].join(' ');
}

/** City silhouette: a tall tower joined to a lower house wing. */
function cityPath(x: number, y: number, s: number): string {
  const left = x - s * 1.3;
  const right = x + s * 1.1;
  const bottom = y + s;
  const wingTop = y - s * 0.2;
  const towerTop = y - s * 1.1;
  const roof = y - s * 1.9;
  const mid = x - s * 0.1;
  return [
    `M ${left} ${bottom}`,
    `L ${left} ${wingTop}`,
    `L ${mid} ${wingTop}`,
    `L ${mid} ${towerTop}`,
    `L ${x + s * 0.5} ${roof}`,
    `L ${right} ${towerTop}`,
    `L ${right} ${bottom}`,
    'Z',
  ].join(' ');
}
