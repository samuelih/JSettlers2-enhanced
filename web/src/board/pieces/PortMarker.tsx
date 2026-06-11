import type { JSX } from 'react';
import { type BoardPort, RESOURCE_HEX_TYPES, hexKind, type HexKind } from '../types';
import { edgeToPixel, getAdjacentNodeToEdge, nodeToPixel } from '../coords';
import styles from '../BoardSVG.module.css';

/** Port type 0 = misc 3:1; 1..5 = clay/ore/sheep/wheat/wood 2:1. */
function portLabel(ptype: number): string {
  if (ptype <= 0) {
    return '3:1';
  }
  return '2:1';
}

/** Resource key for a 2:1 port (used for an accessible data attribute + tint). */
function portResource(ptype: number): HexKind | 'misc' {
  if (ptype <= 0) {
    return 'misc';
  }
  const hexType = RESOURCE_HEX_TYPES[ptype - 1];
  return hexType === undefined ? 'unknown' : hexKind(hexType);
}

/** CSS-variable accent for the port badge ring, tinted by served resource. */
const PORT_TINT: Record<string, string> = {
  misc: 'var(--port-stroke)',
  clay: 'var(--hex-fill-clay)',
  ore: 'var(--hex-fill-ore)',
  sheep: 'var(--hex-fill-sheep)',
  wheat: 'var(--hex-fill-wheat)',
  wood: 'var(--hex-fill-wood)',
  unknown: 'var(--port-stroke)',
};

export interface PortMarkerProps {
  port: BoardPort;
}

/**
 * A small dock/ship marker at a port's edge, nudged toward the land node the
 * port faces (so it reads as belonging to that corner of the board). It shows a
 * little ship glyph pointing along the facing, a dock plank connecting the badge
 * to the coastline, and a round badge labeled `3:1` (misc) or `2:1` (resource).
 * Resource ports tint their badge ring to the served good. The resource is
 * exposed via `data-port-resource` for theming/tests.
 */
export function PortMarker({ port }: PortMarkerProps): JSX.Element {
  const edge = edgeToPixel(port.edge);
  const resource = portResource(port.ptype);
  const tint = PORT_TINT[resource] ?? 'var(--port-stroke)';

  // Bias the marker from the edge midpoint a little toward the facing land node,
  // so a 2:1 sheep port visually hugs the coastline corner it serves. Also
  // capture the angle from edge → land so the ship glyph points inland.
  let mx = edge.cx;
  let my = edge.cy;
  let angleDeg = 0;
  try {
    const landNode = getAdjacentNodeToEdge(port.edge, port.facing);
    const np = nodeToPixel(landNode);
    mx = edge.cx + (np.x - edge.cx) * 0.5;
    my = edge.cy + (np.y - edge.cy) * 0.5;
    angleDeg = (Math.atan2(np.y - edge.cy, np.x - edge.cx) * 180) / Math.PI;
  } catch {
    // facing perpendicular / bad data — fall back to the edge midpoint
  }

  const r = 9;
  return (
    <g
      data-testid={`port-${port.edge}`}
      data-port-type={port.ptype}
      data-port-resource={resource}
      pointerEvents="none"
    >
      {/* Dock plank from the coastline toward the badge. */}
      <line className={styles.portPlank} x1={edge.cx} y1={edge.cy} x2={mx} y2={my} />

      {/* Little ship pointing inland along the facing. */}
      <g transform={`translate(${mx} ${my}) rotate(${angleDeg})`}>
        <path
          className={styles.portShip}
          d={`M ${-r * 1.05} ${-r * 0.18} q ${r * 1.05} ${r * 0.95} ${r * 2.1} 0 Z`}
        />
        <line className={styles.portMast} x1={r * 0.5} y1={-r * 0.18} x2={r * 0.5} y2={-r * 1.1} />
        <path className={styles.portSail} d={`M ${r * 0.5} ${-r * 1.05} L ${r * 1.2} ${-r * 0.3} L ${r * 0.5} ${-r * 0.3} Z`} />
      </g>

      {/* Trade-ratio badge. */}
      <circle className={styles.portMarker} cx={mx} cy={my} r={r} style={{ stroke: tint }} />
      <text className={styles.portLabel} x={mx} y={my} fontSize={r * 0.74}>
        {portLabel(port.ptype)}
      </text>
    </g>
  );
}
