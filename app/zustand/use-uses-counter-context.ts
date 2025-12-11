"use client";

import { useSyncExternalStore } from "react";
import { useCounterStore, type CounterActions } from "./use-zustand-store";

export function useCounterValue() {
  return useSyncExternalStore(
    // subscribe: zustandのsubscribeメソッドはuseSyncExternalStoreと互換性がある
    // DOCS: https://zustand.docs.pmnd.rs/apis/create#subscribing-to-state-updates
    useCounterStore.subscribe,
    // getSnapshot: selectorで必要なcount値のみを取得
    () => useCounterStore.getState().count,
    // getServerSnapshot: SSR時のデフォルト値
    () => 0
  );
}

/**
 * アクションのみを取得するフック
 * アクションは状態ではないので、再レンダリングを引き起こさない
 */
export function useCounterActions(): CounterActions {
  // アクションは変更されないので、直接取得
  const { increment, decrement, reset } = useCounterStore.getState();

  return { increment, decrement, reset };
}
