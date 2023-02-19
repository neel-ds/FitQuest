import create from 'zustand'

export const useNumberStore = create((set) => ({
  number: 0,
  setNumber: (value) => set((state) => ({ number: value }))
}))