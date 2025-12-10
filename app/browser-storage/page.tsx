"use client";

import { useState } from "react";
import {
  useTodoStore,
  addTodo,
  toggleTodo,
  deleteTodo,
} from "./use-todo-store";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          📝 TODO App (LocalStorage)
        </h1>
        <TodoForm />
        <TodoList />
      </div>
    </div>
  );
}

function TodoForm() {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="新しいTODOを入力..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          追加
        </button>
      </div>
    </form>
  );
}

function TodoList() {
  const todos = useTodoStore();

  if (todos === null || todos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">まだTODOがありません</p>
        <p className="text-sm mt-2">上のフォームからTODOを追加してみましょう</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

function TodoItem({
  todo,
}: {
  todo: { id: string; text: string; completed: boolean };
}) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
      />
      <span
        className={`flex-1 ${
          todo.completed ? "text-gray-400 line-through" : "text-gray-900"
        }`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
      >
        削除
      </button>
    </div>
  );
}
