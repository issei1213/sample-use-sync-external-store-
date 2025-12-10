import { useSyncExternalStore } from "react";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

const STORAGE_KEY = "todos";
const snapshotCache = new Map<
  string,
  {
    storageValue: string | null;
    snapshot: Todo[] | null;
  }
>();

export function useTodoStore() {
  const todos = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return todos;
}

function getSnapshot(): Todo[] | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  const cached = snapshotCache.get(STORAGE_KEY);

  // キャッシュがあり、ストレージの値が変わっていない場合
  if (cached && cached.storageValue === stored) {
    return cached.snapshot;
  }

  // 新しいスナップショットを作成してキャッシュ
  const snapshot = stored ? JSON.parse(stored) : null;
  snapshotCache.set(STORAGE_KEY, { storageValue: stored, snapshot });
  return snapshot;
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  // 同じタブ内での変更を検知するためのカスタムイベント
  window.addEventListener("local-storage-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("local-storage-change", callback);
  };
}

function getServerSnapshot(): Todo[] | null {
  return null; // 同じ参照を返して無限ループを防ぐ
}

// LocalStorageを更新し、カスタムイベントを発火
export function saveTodos(todos: Todo[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  window.dispatchEvent(new Event("local-storage-change"));
}

export function addTodo(text: string) {
  const todos = getSnapshot();
  const newTodo: Todo = {
    id: Date.now().toString(),
    text,
    completed: false,
  };
  if (todos === null) {
    saveTodos([newTodo]);
  } else {
    saveTodos([...todos, newTodo]);
  }
}

export function toggleTodo(id: string) {
  const todos = getSnapshot();
  if (todos === null) {
    return;
  }
  const updatedTodos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  saveTodos(updatedTodos);
}

export function deleteTodo(id: string) {
  const todos = getSnapshot();
  if (todos === null) {
    return;
  }
  const filteredTodos = todos.filter((todo) => todo.id !== id);
  saveTodos(filteredTodos);
}
