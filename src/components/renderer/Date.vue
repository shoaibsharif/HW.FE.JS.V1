<script setup lang="ts">
import { IColumnDef } from "../../types/column";
import { IPeople } from "../../types/people";
import dayjs from "dayjs";

defineProps<{
  row: IPeople;
  column: IColumnDef;
}>();
</script>
<template>
  <span>
    <template v-if="row?.[column.field] && dayjs(row[column.field]).isValid()">
      {{ dayjs(row[column.field]).format(column.properties.renderer.format) }}
    </template>
    <template v-else>
      {{ row[column.field] }}
    </template>
  </span>
</template>
