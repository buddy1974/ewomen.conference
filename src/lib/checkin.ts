/**
 * Shared check-in state backed by localStorage.
 * Used by CheckIn page and AdminDashboard.
 */

export interface CheckInRecord {
  reference: string;
  timestamp: string; // ISO
}

const STORAGE_KEY = "ew2026_checkins";

export function getCheckIns(): CheckInRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addCheckIn(reference: string): void {
  const records = getCheckIns();
  records.push({ reference, timestamp: new Date().toISOString() });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function hasCheckedIn(reference: string): boolean {
  return getCheckIns().some((r) => r.reference === reference);
}

export function clearCheckIns(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/** Normalise raw scanned/typed text to a clean reference */
export function normaliseReference(raw: string): string {
  // Strip the EW2026- prefix if present (from QR codes)
  return raw.replace(/^EW2026-/i, "").trim().toUpperCase();
}

/** Test references accepted during event (replace with real list later) */
export const TEST_REFERENCES = new Set([
  "MTN-12345",
  "MTN-67890",
  "OM-99881",
]);
