import { ref } from "vue";
import type { Season } from "../types/types";
import { fetchCached } from "../utils/cache";

const TTL = 7 * 24 * 60 * 60 * 1000;

export function useLeagueSeasons() {
  const seasonsByLeague = ref<Record<string, Season[]>>({});
  const loadingFor = ref<string | null>(null);
  const error = ref<string | null>(null);

  function sortSeasons(input: Season[]): Season[] {
    return [...input].sort((a, b) => {
      const ay = parseInt(a.strSeason.slice(0, 4), 10);
      const by = parseInt(b.strSeason.slice(0, 4), 10);
      return by - ay;
    });
  }

  async function loadSeasonsByLeagueId(
    idLeague: string,
    opts: { force?: boolean } = {}
  ) {
    loadingFor.value = idLeague;
    error.value = null;

    const key = `league:seasons:${idLeague}:v1`;
    const url = `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=${encodeURIComponent(
      idLeague
    )}`;

    try {
      const seasons = await fetchCached<Season[]>(
        key,
        async () => {
          const res = await fetch(url, { cache: "no-store" });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const j = await res.json();
          const arr: Season[] = Array.isArray(j?.seasons) ? j.seasons : [];
          return sortSeasons(arr);
        },
        TTL,
        { swr: true, force: opts.force }
      );
      seasonsByLeague.value[idLeague] = seasons;
    } catch (e: any) {
      error.value = e?.message ?? "Failed to load seasons";
    } finally {
      if (loadingFor.value === idLeague) loadingFor.value = null;
    }
  }

  return { seasonsByLeague, loadingFor, error, loadSeasonsByLeagueId };
}
