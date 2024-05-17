<script setup lang="ts">
import people from "../data/people.json";
import grid from "../data/grid.json";
import Table from "./components/Table.vue";
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="container mx-auto">
      <Table :data="people.response.data" :columns="grid.columnDefs" />
    </div>
  </div>
</template>
