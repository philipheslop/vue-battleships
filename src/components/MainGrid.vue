<template>
  <div style="width: 100%">
    <div class="content">
      <table border="1" cellspacing="0">
        <tr v-for="(row, index) in tableData" :key="index + 'row'">
          <td v-for="element in row" :key="element">
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

<style scoped>
th,
td {
  padding: 0px;
  margin: 0px;
  width: 25px;
}

table {
  margin: 0px auto;
}
</style>
