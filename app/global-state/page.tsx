"use client";

import { useState } from "react";
import {
  TodoProvider,
  useTodoContext,
  useExternalTodoStore,
} from "./TodoProvider";

// Todo一覧コンポーネント - Contextから状態を取得
function TodoList() {
  const { todos, toggleTodo, removeTodo } = useTodoContext();

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">📝 Todo一覧</h3>
      <ul className="space-y-2">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="w-4 h-4 cursor-pointer"
            />
            <span
              className={`flex-1 ${
                todo.completed ? "line-through text-gray-400" : "text-gray-700"
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => removeTodo(todo.id)}
              className="px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ============================================
// useSyncExternalStoreを使用したコンポーネント
// ============================================

// Todo一覧コンポーネント - useSyncExternalStoreで外部ストアを購読
function ExternalTodoList() {
  const { todos, toggleTodo, removeTodo } = useExternalTodoStore();

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">
        📝 Todo一覧 (useSyncExternalStore)
      </h3>
      <ul className="space-y-2">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="w-4 h-4 cursor-pointer"
            />
            <span
              className={`flex-1 ${
                todo.completed ? "line-through text-gray-400" : "text-gray-700"
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => removeTodo(todo.id)}
              className="px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Todo追加フォームコンポーネント - useSyncExternalStoreで外部ストアを使用
function ExternalAddTodoForm() {
  const { addTodo } = useExternalTodoStore();
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text.trim());
      setText("");
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">
        ➕ Todo追加 (useSyncExternalStore)
      </h3>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="新しいTodoを入力..."
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          追加
        </button>
      </form>
    </div>
  );
}

// 統計表示コンポーネント - useSyncExternalStoreで外部ストアから統計を取得
function ExternalTodoStats() {
  const { getStats } = useExternalTodoStore();
  const stats = getStats();

  return (
    <div className="border rounded-lg p-4 bg-gradient-to-r from-green-50 to-blue-50 shadow-sm">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">
        📊 統計 (useSyncExternalStore)
      </h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-gray-600">合計</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {stats.completed}
          </div>
          <div className="text-sm text-gray-600">完了</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">
            {stats.active}
          </div>
          <div className="text-sm text-gray-600">未完了</div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Context APIを使用したコンポーネント
// ============================================

// Todo追加フォームコンポーネント - Contextを使用して状態を変更
function AddTodoForm() {
  const { addTodo } = useTodoContext();
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text.trim());
      setText("");
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">➕ Todo追加</h3>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="新しいTodoを入力..."
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          追加
        </button>
      </form>
    </div>
  );
}

// 統計表示コンポーネント - Contextから統計を取得
function TodoStats() {
  const { getStats } = useTodoContext();
  const stats = getStats();

  return (
    <div className="border rounded-lg p-4 bg-gradient-to-r from-purple-50 to-pink-50 shadow-sm">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">
        📊 統計 (Context API)
      </h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-gray-600">合計</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {stats.completed}
          </div>
          <div className="text-sm text-gray-600">完了</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">
            {stats.active}
          </div>
          <div className="text-sm text-gray-600">未完了</div>
        </div>
      </div>
    </div>
  );
}

// メインコンポーネント - TodoProviderでラップして状態を共有
function Container() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* useSyncExternalStore実装 */}
        <div className="space-y-4">
          <div className="bg-green-100 p-3 rounded-lg">
            <h2 className="text-xl font-bold text-green-900">
              useSyncExternalStore
            </h2>
            <p className="text-sm text-green-700 mt-1">
              外部ストアをReactに統合。Reactの外で状態を管理し、複数のコンポーネントから購読可能。
            </p>
          </div>
          <ExternalAddTodoForm />
          <ExternalTodoList />
        </div>
      </div>
    </div>
  );
}

// エクスポートするコンポーネント - TodoProviderでラップ
export default function GlobalStatePage() {
  return (
    <TodoProvider>
      <Container />
    </TodoProvider>
  );
}
