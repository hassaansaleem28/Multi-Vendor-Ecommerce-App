/**
 * Rate limiting for the AI search endpoint.
 *
 * Two layers, because they defend different things:
 *
 *   Per-IP    stops one visitor burning the shared budget.
 *   Global    keeps the whole site under Cerebras' free-tier ceiling
 *             (5 requests/minute, 1M tokens/day). Without this, a handful of
 *             simultaneous shoppers would get 429s straight from the provider.
 *
 * In-memory, so counters reset on restart and each instance counts separately.
 * That is fine for a single-instance deployment; move to Redis if this ever
 * runs behind more than one process.
 */

const PER_IP_LIMIT = 10;
const PER_IP_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

// Provider allows 5/min. Stay under it so real users see our friendly message
// rather than a provider rejection.
const GLOBAL_PER_MINUTE = 4;

// ~2K tokens per request against a 1M/day budget leaves plenty of room, but a
// runaway loop shouldn't be able to drain a day's quota in an hour.
const GLOBAL_PER_DAY = 400;

const ipHits = new Map(); // ip -> number[] (timestamps)
let globalMinute = [];
let globalDay = [];

function prune(timestamps, windowMs, now) {
  const cutoff = now - windowMs;
  let i = 0;
  while (i < timestamps.length && timestamps[i] <= cutoff) i++;
  return i === 0 ? timestamps : timestamps.slice(i);
}

// Keep the IP map from growing without bound on a long-running server.
setInterval(
  () => {
    const now = Date.now();
    for (const [ip, hits] of ipHits) {
      const live = prune(hits, PER_IP_WINDOW_MS, now);
      if (live.length === 0) ipHits.delete(ip);
      else ipHits.set(ip, live);
    }
  },
  5 * 60 * 1000
).unref?.();

export function aiRateLimit(req, res, next) {
  const now = Date.now();

  globalDay = prune(globalDay, 24 * 60 * 60 * 1000, now);
  if (globalDay.length >= GLOBAL_PER_DAY) {
    return res.status(429).json({
      success: false,
      message:
        "AI search has reached its daily limit. It'll be back tomorrow — regular search still works.",
    });
  }

  globalMinute = prune(globalMinute, 60 * 1000, now);
  if (globalMinute.length >= GLOBAL_PER_MINUTE) {
    return res.status(429).json({
      success: false,
      message: "AI search is busy right now — try again in a few seconds.",
    });
  }

  const ip = req.ip || req.socket?.remoteAddress || "unknown";
  const hits = prune(ipHits.get(ip) || [], PER_IP_WINDOW_MS, now);
  if (hits.length >= PER_IP_LIMIT) {
    return res.status(429).json({
      success: false,
      message:
        "You've asked a lot of questions in a short time. Please wait a few minutes.",
    });
  }

  hits.push(now);
  ipHits.set(ip, hits);
  globalMinute.push(now);
  globalDay.push(now);

  next();
}
