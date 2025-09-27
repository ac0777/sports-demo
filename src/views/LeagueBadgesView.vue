<template>
  <main class="wrap">
    <button class="link" @click="router.back()">← Back</button>
    <h1>
      Seasons <span v-if="leagueName">— {{ leagueName }}</span>
    </h1>

    <p v-if="loadingFor === idLeague">Loading…</p>
    <p v-else-if="error">Error: {{ error }}</p>

    <ul v-else class="grid">
      <LeagueBadge v-for="s in seasons" :key="s.strSeason" :season="s" />
    </ul>
  </main>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import LeagueBadge from "../components/LeagueBadge.vue";
import { useLeagueSeasons } from "../composables/useLeagueSeasons";
import { useRouter } from "vue-router";

const props = defineProps<{
  idLeague: string;
  leagueName?: string;
}>();

const router = useRouter();
const { seasonsByLeague, loadingFor, error, loadSeasonsByLeagueId } =
  useLeagueSeasons();

onMounted(() => {
  if (props.idLeague) loadSeasonsByLeagueId(props.idLeague);
});

const seasons = computed(() => seasonsByLeague.value[props.idLeague] || []);
</script>

<style scoped>
.wrap {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1rem;
}
.link {
  margin-bottom: 0.5rem;
  background: none;
  border: 0;
  color: #2563eb;
  cursor: pointer;
}
h1 {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0.25rem 0 1rem;
}
.grid {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
}
</style>
