import { api } from "./apiClient";

/** Same UUID string always — avoids Set.has / object key mismatches (case, spacing). */
export function normalizeQuizId(id) {
  if (id == null) return "";
  return String(id).trim().toLowerCase();
}

function readJwtSub(token) {
  if (!token || typeof token !== "string") return null;
  try {
    const part = token.split(".")[1];
    if (!part) return null;
    const padded = part.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(padded));
    return payload.sub ?? null;
  } catch {
    return null;
  }
}

/**
 * user-attempts API expects URL param === JWT `sub`. Profile `user_id` can drift; prefer token.
 */
export function resolveUserIdForQuizApi(profileUser) {
  if (typeof window !== "undefined") {
    const sub = readJwtSub(localStorage.getItem("access_token"));
    if (sub) return String(sub);
  }
  const u = profileUser?.user_id ?? profileUser?.id;
  return u != null ? String(u) : null;
}

export function normalizeAttemptsPayload(attempts, details) {
  const seen = new Set();
  const normAttempts = [];
  for (const a of attempts || []) {
    const n = normalizeQuizId(a);
    if (!n || seen.has(n)) continue;
    seen.add(n);
    normAttempts.push(n);
  }
  const normDetails = {};
  Object.entries(details || {}).forEach(([k, v]) => {
    const id = normalizeQuizId(k);
    if (!id) return;
    normDetails[id] = v;
  });
  return { attempts: normAttempts, details: normDetails };
}

export const isAdmissionCandidate = (user) => {
  const level = String(
    user?.grade_level || user?.current_level || user?.gradeLevel || ""
  );
  return level.includes("Admission Candidate") || level.includes("Musannif");
};

export const resolveCategoryFromUser = (user) => {
  const normalizedRound = String(user?.round_type || "")
    .toLowerCase()
    .replace(/\s+/g, "_");
  let category = "SDG Activist";
  if (normalizedRound.includes("round_3")) category = "SDG Achiever";
  else if (normalizedRound.includes("round_2")) category = "SDG Ambassador";
  if (user?.sdg_role) category = user.sdg_role;
  if (isAdmissionCandidate(user)) category = "SDG Achiever";
  return category;
};

export async function fetchQuizzesWithFallback(apiBase, category) {
  const endpoints = [
    `${apiBase}/api/admin/public-quizzes`,
    `${apiBase}/api/quiz/public-quizzes`,
  ];
  let lastError = null;
  for (const url of endpoints) {
    try {
      return await api.get(url, { params: { category } });
    } catch (err) {
      lastError = err;
      if (err?.response?.status !== 404) throw err;
    }
  }
  throw lastError;
}

/** Published quiz by id (for submissions whose quiz isn’t in the category-filtered list). */
export async function fetchSinglePublishedQuiz(apiBase, quizSetId) {
  const id = encodeURIComponent(normalizeQuizId(quizSetId));
  const endpoints = [
    `${apiBase}/api/admin/public-quiz/${id}`,
    `${apiBase}/api/quiz/public-quiz/${id}`,
  ];
  let lastError = null;
  for (const url of endpoints) {
    try {
      return await api.get(url);
    } catch (err) {
      lastError = err;
      if (err?.response?.status !== 404) throw err;
    }
  }
  throw lastError;
}

export async function fetchAttemptsWithFallback(apiBase, userId) {
  if (!userId) {
    return normalizeAttemptsPayload([], {});
  }
  const uid = encodeURIComponent(userId);
  const endpoints = [
    `${apiBase}/api/admin/user-attempts/${uid}`,
    `${apiBase}/api/quiz/user-attempts/${uid}`,
  ];
  for (const url of endpoints) {
    try {
      const response = await api.get(url);
      const raw = response?.data || {};
      return normalizeAttemptsPayload(raw.attempts, raw.details);
    } catch (err) {
      if (err?.response?.status !== 404) throw err;
    }
  }
  return normalizeAttemptsPayload([], {});
}

/**
 * Merges category list + any submitted quizzes not returned by public-quizzes (e.g. old category / role change).
 */
export async function loadQuizzesWithSubmissionCoverage({
  apiBase,
  category,
  attemptsPkg,
}) {
  const { attempts: normAttempts, details } = attemptsPkg;

  const res = await fetchQuizzesWithFallback(apiBase, category);
  const fetchedQuizzes = res.data?.data || [];

  const fetchedSet = new Set(
    fetchedQuizzes.map((q) => normalizeQuizId(q.id))
  );
  const missingIds = normAttempts.filter((id) => !fetchedSet.has(id));

  const extra = [];
  for (const mid of missingIds) {
    try {
      const one = await fetchSinglePublishedQuiz(apiBase, mid);
      const q = one.data?.data;
      if (q) extra.push({ ...q });
    } catch {
      extra.push({
        id: mid,
        title: "Submitted quiz",
        category: "—",
        time_limit: null,
        start_at: null,
        ends_at: null,
        questions: [],
        submissionMetaOnly: true,
      });
    }
  }

  const attemptedSet = new Set(normAttempts);

  const fetchedWithFlags = fetchedQuizzes.map((q) => ({
    ...q,
    hasAttempted: attemptedSet.has(normalizeQuizId(q.id)),
  }));

  const extraWithFlags = extra.map((q) => ({
    ...q,
    hasAttempted: true,
  }));

  return {
    quizzes: [...extraWithFlags, ...fetchedWithFlags],
    details,
  };
}
