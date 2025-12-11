"use client";

import { memo } from "react";
import { useCounterValue } from "./use-uses-counter-context";

export const CounterDisplay = memo(function CounterDisplay() {
  const count = useCounterValue();

  console.log("CounterDisplay rendered");

  return (
    <div className="p-6 bg-blue-50 rounded-lg">
      <h2 className="text-2xl font-bold mb-2">カウンター</h2>
      <p className="text-4xl font-bold text-blue-600">{count}</p>
      <p className="text-sm text-gray-600 mt-2">useSyncExternalStoreで購読中</p>
    </div>
  );
});
