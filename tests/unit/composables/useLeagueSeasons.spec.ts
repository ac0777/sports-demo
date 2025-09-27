import { describe, it, expect, beforeEach, vi } from "vitest";
import { useLeagueSeasons } from "@/composables/useLeagueSeasons";

const ID = "4328";
const URL = `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=${encodeURIComponent(
  ID
)}`;

describe("useLeagueSeasons", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    try {
      localStorage.clear();
      // eslint-disable-next-line no-empty
    } catch {}
  });

  it("sets loadingFor while fetching and clears it after", async () => {
    const gate = defer();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        await gate.promise;
        return { ok: true, json: async () => ({ seasons: [] }) } as any;
      })
    );

    const { loadingFor, loadSeasonsByLeagueId } = useLeagueSeasons();
    const p = loadSeasonsByLeagueId(ID, { force: true });

    expect(loadingFor.value).toBe(ID);

    gate.resolve();
    await p;

    expect(loadingFor.value).toBeNull();
  });

  it("calls the correct URL and stores seasons sorted desc by year", async () => {
    const payload = {
      seasons: [
        { strSeason: "2014-2015", strBadge: "u1" },
        { strSeason: "2017-2018", strBadge: "u4" },
        { strSeason: "2016-2017", strBadge: "u3" },
        { strSeason: "2015-2016", strBadge: "u2" },
      ],
    };

    const fetchMock = vi.fn(async (u: string) => {
      expect(u).toBe(URL);
      return { ok: true, json: async () => payload } as any;
    });
    vi.stubGlobal("fetch", fetchMock as any);

    const { seasonsByLeague, error, loadSeasonsByLeagueId } =
      useLeagueSeasons();
    await loadSeasonsByLeagueId(ID, { force: true });

    expect(error.value).toBeNull();
    expect(seasonsByLeague.value[ID].map((s) => s.strSeason)).toEqual([
      "2017-2018",
      "2016-2017",
      "2015-2016",
      "2014-2015",
    ]);
  });

  it("handles empty or missing seasons array", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        json: async () => ({}),
      })) as any
    );

    const EMPTY_ID = "9999";
    const { seasonsByLeague, loadSeasonsByLeagueId } = useLeagueSeasons();
    await loadSeasonsByLeagueId(EMPTY_ID, { force: true });

    expect(seasonsByLeague.value[EMPTY_ID]).toEqual([]);
  });

  it("sets error on non-OK response and does not crash", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: false,
        status: 500,
      })) as any
    );

    const ERR_ID = "500";
    const { error, seasonsByLeague, loadingFor, loadSeasonsByLeagueId } =
      useLeagueSeasons();
    await loadSeasonsByLeagueId(ERR_ID, { force: true });

    expect(loadingFor.value).toBeNull();
    expect(String(error.value)).toMatch(/HTTP 500/);
    expect(seasonsByLeague.value[ERR_ID]).toBeUndefined();
  });
});

function defer<T = void>() {
  let resolve!: (v: T | PromiseLike<T>) => void;
  const promise = new Promise<T>((r) => (resolve = r));
  return { promise, resolve };
}
