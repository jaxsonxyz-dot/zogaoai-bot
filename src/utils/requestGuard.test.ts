import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createSingleFlightLock,
  createSubmissionGuard,
  createClickThrottle,
  withTimeout,
} from './requestGuard';

test('createSingleFlightLock allows only 1 execution when 100 simultaneous clicks fire concurrently', async () => {
  const lock = createSingleFlightLock();
  let executionCount = 0;

  const slowTask = async () => {
    executionCount += 1;
    await new Promise((r) => setTimeout(r, 30));
    return 'completed';
  };

  // Simulate 100 simultaneous clicks in the exact same tick
  const clicks = Array.from({ length: 100 }, () => lock.run(slowTask));
  const results = await Promise.all(clicks);

  const succeeded = results.filter((r) => r === 'completed');
  const ignored = results.filter((r) => r === undefined);

  assert.equal(executionCount, 1);
  assert.equal(succeeded.length, 1);
  assert.equal(ignored.length, 99);
  assert.equal(lock.isLocked(), false);
});

test('createSubmissionGuard blocks 100 concurrent submissions, duplicate payloads, and rapid spam', async () => {
  const guard = createSubmissionGuard({ cooldownMs: 2000, dedupeWindowMs: 30000 });
  let dbInserts = 0;

  const payload = {
    name: 'Alex Founder',
    email: 'alex@startup.io',
    message: 'We need a new website and brand identity.',
    services: ['webDevelopment', 'graphicsDesign'],
  };

  // Fire 80 concurrent clicks with the same payload
  const concurrentAttempts = Array.from({ length: 80 }, () =>
    guard.execute(payload, async () => {
      dbInserts += 1;
      await new Promise((r) => setTimeout(r, 20));
      return { id: 'msg-1' };
    })
  );

  const outcomes = await Promise.all(concurrentAttempts);
  const allowedOutcomes = outcomes.filter((o) => o.status.allowed);
  const blockedInFlight = outcomes.filter((o) => o.status.reason === 'in_flight');

  assert.equal(dbInserts, 1);
  assert.equal(allowedOutcomes.length, 1);
  assert.equal(blockedInFlight.length, 79);

  // Immediate retry with same payload after completion is blocked by cooldown / duplicate guard
  const immediateRetry = await guard.execute(payload, () => {
    dbInserts += 1;
  });
  assert.equal(immediateRetry.status.allowed, false);
  assert.equal(dbInserts, 1);
});

test('createClickThrottle limits rapid 100-click bursts to controlled intervals', () => {
  const throttle = createClickThrottle(200);
  let accepted = 0;

  // 100 clicks spread over 1000ms (1 click every 10ms)
  for (let i = 0; i < 100; i++) {
    if (throttle.shouldAllow(i * 10)) {
      accepted += 1;
    }
  }

  // Over 1000ms with 200ms throttle, only 5 clicks (at t=0, 200, 400, 600, 800) are accepted
  assert.equal(accepted, 5);
});

test('withTimeout resolves with fallback value when slow network exceeds timeout', async () => {
  const hangingRequest = new Promise<string>((resolve) => {
    setTimeout(() => resolve('late-response'), 500);
  });

  const result = await withTimeout(hangingRequest, 40, 'fallback-offline');
  assert.equal(result, 'fallback-offline');
});
