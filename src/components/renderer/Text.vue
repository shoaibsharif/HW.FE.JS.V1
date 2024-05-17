<script setup lang="ts">
import { IColumnDef } from "../../types/column";
import { IPeople } from "../../types/people";

defineProps<{
  row: IPeople;
  column: IColumnDef;
}>();

function concat_fields(field: string[], row: IPeople) {
  //@ts-ignore
  return field.map((f) => row[f]).join(" ");
}
</script>
<template>
  <span v-if="Array.isArray(column.field)">
    {{ concat_fields(column.field, row) }}
  </span>
  <span v-else-if="column.field">
    {{ row?.[column.field] }}
  </span>
</template>
