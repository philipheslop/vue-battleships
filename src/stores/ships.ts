import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useGridStore } from './grid'

export const useShipsStore = defineStore('ships', () => {
  const gridStore = useGridStore()

  const allShipsDestroyed = computed(() => {
    const ships = gridStore.fleet
    return ships.length > 0 && ships.every(ship => (ship.hitCount || 0) === ship.length)
  })

  const totalShipLength = computed(() => {
    return gridStore.fleet.reduce((total, ship) => total + ship.length, 0)
  })

  const shotsFired = computed(() => {
    return gridStore.gridState.flat().filter(cell => cell.clicked).length
  })

  const finalScore = computed(() => {
    return 100 + totalShipLength.value - shotsFired.value
  })


  return {
    allShipsDestroyed,
    totalShipLength,
    shotsFired,
    finalScore
  }
})