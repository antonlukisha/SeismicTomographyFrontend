import { create } from 'zustand'

export const useAlertsStore = create((set) => ({
    isDeniedAlertOpen: false,
    isSuccessAlertOpen: false,
    setDenied: () => { set({ isDeniedAlertOpen: true }); setTimeout(() => set({ isDeniedAlertOpen: false }), 3000) },
    setSuccess: () => { set({ isSuccessAlertOpen: true }); setTimeout(() => set({ isSuccessAlertOpen: false }), 3000) }
}))