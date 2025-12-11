"use client";

import { memo } from "react";
import { useCounterActions } from "./use-uses-counter-context";

export const UsesControls = memo(function Controls() {
  const { increment, decrement, reset } = useCounterActions();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <button
          onClick={increment}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          +1
        </button>
        <button
          onClick={decrement}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
        >
          -1
        </button>
      </div>
      <button
        onClick={reset}
        className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
      >
        リセット
      </button>
      <p className="text-sm text-gray-600">
        ※ Controlsコンポーネントは再レンダリングされません
      </p>
    </div>
  );
});
