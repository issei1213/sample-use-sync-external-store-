"use client";
import useStore from "./use-store";
import { counterStore } from "./store";
import { DuplicateCounterDisplay } from "./duplicate";

const CounterDisplay = () => {
  const count = useStore(counterStore, (state) => state.count);
  return (
    <div className="text-center mb-8">
      <h1 className="text-6xl font-bold text-blue-600 mb-2">{count}</h1>
      <p className="text-gray-500 text-sm">現在のカウント</p>
    </div>
  );
};

const Controls = () => {
  return (
    <div className="flex gap-4 justify-center mb-8">
      <button
        onClick={counterStore.decrement}
        className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200 active:scale-95"
      >
        − 減らす
      </button>
      <button
        onClick={counterStore.increment}
        className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200 active:scale-95"
      >
        + 増やす
      </button>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            useSyncExternalStore
          </h2>
          <p className="text-gray-700 leading-relaxed text-center">
            この例はuseSyncExternalStoreのみを使用して、GlobalState管理を行う方法を示しています。
          </p>
          <CounterDisplay />
          <Controls />
          <DuplicateCounterDisplay />
        </div>
      </div>
    </div>
  );
}
