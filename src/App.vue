<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import grid from "../data/grid.json";
import people from "../data/people.json";
import Table from "./components/Table.vue";

const { data, isPending } = useQuery({
  queryKey: ["people"],
  queryFn: () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(people);
      }, 3000);
    }).then((res) => res.response.data),
});
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="container mx-auto">
      <Table
        :data="data ?? []"
        :columns="grid.columnDefs"
        :loading="isPending"
      />
    </div>
  </div>
</template>
