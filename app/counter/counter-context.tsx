import React, { createContext, useContext, useState } from "react";
import { useSyncExternalStore } from "react";
import { createCounterStore, CounterStore } from "./store";

// Contextにはストアのインスタンス自体を格納する
const StoreContext = createContext<CounterStore | null>(null);

export const CounterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // ストアは一度だけ生成される（refを使用）
  const [store] = useState(() => createCounterStore());

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

// 【変更点1】値だけを取得するフック (再レンダリングする)
export const useCounterValue = () => {
  const store = useContext(StoreContext);
  if (!store) throw new Error("Missing StoreProvider");

  // ここで購読を行う
  return useSyncExternalStore(
    store.subscribe,
    store.getState,
    store.getServerSideSnapshot
  );
};

// 【変更点2】アクションだけを取得するフック (再レンダリングしない！)
export const useCounterActions = () => {
  const store = useContext(StoreContext);
  if (!store) throw new Error("Missing StoreProvider");

  // useSyncExternalStoreを使わず、直接関数を返す
  return {
    increment: store.increment,
    decrement: store.decrement,
  };
};
