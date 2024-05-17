<script setup lang="ts">
import { IColumnDef } from "../../types/column";
import { IPeople } from "../../types/people";

defineProps<{
  row: IPeople;
  column: IColumnDef;
}>();
</script>

<template>
  <span style="max-width: 140px" class="text-wrap block">
    <template v-if="row?.[column.field]">
      {{ row?.[column.field].join(", ") }}
    </template>
  </span>
</template>
