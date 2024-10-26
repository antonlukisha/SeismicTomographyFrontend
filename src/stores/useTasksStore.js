import { create } from 'zustand'

export const useTasksStore = create((set) => ({
  tasks: [{}],
  isEmpty: true,
  setTasks: input => set({ tasks: input, isEmpty: false })
}))