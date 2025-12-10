"use client";
import {
  CounterProvider,
  useCounterValue,
  useCounterActions,
} from "./counter-context";

const CounterDisplay = () => {
  console.log("Display Rendered"); // レンダリング確認用
  const count = useCounterValue();
  return (
    <div className="text-center mb-8">
      <h1 className="text-6xl font-bold text-blue-600 mb-2">{count}</h1>
      <p className="text-gray-500 text-sm">現在のカウント</p>
    </div>
  );
};

const Controls = () => {
  console.log("Controls Rendered"); // レンダリング確認用
  const { increment, decrement } = useCounterActions();
  return (
    <div className="flex gap-4 justify-center mb-8">
      <button
        onClick={decrement}
        className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200 active:scale-95"
      >
        − 減らす
      </button>
      <button
        onClick={increment}
        className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200 active:scale-95"
      >
        + 増やす
      </button>
    </div>
  );
};

const Description = () => (
  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
    <p className="text-gray-700 leading-relaxed">
      この例では{" "}
      <code className="bg-blue-100 px-2 py-1 rounded text-sm font-mono text-blue-800">
        useSyncExternalStore
      </code>{" "}
      と React Context
      を組み合わせて、シンプルなカウンター状態を管理する方法を示しています。
      各コンポーネントは必要な部分だけを再レンダリングします。
    </p>
  </div>
);

export default function App() {
  return (
    <CounterProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              useSyncExternalStore + Context
            </h2>
            <CounterDisplay />
            <Controls />
            <Description />
          </div>
        </div>
      </div>
    </CounterProvider>
  );
}
