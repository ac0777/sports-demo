import { ref, computed, onMounted } from "vue";
import type { League } from "../types/types";
import { fetchCached } from "../utils/cache";

const URL = "https://www.thesportsdb.com/api/v1/json/3/all_leagues.php";
const KEY = "leagues:all:v1";
const TTL = 24 * 60 * 60 * 1000; // 24h

export function useLeagues() {
  const leagues = ref<League[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function loadLeagues(opts: { force?: boolean } = {}) {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await fetchCached(
        KEY,
        async () => {
          const res = await fetch(URL, { cache: "no-store" });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const j = await res.json();
          return Array.isArray(j?.leagues) ? j.leagues : [];
        },
        TTL,
        { swr: true, force: opts.force }
      );
      leagues.value = data;
    } catch (e: any) {
      error.value = e?.message ?? "Failed to load leagues";
    } finally {
      isLoading.value = false;
    }
  }

  const sports = computed(() => {
    const s = new Set(
      leagues.value.map((l: League) => l.strSport).filter(Boolean)
    );
    return Array.from(s).sort();
  });

  onMounted(() => loadLeagues());

  return {
    leagues,
    sports,
    isLoading,
    error,
    loadLeagues,
    refresh: () => loadLeagues({ force: true }),
  };
}
