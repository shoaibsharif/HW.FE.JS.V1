<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import Fuse from "fuse.js";
import { computed, ref } from "vue";
import grid from "../data/grid.json";
import people from "../data/people.json";
import Table from "./components/Table.vue";

const search = ref("");
const { data, isPending } = useQuery({
  queryKey: ["people"],
  queryFn: () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(people);
      }, 3000);
    }).then((res) =>
      //@ts-ignore
      res.response.data.reduce((acc, current) => {
        //@ts-ignore
        if (!acc.find((obj) => obj.id === current.id)) {
          acc.push(current);
        }
        return acc;
      }, [])
    ),
});

const all_people = computed(() =>
  search.value === ""
    ? data.value
    : new Fuse(data.value, {
        keys: [
          "firstName",
          "lastName",
          "skills",
          "addressStreet",
          "addressCity",
          "addressRegion",
          "addressCountry",
          "dob",
        ],
      })
        .search(search.value)
        .map((s) => s.item)
);
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8 pt-5">
    <div class="container mx-auto">
      <input
        type="search"
        v-model="search"
        autofocus
        placeholder="Search people"
        class="block max-w-sm w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <Table
        :data="all_people ?? []"
        :columns="grid.columnDefs"
        :loading="isPending"
      />
    </div>
  </div>
</template>
