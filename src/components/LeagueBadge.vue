<template>
  <component :is="'li'" class="item">
    <img
      v-if="season.strBadge"
      :src="season.strBadge"
      :alt="`Badge ${season.strSeason}`"
      class="badge"
    />
    <span>{{ season.strSeason }}</span>
  </component>
</template>
<script lang="ts" setup>
import type { Season } from "../types/types";
defineProps<{
  season: Season;
}>();
</script>
<style scoped>
.item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.6rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: #fff;
}
.item:hover {
  /* prettier-ignore */
  box-shadow:
    0 4px 6px -1px rgba(0,0,0,0.1),
    0 2px 4px -2px rgba(0,0,0,0.1);
}
.badge {
  width: 28px;
  height: 28px;
  object-fit: contain;
}
</style>
