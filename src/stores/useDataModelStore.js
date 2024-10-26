import { create } from "zustand";

export const useDataModelStore = create((set) => ({
    min: 0,
    max: 0,
    vs: 0,
    vp: 0,
    setMin: (input) => set({ min: input }),
    setMax: (input) => set({ max: input }),
    setVs: (input) => set({ vs: input }),
    setVp: (input) => set({ vp: input }),
}))