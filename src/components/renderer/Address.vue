<script setup lang="ts">
import { IColumnDef } from "../../types/column";
import { IPeople } from "../../types/people";

defineProps<{
  row: IPeople;
  column: IColumnDef;
}>();

function formatted_city_region_postal(row: IPeople, column: IColumnDef) {
  let formatted = "";
  if (row?.[column.properties.renderer.city]) {
    formatted += row?.[column.properties.renderer.city];
  }
  if (row?.[column.properties.renderer.region]) {
    formatted += ", " + row?.[column.properties.renderer.region];
  }
  if (row?.[column.properties.renderer.postal]) {
    formatted += " " + row?.[column.properties.renderer.postal];
  }

  return formatted;
}
</script>

<template>
  <span>
    <template v-if="row?.[column.properties.renderer.address1]">
      {{ row?.[column.properties.renderer.address1] ?? "" }}
    </template>
    <template
      v-if="
        row?.[column.properties.renderer.city] ||
        row?.[column.properties.renderer.region] ||
        row?.[column.properties.renderer.postal]
      "
    >
      <br />
      {{ formatted_city_region_postal(row, column) }}
    </template>

    <br />
    {{ row?.[column.properties.renderer.country] }}
  </span>
</template>
