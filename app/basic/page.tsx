"use client";

import { useSyncExternalStore } from "react";
import { todosStore } from "./todoStore";

// TODOアプリケーションコンポーネント
export default function TodoApp() {
  const todos = useSyncExternalStore(
    todosStore.subscribe,
    todosStore.getSnapshot,
    todosStore.getServerSnapshot
  );
  return (
    <>
      <button onClick={() => todosStore.addTodo()}>Add todo</button>
      <hr />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}
