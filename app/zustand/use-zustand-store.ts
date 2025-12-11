import { create } from "zustand";

export type CounterState = {
  count: number;
};

export type CounterActions = {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

export type CounterStore = CounterState & CounterActions;

// zustandのcreateメソッドでストアを作成
// createはReact hook (useStore) を返すが、subscribe/getStateも持っている
export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
