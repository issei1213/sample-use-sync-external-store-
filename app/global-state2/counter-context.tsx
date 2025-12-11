import React, { createContext, useContext, useState } from "react";

// 値用のContext
const CounterValueContext = createContext<number | null>(null);

// アクション用のContext（再レンダリングしない）
const CounterActionsContext = createContext<{
  increment: () => void;
  decrement: () => void;
} | null>(null);

export const CounterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [count, setCount] = useState(0);

  // アクションは一度だけ作成（setCountは安定しているので依存配列は空）
  const actions = React.useMemo(
    () => ({
      increment: () => setCount((c) => c + 1),
      decrement: () => setCount((c) => c - 1),
    }),
    []
  );

  return (
    <CounterActionsContext.Provider value={actions}>
      <CounterValueContext.Provider value={count}>
        {children}
      </CounterValueContext.Provider>
    </CounterActionsContext.Provider>
  );
};

// 値だけを取得するフック (再レンダリングする)
export const useCounterValue = () => {
  const count = useContext(CounterValueContext);
  if (count === null) throw new Error("Missing CounterProvider");
  return count;
};

// アクションだけを取得するフック (再レンダリングしない！)
export const useCounterActions = () => {
  const actions = useContext(CounterActionsContext);
  if (!actions) throw new Error("Missing CounterProvider");
  return actions;
};
