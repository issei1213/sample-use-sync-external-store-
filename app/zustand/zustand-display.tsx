"use client";

import { memo } from "react";
import { useCounterStore } from "./use-zustand-store";

export const ZustandDisplay = memo(function ZustandDisplay() {
  // zustandの標準的な使い方：createで作成したhookを直接使用
  const count = useCounterStore((state) => state.count);

  console.log("ZustandDisplay rendered");

  return (
    <div className="p-6 bg-green-50 rounded-lg">
      <h2 className="text-2xl font-bold mb-2">カウンター（Store）</h2>
      <p className="text-4xl font-bold text-green-600">{count}</p>
      <p className="text-sm text-gray-600 mt-2">
        zustandのuseCounterStoreフックで直接購読
      </p>
    </div>
  );
});
