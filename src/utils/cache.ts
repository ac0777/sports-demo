type Entry<T> = { v: T; t: number; ttl: number };
const mem = new Map<string, Entry<any>>();
const inFlight = new Map<string, Promise<any>>();

function readLocal<T>(key: string): Entry<T> | null {
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Entry<T>;
  } catch {
    return null;
  }
}

export function getFresh<T>(key: string): T | null {
  const now = Date.now();
  const m = mem.get(key);
  if (m && now - m.t < m.ttl) return m.v;

  const l = readLocal<T>(key);
  if (l && now - l.t < l.ttl) {
    mem.set(key, l);
    return l.v;
  }
  return null;
}

export function setCache<T>(key: string, value: T, ttlMs: number) {
  const e: Entry<T> = { v: value, t: Date.now(), ttl: ttlMs };
  mem.set(key, e);
  localStorage.setItem(key, JSON.stringify(e));
}

export async function fetchCached<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMs: number,
  opts: { swr?: boolean; force?: boolean } = {}
): Promise<T> {
  const { swr = true, force = false } = opts;

  // Serve fresh cache if allowed
  if (!force) {
    const cached = getFresh<T>(key);
    if (cached) {
      // Kick off background refresh if SWR
      if (swr && !inFlight.has(key)) {
        inFlight.set(
          key,
          fetcher()
            .then((d) => {
              setCache(key, d, ttlMs);
              inFlight.delete(key);
              return d;
            })
            .catch(() => inFlight.delete(key))
        );
      }
      return cached;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (inFlight.has(key)) return inFlight.get(key)! as Promise<T>;

  const p = fetcher()
    .then((d) => {
      setCache(key, d, ttlMs);
      inFlight.delete(key);
      return d;
    })
    .catch((e) => {
      inFlight.delete(key);
      throw e;
    });

  inFlight.set(key, p);
  return p;
}
