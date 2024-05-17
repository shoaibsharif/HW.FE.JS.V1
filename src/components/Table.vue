<script setup lang="ts">
import { computed, toRef } from "vue";
import { IColumnDef } from "../types/column";
import { IPeople } from "../types/people";
import { components } from "./renderer";

const props = withDefaults(
  defineProps<{
    data: IPeople[];
    columns: IColumnDef[];
    loading?: boolean;
  }>(),
  {
    loading: false,
  }
);

const props_columns = toRef(props, "columns");

// Make sure there is no duplicate columns
const unique_columns = computed(() =>
  props_columns.value.reduce((acc: IColumnDef[], current) => {
    if (!acc.find((obj) => obj.name === current.name)) {
      acc.push(current);
    }
    return acc;
  }, [])
);
</script>

<template>
  <div class="flow-root">
    <div class="overflow-x-auto">
      <div class="inline-block min-w-full py-2 align-middle">
        <table class="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <template v-for="column in unique_columns">
                <th
                  scope="col"
                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                >
                  {{ column.name }}
                </th>
              </template>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-if="loading">
              <td :colspan="unique_columns.length">
                <div
                  class="flex flex-col items-center justify-center flex-1 px-6 py-14 sm:px-14"
                >
                  <span
                    class="w-6 h-6 mx-auto text-gray-400 dark:text-gray-500 mb-4 animate-spin"
                    aria-hidden="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                  </span>
                  <p class="text-sm text-center text-gray-900 dark:text-white">
                    Loading...
                  </p>
                </div>
              </td>
            </tr>
            <tr v-else-if="data.length == 0">
              <td :colspan="unique_columns.length">
                <div
                  class="flex flex-col items-center justify-center flex-1 px-6 py-14 sm:px-14"
                >
                  <span
                    class="w-6 h-6 mx-auto text-gray-400 dark:text-gray-500 mb-4"
                    aria-hidden="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                      />
                    </svg>
                  </span>
                  <p class="text-sm text-center text-gray-900">No items.</p>
                </div>
              </td>
            </tr>
            <tr v-for="person in data" :key="person.id" v-else>
              <td
                class="whitespace-nowrap px-3 py-4 text-sm"
                v-for="col in unique_columns"
                :key="col.name"
              >
                <component
                  :is="components[col.properties.renderer.type]"
                  :row="person"
                  :column="col"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
