import { isSupabaseConfigured } from '@/lib/cms';
import { createSubmissionGuard, withTimeout } from '@/utils/requestGuard';
import { getDevicePerformanceProfile } from '@/utils/devicePerformance';
import { safeReadArray, safeWriteArray } from '@/utils/safeStorage';

// Define the types
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: number;
  services?: string[];
}

export interface Review {
  id: string;
  name: string;
  initial: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  bgColor: string;
  timestamp: number;
  date?: string;
  source?: string;
  reviewUrl?: string;
  approved?: boolean;
}

// Storage keys
const CONTACT_STORAGE_KEY = 'zogago_contact_messages';
const REVIEWS_STORAGE_KEY = 'zogago_reviews';
const getMaxStoredItems = (): number => getDevicePerformanceProfile().maxLocalStorageItems;

const contactSubmissionGuard = createSubmissionGuard({
  cooldownMs: 2000,
  dedupeWindowMs: 45_000,
});

const reviewSubmissionGuard = createSubmissionGuard({
  cooldownMs: 2000,
  dedupeWindowMs: 45_000,
});

// Generate a unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Contact Messages — saves to localStorage, syncs to Supabase contact_inquiries,
// and forwards to optional VITE_CONTACT_WEBHOOK_URL (e.g., Formspree / Web3Forms)
// Protected against 50-100 simultaneous clicks & duplicate payloads
export const saveContactMessage = (
  message: Omit<ContactMessage, 'id' | 'timestamp'>
): ContactMessage => {
  const cleanName = message.name.trim();
  const cleanEmail = message.email.trim();
  const cleanText = message.message.trim();
  const cleanServices =
    message.services && message.services.length > 0 ? message.services : [];

  const check = contactSubmissionGuard.canSubmit({
    name: cleanName,
    email: cleanEmail,
    message: cleanText,
    services: cleanServices,
  });

  const existingMessages = getContactMessages();

  // If this exact payload was already submitted in the current burst/window, return the latest matching message
  if (!check.allowed && existingMessages.length > 0) {
    return existingMessages[existingMessages.length - 1];
  }

  const newMessage: ContactMessage = {
    name: cleanName,
    email: cleanEmail,
    message: cleanText,
    services: cleanServices,
    id: generateId(),
    timestamp: Date.now(),
  };

  // Record in guard synchronously so 50-100 concurrent calls in the same tick are blocked
  void contactSubmissionGuard.execute(
    {
      name: cleanName,
      email: cleanEmail,
      message: cleanText,
      services: cleanServices,
    },
    () => newMessage
  );

  const updatedMessages = [...existingMessages, newMessage];
  safeWriteArray(CONTACT_STORAGE_KEY, updatedMessages, getMaxStoredItems());

  // Persist to Supabase contact_inquiries table only when configured
  if (isSupabaseConfigured()) {
    const insertPromise = import('@/integrations/supabase/client')
      .then(({ supabase }) =>
        supabase.from('contact_inquiries').insert({
          name: cleanName,
          email: cleanEmail,
          message: cleanText,
          services: cleanServices.length > 0 ? cleanServices : null,
        })
      )
      .then(({ error }) => {
        if (error) {
          console.warn('Supabase contact_inquiries insert warning:', error.message);
        }
      })
      .catch(() => {});

    void withTimeout(insertPromise, 6000, undefined);
  }

  // Optional direct email webhook (e.g. Formspree / Web3Forms / Make / Zapier)
  const webhookUrl = import.meta.env.VITE_CONTACT_WEBHOOK_URL;
  if (webhookUrl && typeof fetch === 'function') {
    const webhookPromise = fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: cleanName,
        email: cleanEmail,
        message: cleanText,
        services: cleanServices.join(', '),
        submittedAt: new Date(newMessage.timestamp).toISOString(),
      }),
    }).catch(() => {});

    void withTimeout(webhookPromise, 6000, undefined);
  }

  return newMessage;
};

export const getContactMessages = (): ContactMessage[] => {
  return safeReadArray<ContactMessage>(CONTACT_STORAGE_KEY);
};

