/** Session-scoped full profile blob for SPA + refresh until logout/tab close. */

const SNAP_KEY = "zo_user_profile_snap";

function normId(id) {
  return id === undefined || id === null ? "" : String(id);
}

/** @returns {{ user: object, savedAt: number } | null} */
export function readUserProfileSnapForSessionUser(sessionUserId) {
  if (typeof window === "undefined" || sessionUserId == null || sessionUserId === "")
    return null;
  try {
    const raw = sessionStorage.getItem(SNAP_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !parsed.user) return null;
    const snapUid = normId(parsed.sessionUserId);
    if (!snapUid || snapUid !== normId(sessionUserId)) return null;
    const savedAt = typeof parsed.savedAt === "number" ? parsed.savedAt : Date.now();
    return { user: parsed.user, savedAt };
  } catch {
    return null;
  }
}

export function persistUserProfileSnap(sessionUserId, user) {
  const sid = normId(sessionUserId);
  if (typeof window === "undefined" || !sid || !user) return;
  try {
    sessionStorage.setItem(
      SNAP_KEY,
      JSON.stringify({
        sessionUserId: sid,
        user,
        savedAt: Date.now(),
      }),
    );
  } catch {
    /* quota / privacy mode — in-memory Query cache still applies */
  }
}

export function clearUserProfileSnap() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(SNAP_KEY);
  } catch {}
}
