import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PARTNER_ARCHETYPES,
  isArchetypeHighlighted,
  getMatchingArchetypeCount,
  getArchetypeById,
} from './partnerArchetypes';

test('PARTNER_ARCHETYPES has all 5 agency client profiles with problems, outcomes, deliverables, and routes', () => {
  assert.equal(PARTNER_ARCHETYPES.length, 5);
  for (const archetype of PARTNER_ARCHETYPES) {
    assert.ok(archetype.title.length > 0);
    assert.ok(archetype.shortTitle.length > 0);
    assert.ok(archetype.spineTag.length > 0);
    assert.ok(archetype.focusStat.length > 0);
    assert.ok(archetype.flowStat.length > 0);
    assert.ok(archetype.spineSurface.length > 0);
    assert.ok(archetype.expandedSurface.length > 0);
    assert.ok(archetype.challenge.length > 0);
    assert.ok(archetype.outcome.length > 0);
    assert.ok(archetype.serviceRoute.startsWith('/services/'));
    assert.ok(archetype.serviceLabel.startsWith('View '));
    assert.equal(archetype.deliverables.length, 3);
    assert.equal(archetype.workflowSteps.length, 3);
  }
});

test('isArchetypeHighlighted and getMatchingArchetypeCount support multi-category agency filters', () => {
  const newBrands = getArchetypeById('new-growing-brands');
  const ecommerce = getArchetypeById('ecommerce-online-stores');
  const established = getArchetypeById('established-companies');

  assert.ok(newBrands && ecommerce && established);

  assert.equal(getMatchingArchetypeCount('all'), 5);
  assert.equal(isArchetypeHighlighted(newBrands, 'web-design'), true);
  assert.equal(isArchetypeHighlighted(newBrands, 'branding'), true);
  assert.equal(isArchetypeHighlighted(newBrands, 'automation'), false);

  assert.equal(isArchetypeHighlighted(ecommerce, 'ecommerce'), true);
  assert.equal(isArchetypeHighlighted(established, 'automation'), true);
});
