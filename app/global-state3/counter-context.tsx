import React, { createContext, useContext } from "react";
import { useSyncExternalStore } from "react";
import { createCounterStore, CounterStore } from "./store";

// Contextにはストアのインスタンス自体を格納する
const StoreContext = createContext<CounterStore | null>(null);

export const CounterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // const [store] = useState(() => createCounterStore());
  // PureTSで作成したストアをそのまま変数に格納
  const store = createCounterStore();

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

// 値だけの取得するフック。使用したコンポーネントは再レンダリングする
export const useCounterValue = () => {
  const store = useContext(StoreContext);
  if (!store) throw new Error("Missing StoreProvider");

  // 値を購読するためにuseSyncExternalStoreを使用している
  return useSyncExternalStore(
    store.subscribe,
    store.getState,
    store.getServerSideSnapshot
  );
};

// アクションだけを取得するフック。 コンポーネントで使用しても再レンダリングしない
export const useCounterActions = () => {
  const store = useContext(StoreContext);
  if (!store) throw new Error("Missing StoreProvider");

  // useSyncExternalStoreを使わず、直接関数を返す
  return {
    increment: store.increment,
    decrement: store.decrement,
  };
};
