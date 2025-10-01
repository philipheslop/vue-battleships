<template>
  <div class="w-full flex justify-center">
    <div class="content">
      <table class="border border-collapse">
        <tr v-for="(row, index) in tableData" :key="index + 'row'">
          <td v-for="element in row" :key="element" class="p-0 m-0 border">
            <GridItem :msg="element" />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import GridItem from './GridItem.vue'
const rows = 10
const cols = 10
const tableData: string[][] = []
for (let i = 0; i < rows; i++) {
  tableData[i] = []
  for (let j = 0; j < cols; j++) {
    tableData[i][j] = String.fromCharCode(65 + i) + j
  }
}
console.log(tableData)
</script>

