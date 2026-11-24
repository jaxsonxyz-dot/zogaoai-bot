export interface ZigzagPoint {
  x: number;
  y: number;
}

export interface ZigzagPathResult {
  d: string;
  thresholds: number[];
}

function cubicBezierPoint(
  p0: ZigzagPoint,
  cp1: ZigzagPoint,
  cp2: ZigzagPoint,
  p1: ZigzagPoint,
  t: number
): ZigzagPoint {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;

  return {
    x: uuu * p0.x + 3 * uu * t * cp1.x + 3 * u * tt * cp2.x + ttt * p1.x,
    y: uuu * p0.y + 3 * uu * t * cp1.y + 3 * u * tt * cp2.y + ttt * p1.y,
  };
}

function estimateCubicSegmentLength(
  p0: ZigzagPoint,
  cp1: ZigzagPoint,
  cp2: ZigzagPoint,
  p1: ZigzagPoint,
  samples = 32
): number {
  let length = 0;
  let prev = p0;
  for (let i = 1; i <= samples; i++) {
    const curr = cubicBezierPoint(p0, cp1, cp2, p1, i / samples);
    const dx = curr.x - prev.x;
    const dy = curr.y - prev.y;
    length += Math.hypot(dx, dy);
    prev = curr;
  }
  return length;
}

/**
 * Builds a C1/G2-smooth cubic Bezier zigzag S-curve that passes vertically
 * through the exact center coordinates of all four numbered process nodes.
 * - On desktop (where nodes sit inside the center channel), uses a single smooth
 *   S-curve between each consecutive node pair.
 * - On mobile (where cards alternate left/right and nodes sit in the opposite
 *   side channel, so |dx| > 35% of containerWidth), routes the beam vertically
 *   alongside each card and snakes cleanly through the open vertical gap between
 *   cards so the glowing line never touches card corners.
 */
export function buildSmoothZigzagPath(
  nodes: ZigzagPoint[],
  containerWidth: number
): ZigzagPathResult {
  if (nodes.length < 2 || containerWidth <= 0) {
    return {
      d: '',
      thresholds: [0.02, 0.33, 0.66, 0.95],
    };
  }

  const segments: string[] = [`M ${nodes[0].x.toFixed(2)},${nodes[0].y.toFixed(2)}`];
  const segmentLengths: number[] = [];

  for (let i = 0; i < nodes.length - 1; i++) {
    const p0 = nodes[i];
    const p1 = nodes[i + 1];
    const dx = p1.x - p0.x;
    const dy = p1.y - p0.y;
    const isWideMobileZigzag = Math.abs(dx) > containerWidth * 0.35 && dy > 0;

    if (isWideMobileZigzag) {
      // Mobile alternating zigzag: travel straight down the side channel past the
      // bottom of Card i (39% of dy), sweep across the inter-card gap with a tight
      // vertical-tangent S-curve, then travel straight down into Node i+1.
      const turnStart: ZigzagPoint = {
        x: p0.x,
        y: p0.y + dy * 0.39,
      };
      const turnEnd: ZigzagPoint = {
        x: p1.x,
        y: p1.y - dy * 0.39,
      };
      const gapDy = turnEnd.y - turnStart.y;
      const cp1: ZigzagPoint = {
        x: turnStart.x,
        y: turnStart.y + gapDy * 0.68,
      };
      const cp2: ZigzagPoint = {
        x: turnEnd.x,
        y: turnEnd.y - gapDy * 0.68,
      };

      segments.push(
        `L ${turnStart.x.toFixed(2)},${turnStart.y.toFixed(2)}`,
        `C ${cp1.x.toFixed(2)},${cp1.y.toFixed(2)} ${cp2.x.toFixed(2)},${cp2.y.toFixed(2)} ${turnEnd.x.toFixed(2)},${turnEnd.y.toFixed(2)}`,
        `L ${p1.x.toFixed(2)},${p1.y.toFixed(2)}`
      );

      const straight1 = Math.abs(turnStart.y - p0.y);
      const curveLen = estimateCubicSegmentLength(turnStart, cp1, cp2, turnEnd);
      const straight2 = Math.abs(p1.y - turnEnd.y);
      segmentLengths.push(straight1 + curveLen + straight2);
    } else {
      // Desktop / tablet center-channel S-curve
      const cp1: ZigzagPoint = {
        x: p0.x,
        y: p0.y + dy * 0.48,
      };
      const cp2: ZigzagPoint = {
        x: p1.x,
        y: p1.y - dy * 0.48,
      };

      segments.push(
        `C ${cp1.x.toFixed(2)},${cp1.y.toFixed(2)} ${cp2.x.toFixed(2)},${cp2.y.toFixed(2)} ${p1.x.toFixed(2)},${p1.y.toFixed(2)}`
      );

      segmentLengths.push(estimateCubicSegmentLength(p0, cp1, cp2, p1));
    }
  }

  const totalLength = segmentLengths.reduce((acc, len) => acc + len, 0);
  if (totalLength <= 0) {
    return {
      d: segments.join(' '),
      thresholds: [0.02, 0.33, 0.66, 0.95],
    };
  }

  const thresholds: number[] = [0.02];
  let cumulative = 0;
  for (let i = 0; i < segmentLengths.length; i++) {
    cumulative += segmentLengths[i];
    const ratio = cumulative / totalLength;
    thresholds.push(
      i === segmentLengths.length - 1 ? Math.min(0.96, ratio - 0.02) : ratio
    );
  }

  return {
    d: segments.join(' '),
    thresholds,
  };
}

export function isNodeIlluminated(
  progress: number,
  nodeIndex: number,
  thresholds: number[],
  prefersReducedMotion: boolean
): boolean {
  if (prefersReducedMotion) return true;
  const threshold =
    thresholds[nodeIndex] ?? nodeIndex / Math.max(1, thresholds.length - 1);
  return progress >= threshold;
}