export const deleteContactMessage = (id: string): void => {
  const filtered = getContactMessages().filter((m) => m.id !== id);
  safeWriteArray(CONTACT_STORAGE_KEY, filtered, getMaxStoredItems());
};

// Get background color for review avatars
export const getRandomBgColor = (): string => {
  const colors = [
    "bg-zogago-blue",
    "bg-zogago-purple",
    "bg-zogago-pink",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-violet-500"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Reviews — only genuine reviews are stored; any legacy default-* sample entries are filtered out.
// Visitor-submitted and imported reviews default to `approved: false` (staged privately in the backend vault)
// so the studio can gather 10–15 reviews before publishing them live.
export const saveReview = (review: Omit<Review, 'id' | 'timestamp' | 'bgColor'>): Review => {
  const cleanName = review.name.trim();
  const cleanText = review.text.trim();
  const existingReviews = getReviews();

  const check = reviewSubmissionGuard.canSubmit({
    name: cleanName,
    text: cleanText,
    rating: review.rating,
  });

  if (!check.allowed && existingReviews.length > 0) {
    return existingReviews[existingReviews.length - 1];
  }

  const isApproved = review.approved === true;

  const newReview: Review = {
    ...review,
    name: cleanName,
    text: cleanText,
    id: generateId(),
    timestamp: Date.now(),
    bgColor: getRandomBgColor(),
    date:
      review.date ||
      new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    source: review.source || 'Google Reviews',
    approved: isApproved,
  };

  void reviewSubmissionGuard.execute(
    { name: cleanName, text: cleanText, rating: review.rating },
    () => newReview
  );

  const updatedReviews = [...existingReviews, newReview];
  safeWriteArray(REVIEWS_STORAGE_KEY, updatedReviews, getMaxStoredItems());

  // Also persist visitor review submissions to Supabase contact_inquiries (with source = 'review_submission')
  // and optional webhook so reviews submitted from any client device reach the studio backend
  if (!isApproved && isSupabaseConfigured()) {
    const metaTag = `Rating: ${newReview.rating}/5 | Role: ${newReview.role || 'Client'} | Company: ${newReview.company || 'N/A'}`;
    const insertPromise = import('@/integrations/supabase/client')
      .then(({ supabase }) =>
        supabase.from('contact_inquiries').insert({
          name: cleanName,
          email: newReview.company
            ? `${newReview.role || 'Client'} @ ${newReview.company}`
            : newReview.role || 'Client Review',
          message: cleanText,
          services: [metaTag, `rating:${newReview.rating}`],
          source: 'review_submission',
        })
      )
      .catch(() => {});

    void withTimeout(insertPromise, 6000, undefined);
  }

  const webhookUrl = import.meta.env.VITE_CONTACT_WEBHOOK_URL;
  if (!isApproved && webhookUrl && typeof fetch === 'function') {
    const webhookPromise = fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        type: 'NEW_CLIENT_REVIEW_STAGED',
        name: cleanName,
        role: newReview.role,
        company: newReview.company,
        rating: newReview.rating,
        review: cleanText,
        submittedAt: new Date(newReview.timestamp).toISOString(),
      }),
    }).catch(() => {});

    void withTimeout(webhookPromise, 6000, undefined);
  }

  return newReview;
};

export const getReviews = (): Review[] => {
  const parsed = safeReadArray<Review>(REVIEWS_STORAGE_KEY);
  // Filter out any legacy fabricated sample reviews ('default-1' .. 'default-8')
  const genuineOnly = parsed.filter((r) => !String(r.id).startsWith('default-'));
  if (genuineOnly.length !== parsed.length) {
    safeWriteArray(REVIEWS_STORAGE_KEY, genuineOnly, getMaxStoredItems());
  }
  return genuineOnly;
};

export const deleteReview = (id: string): void => {
  const filtered = getReviews().filter((r) => r.id !== id);
  safeWriteArray(REVIEWS_STORAGE_KEY, filtered, getMaxStoredItems());
};

