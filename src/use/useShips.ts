import { useShipsStore } from '../stores/ships'

export function useShips() {
  const store = useShipsStore()

  return store
}