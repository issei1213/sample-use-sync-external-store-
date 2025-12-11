export interface Store {
  count: number;
}

// 純粋なTypeScriptで作られたストア（Observerパターン）
const createCounterStore = () => {
  let store = {
    count: 0,
  };
  const listeners = new Set<() => void>();

  // 1. 現在の状態を返す (getSnapshot用)
  const getState = () => store;

  // 2. 変更を通知するための登録関数 (subscribe用)
  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener); // クリーンアップ関数を返す
  };

  const getServerSideSnapshot = () => ({
    count: 0,
  }); // SSR用のデフォルト値

  // 3. 状態を更新するアクション
  const increment = () => {
    store = { ...store, count: store.count + 1 };

    listeners.forEach((listener) => listener()); // 変更を通知
  };

  // 4. 状態を更新するアクション
  const decrement = () => {
    store = { ...store, count: store.count - 1 };

    listeners.forEach((listener) => listener());
  };

  return {
    getState,
    subscribe,
    getServerSideSnapshot,
    increment,
    decrement,
  };
};

// 一度だけストアを生成してエクスポート
export const counterStore = createCounterStore();
export type CounterStore = ReturnType<typeof createCounterStore>;
