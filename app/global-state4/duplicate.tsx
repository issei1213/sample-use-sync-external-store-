"use client";
import useStore from "./use-store";
import { counterStore } from "./store";

export const DuplicateCounterDisplay = () => {
  const count = useStore(counterStore, (state) => state.count);
  return (
    <div className="text-center mb-8">
      <h1 className="text-6xl font-bold text-blue-600 mb-2">{count}</h1>
      <p className="text-gray-500 text-sm">現在のカウント</p>
    </div>
  );
};
