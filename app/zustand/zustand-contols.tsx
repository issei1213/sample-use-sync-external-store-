"use client";

import { memo } from "react";
import { useCounterStore } from "./use-zustand-store";

export const ZustandControls = memo(function ZustandControls() {
  // zustandの標準的な使い方：アクションのみを取得（状態は取得しない）
  // アクションは個別に取得することで、無限ループを回避
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const reset = useCounterStore((state) => state.reset);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <button
          onClick={increment}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
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
        ※ Zustandのアクションのみを購読（再レンダリングされません）
      </p>
    </div>
  );
});
