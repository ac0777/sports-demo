<template>
  <div>
    <p v-if="isLoading">Loading…</p>
    <p v-else-if="error" class="err">Error: {{ error }}</p>
    <p v-else-if="!leagues.length">No leagues match your filters.</p>

    <div v-else class="grid">
      <LeagueItem v-for="l in leagues" :key="l.idLeague" :league="l" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { League } from "../types/types";
import LeagueItem from "./LeagueItem.vue";

defineProps<{
  leagues: League[];
  isLoading?: boolean;
  error?: string | null;
}>();
</script>
<style scoped>
.grid {
  --min: 260px;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(var(--min), 1fr));
}
.err {
  color: #b91c1c;
}
</style>
