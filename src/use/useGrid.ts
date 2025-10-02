import { useGridStore } from '../stores/grid'

export function useGrid() {
  const store = useGridStore()

  return store
}