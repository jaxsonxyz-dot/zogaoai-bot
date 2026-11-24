import test from 'node:test';
import assert from 'node:assert/strict';
import { buildSmoothZigzagPath, isNodeIlluminated } from './zigzagPath';

test('buildSmoothZigzagPath passes through all 4 alternating node centers on desktop and produces monotonic thresholds', () => {
  const nodes = [
    { x: 485, y: 160 },
    { x: 555, y: 480 },
    { x: 485, y: 800 },
    { x: 555, y: 1120 },
  ];

  const { d, thresholds } = buildSmoothZigzagPath(nodes, 1040);

  // Starts at Node 01 center
  assert.ok(d.startsWith('M 485.00,160.00'));
  // Passes through Node 02, Node 03, and ends at Node 04 center
  assert.ok(d.includes('555.00,480.00'));
  assert.ok(d.includes('485.00,800.00'));
  assert.ok(d.endsWith('555.00,1120.00'));

  assert.equal(thresholds.length, 4);
  assert.ok(thresholds[0] < thresholds[1]);
  assert.ok(thresholds[1] < thresholds[2]);
  assert.ok(thresholds[2] < thresholds[3]);
  assert.ok(Math.abs(thresholds[1] - 1 / 3) < 0.03);
  assert.ok(Math.abs(thresholds[2] - 2 / 3) < 0.03);
});

test('buildSmoothZigzagPath routes mobile wide alternating zigzag cleanly through side channels and inter-card gaps', () => {
  const mobileNodes = [
    { x: 320, y: 100 },
    { x: 38, y: 340 },
    { x: 320, y: 580 },
    { x: 38, y: 820 },
  ];

  const { d, thresholds } = buildSmoothZigzagPath(mobileNodes, 358);

  assert.ok(d.startsWith('M 320.00,100.00'));
  assert.ok(d.includes('L 38.00,340.00'));
  assert.ok(d.includes('L 320.00,580.00'));
  assert.ok(d.endsWith('L 38.00,820.00'));
  assert.equal(thresholds.length, 4);
  assert.ok(thresholds[0] < thresholds[1] && thresholds[1] < thresholds[2] && thresholds[2] < thresholds[3]);
});

test('isNodeIlluminated lights nodes sequentially with scroll progress and respects reduced motion', () => {
  const thresholds = [0.02, 0.33, 0.66, 0.96];

  assert.equal(isNodeIlluminated(0.0, 0, thresholds, false), false);
  assert.equal(isNodeIlluminated(0.05, 0, thresholds, false), true);
  assert.equal(isNodeIlluminated(0.2, 1, thresholds, false), false);
  assert.equal(isNodeIlluminated(0.4, 1, thresholds, false), true);
  assert.equal(isNodeIlluminated(0.7, 2, thresholds, false), true);
  assert.equal(isNodeIlluminated(0.9, 3, thresholds, false), false);
  assert.equal(isNodeIlluminated(0.97, 3, thresholds, false), true);

  assert.equal(isNodeIlluminated(0.0, 3, thresholds, true), true);
});