// Toggle a single review between Staged in Vault (approved: false) and Published Live (approved: true)
export const toggleReviewApproval = (id: string): Review[] => {
  const updated = getReviews().map((r) =>
    r.id === id ? { ...r, approved: !r.approved } : r
  );
  safeWriteArray(REVIEWS_STORAGE_KEY, updated, getMaxStoredItems());
  return updated.sort((a, b) => b.timestamp - a.timestamp);
};

// Batch publish or unpublish all stored reviews at once
export const setAllReviewsApproval = (approved: boolean): Review[] => {
  const updated = getReviews().map((r) => ({ ...r, approved }));
  safeWriteArray(REVIEWS_STORAGE_KEY, updated, getMaxStoredItems());
  return updated.sort((a, b) => b.timestamp - a.timestamp);
};

// Import Google Reviews (from Google Places API JSON, Featurable JSON, Outscraper JSON, or array)
// Saves all imported reviews into the private Vault with `approved: false` so admin can review & batch-publish later.
export const importGoogleReviewsToVault = (rawPayload: unknown): {
  importedCount: number;
  totalReviews: Review[];
} => {
  const existing = getReviews();
  const seenSignatures = new Set(
    existing.map((r) => `${r.name.toLowerCase()}::${r.text.slice(0, 60).toLowerCase()}`)
  );

  let rawList: any[] = [];
  if (Array.isArray(rawPayload)) {
    rawList = rawPayload;
  } else if (rawPayload && typeof rawPayload === 'object') {
    const obj = rawPayload as Record<string, any>;
    if (Array.isArray(obj.reviews)) {
      rawList = obj.reviews;
    } else if (obj.result && Array.isArray(obj.result.reviews)) {
      rawList = obj.result.reviews;
    } else if (Array.isArray(obj.data)) {
      rawList = obj.data;
    }
  }

  const newlyAdded: Review[] = [];

  for (const item of rawList) {
    if (!item || typeof item !== 'object') continue;
    const rawName = String(
      item.author_name ||
        item.reviewer?.displayName ||
        item.name ||
        item.author ||
        ''
    ).trim();
    const rawText = String(
      item.text || item.comment || item.review || item.content || ''
    ).trim();
    if (!rawName || !rawText) continue;

    const sig = `${rawName.toLowerCase()}::${rawText.slice(0, 60).toLowerCase()}`;
    if (seenSignatures.has(sig)) continue;
    seenSignatures.add(sig);

    const numRating = Math.min(
      5,
      Math.max(1, Number(item.rating || item.starRating || 5) || 5)
    );

    newlyAdded.push({
      id: generateId(),
      name: rawName,
      initial: rawName.charAt(0).toUpperCase(),
      role: String(item.role || 'Verified Reviewer').trim(),
      company: String(item.company || '').trim(),
      text: rawText,
      rating: numRating,
      bgColor: getRandomBgColor(),
      timestamp: item.time ? Number(item.time) * 1000 : Date.now(),
      date:
        item.relative_time_description ||
        item.date ||
        new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      source: String(item.source || 'Google Review'),
      reviewUrl: item.author_url || item.reviewUrl || undefined,
      approved: false, // Always staged in private vault first!
    });
  }

  if (newlyAdded.length > 0) {
    const merged = [...existing, ...newlyAdded];
    safeWriteArray(REVIEWS_STORAGE_KEY, merged, getMaxStoredItems());
  }

  return {
    importedCount: newlyAdded.length,
    totalReviews: getAllReviews(),
  };
};

// Get all genuine reviews (both staged and published) sorted by timestamp — used by Admin Dashboard
export const getAllReviews = (): Review[] => {
  const storedReviews = getReviews();
  return storedReviews.sort((a, b) => b.timestamp - a.timestamp);
};

// Get ONLY approved/published reviews — used by public pages (/reviews and Homepage #reviews)
export const getPublishedReviews = (): Review[] => {
  return getAllReviews().filter((r) => r.approved === true);
};

