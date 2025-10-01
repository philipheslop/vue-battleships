<template>
  <div class="w-full flex justify-center">
    <div class="content">
      <table class="border border-collapse">
        <tr v-for="(row, rowIndex) in tableData" :key="rowIndex + 'row'">
          <td v-for="(element, colIndex) in row" :key="element" class="p-0 m-0 border">
            <GridItem
              :msg="element"
              :row="rowIndex"
              :col="colIndex"
              :clicked="getCellState(rowIndex, colIndex)"
              @cell-click="toggleCell"
            />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import GridItem from './GridItem.vue'
import { useGrid } from '../use/useGrid.js'

const { gridState, toggleCell, getCellState } = useGrid()

const rows = 10
const cols = 10
const tableData: string[][] = []
for (let i = 0; i < rows; i++) {
  tableData[i] = []
  for (let j = 0; j < cols; j++) {
    tableData[i][j] = String.fromCharCode(65 + i) + j
  }
}
</script>

