// This is an example of a third-party store
// that you might need to integrate with React.

// If your app is fully built with React,
// we recommend using React state instead.

let nextId = 0;
let todos = [{ id: nextId++, text: "Todo #1" }];
let listeners: (() => void)[] = [];

export const todosStore = {
  addTodo() {
    todos = [...todos, { id: nextId++, text: "Todo #" + nextId }];

    for (const listener of listeners) {
      listener();
    }
  },
  subscribe(listener: () => void) {
    // リスナー配列に新しいリスナーを追加
    listeners = [...listeners, listener];
    // アンサブスクライブ関数を返す（このリスナーを配列から削除する）
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    return todos;
  },
  getServerSnapshot() {
    return todos;
  },
};
