<template>
  <article class="card" @click="goToBadges">
    <h3 class="title font-['Exo-2']">{{ league.strLeague }}</h3>
    <p class="sport">{{ league.strSport }}</p>
    <p v-if="league.strLeagueAlternate" class="alt">
      {{ league.strLeagueAlternate }}
    </p>
  </article>
</template>

<script setup lang="ts">
import type { League } from "../types/types";
import { useRouter } from "vue-router";

const props = defineProps<{ league: League }>();

const router = useRouter();

const goToBadges = () => {
  router.push({
    name: "leagueBadges",
    params: { id: props.league.idLeague },
    query: { name: props.league.strLeague },
  });
};
</script>

<style scoped>
.card {
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 0.9rem;
  background: white;
}
.card:hover {
  /* prettier-ignore */
  box-shadow:
    0 4px 6px -1px rgba(0,0,0,0.1),
    0 2px 4px -2px rgba(0,0,0,0.1);
  cursor: pointer;
}
.title {
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}
.sport {
  font-size: 0.9rem;
  color: #374151;
}
.alt {
  margin-top: 0.25rem;
  font-size: 0.85rem;
  color: #6b7280;
}
</style>
