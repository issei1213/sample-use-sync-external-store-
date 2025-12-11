import React, { createContext, useCallback, useContext, useState } from "react";

interface CounterStore {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

// Contextにはストアのインスタンス自体を格納する
const StoreContext = createContext<CounterStore | null>(null);

export const CounterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // ストアは一度だけ生成される（refを使用）
  const [count, setCount] = useState(0);

  return (
    <StoreContext.Provider value={{ count, setCount }}>
      {children}
    </StoreContext.Provider>
  );
};

// 【変更点1】値だけを取得するフック (再レンダリングする)
export const useCounterValue = () => {
  const store = useContext(StoreContext);
  if (!store) throw new Error("Missing StoreProvider");
  return store.count;
};

// 【変更点2】アクションだけを取得するフック (再レンダリングしない！)
export const useCounterActions = () => {
  const store = useContext(StoreContext);
  if (!store) throw new Error("Missing StoreProvider");

  const increment = useCallback(() => store.setCount((c) => c + 1), [store]);
  const decrement = useCallback(() => store.setCount((c) => c - 1), [store]);

  return {
    increment,
    decrement,
  };
};
