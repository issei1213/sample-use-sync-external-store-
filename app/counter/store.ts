// store.ts

// 純粋なJavaScriptで作られたストア（Observerパターン）
export const createCounterStore = () => {
  let store = {
    count: 0,
  };
  const listeners = new Set<() => void>();

  return {
    // 1. 現在の状態を返す (getSnapshot用)
    getState: () => store.count,

    // 2. 変更を通知するための登録関数 (subscribe用)
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener); // クリーンアップ関数を返す
    },

    getServerSideSnapshot: () => 0, // SSR用のデフォルト値

    // 3. 状態を更新するアクション
    increment: () => {
      store = { ...store, count: store.count + 1 };

      listeners.forEach((listener) => listener()); // 変更を通知
    },
    decrement: () => {
      store = { ...store, count: store.count - 1 };

      listeners.forEach((listener) => listener());
    },
  };
};

// 型定義
export type CounterStore = ReturnType<typeof createCounterStore>;
