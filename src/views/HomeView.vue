<template>
  <main class="wrap">
    <h1>Sports Leagues</h1>

    <FiltersBar
      :sports="sports"
      :search="search"
      :sport="sport"
      @update:search="(val: string) => (search = val)"
      @update:sport="(val: string) => (sport = val)"
    />

    <LeagueList
      class="mt"
      :leagues="filteredLeagues"
      :isLoading="isLoading"
      :error="error"
    />
  </main>
</template>
<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import FiltersBar from "../components/FiltersBar.vue";
import LeagueList from "../components/LeagueList.vue";
import { useLeagues } from "../composables/useLeagues";
import type { League } from "../types/types";

const { leagues, sports, isLoading, error, loadLeagues } = useLeagues();

const search = ref("");
const sport = ref(""); // "" = All

onMounted(loadLeagues);

const filteredLeagues = computed(() => {
  const q = search.value.trim().toLowerCase();
  return leagues.value.filter((l: League) => {
    const matchesSport = !sport.value || l.strSport === sport.value;
    const hay = [l.strLeague ?? "", l.strLeagueAlternate ?? ""]
      .join(" ")
      .toLowerCase();
    const matchesSearch = !q || hay.includes(q);
    return matchesSport && matchesSearch;
  });
});
</script>
<style scoped>
.wrap {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1rem;
}
h1 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}
.mt {
  margin-top: 1rem;
}
</style>
