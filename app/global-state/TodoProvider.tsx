// React Context APIを使用したグローバルステート管理
// createContextとuseContextを使用して、複数のコンポーネントから同じ状態を参照できます

"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useSyncExternalStore,
} from "react";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoContextType = {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  getStats: () => {
    total: number;
    completed: number;
    active: number;
  };
};

// Contextを作成（初期値はnull）
const TodoContext = createContext<TodoContextType | null>(null);

// カスタムフック - コンテキストを安全に使用するためのヘルパー
export function useTodoContext() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within TodoProvider");
  }
  return context;
}

// Providerコンポーネント - 状態管理とロジックをカプセル化
export function TodoProvider({ children }: { children: ReactNode }) {
  let nextIdRef = 1;
  const [todos, setTodos] = useState<Todo[]>([
    { id: 0, text: "Context APIの例 #1", completed: false },
  ]);

  const addTodo = (text: string) => {
    setTodos((prev) => [...prev, { id: nextIdRef++, text, completed: false }]);
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const getStats = () => {
    return {
      total: todos.length,
      completed: todos.filter((t) => t.completed).length,
      active: todos.filter((t) => !t.completed).length,
    };
  };

  const value: TodoContextType = {
    todos,
    addTodo,
    toggleTodo,
    removeTodo,
    getStats,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

// ============================================
// useSyncExternalStoreを使用した外部ストア実装
// ============================================

// 外部ストア - Reactの外で状態を管理
class ExternalTodoStore {
  private todos: Todo[] = [
    { id: 0, text: "useSyncExternalStore の例 #1", completed: false },
  ];
  private nextId = 1;
  private listeners = new Set<() => void>();

  // 状態の取得
  getState() {
    return this.todos;
  }

  // 変更の購読
  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  // リスナーへの通知
  private emit() {
    this.listeners.forEach((listener) => listener());
  }

  // Todo操作
  addTodo(text: string) {
    this.todos = [...this.todos, { id: this.nextId++, text, completed: false }];
    this.emit();
  }

  toggleTodo(id: number) {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.emit();
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.emit();
  }

  getStats() {
    return {
      total: this.todos.length,
      completed: this.todos.filter((t) => t.completed).length,
      active: this.todos.filter((t) => !t.completed).length,
    };
  }
}

// シングルトンインスタンス
export const externalTodoStore = new ExternalTodoStore();

// useSyncExternalStoreを使用したカスタムフック
export function useExternalTodoStore() {
  const todos = useSyncExternalStore(
    externalTodoStore.subscribe.bind(externalTodoStore),
    externalTodoStore.getState.bind(externalTodoStore),
    externalTodoStore.getState.bind(externalTodoStore) // SSR用
  );

  return {
    todos,
    addTodo: externalTodoStore.addTodo.bind(externalTodoStore),
    toggleTodo: externalTodoStore.toggleTodo.bind(externalTodoStore),
    removeTodo: externalTodoStore.removeTodo.bind(externalTodoStore),
    getStats: externalTodoStore.getStats.bind(externalTodoStore),
  };
}
