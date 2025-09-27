<template>
  <div class="filters">
    <input
      class="control filtersInput"
      type="text"
      placeholder="Search leagues..."
      :value="search"
      @input="emit('update:search', ($event.target as HTMLInputElement).value)"
    />

    <select
      class="control filtersSelect"
      :value="sport"
      @change="emit('update:sport', ($event.target as HTMLSelectElement).value)"
    >
      <option value="">All Sports</option>
      <option v-for="s in sports" :key="s" :value="s">{{ s }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  sports: string[];
  search: string;
  sport: string;
}>();

const emit = defineEmits<{
  (e: "update:search", value: string): void;
  (e: "update:sport", value: string): void;
}>();
</script>

<style scoped>
.filters {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: 1fr minmax(180px, 240px);
}

.filters {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.filtersInput {
  flex: 1 1 320px;
  min-width: 0;
}

.filtersSelect {
  flex: 0 0 220px;
  min-width: 180px;
  max-width: 240px;
}

.control {
  width: 100%;
  padding: 0.6rem 0.8rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.95rem;
}
</style>
