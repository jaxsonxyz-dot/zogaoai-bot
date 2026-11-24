import test from 'node:test';
import assert from 'node:assert/strict';
import {
  wrap,
  deckPose,
  tiltFor,
  isThrow,
  pad2,
} from '../components/ui/card-deck-carousel';

test('wrap cycles positive and negative indices cleanly across deck size', () => {
  assert.equal(wrap(0, 5), 0);
  assert.equal(wrap(5, 5), 0);
  assert.equal(wrap(-1, 5), 4);
  assert.equal(wrap(7, 5), 2);
  assert.equal(wrap(3, 0), 0);
});

test('deckPose positions top card flat and scales/shades deeper cards up to depth 3', () => {
  const top = deckPose(0, 6, false);
  assert.equal(top.y, 0);
  assert.equal(top.scale, 1);
  assert.equal(top.rot, 0);
  assert.equal(top.opacity, 1);

  const second = deckPose(1, 5.5, false);
  assert.ok(second.y < 0);
  assert.ok(second.scale < 1);
  assert.equal(second.rot, 5.5);
  assert.equal(second.opacity, 1);

  const reduced = deckPose(1, 5.5, true);
  assert.equal(reduced.rot, 0);

  const hidden = deckPose(4, 4, false);
  assert.equal(hidden.opacity, 0);
});

test('tiltFor returns deterministic tilt within [-max, max] and isThrow detects drag throws', () => {
  for (let i = 0; i < 10; i++) {
    const t = tiltFor(i, 6);
    assert.ok(t >= -6 && t <= 6);
  }
  // Wide drag triggers throw
  assert.equal(isThrow(120, 0.1, 360), true);
  // Fast flick triggers throw
  assert.equal(isThrow(30, 0.7, 360), true);
  // Small tap/nudge does not throw
  assert.equal(isThrow(10, 0.1, 360), false);
  assert.equal(pad2(3), '03');
  assert.equal(pad2(12), '12');
});
