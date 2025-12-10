"use client";

import { useOnlineStatus } from "./use-online-status";

export default function Page() {
  return (
    <>
      <SaveButton />
      <StatusBar />
    </>
  );
}

function StatusBar() {
  const isOnline = useOnlineStatus();
  return <h1>{isOnline ? "✅ Online" : "❌ Disconnected"}</h1>;
}

function SaveButton() {
  const isOnline = useOnlineStatus();

  function handleSaveClick() {
    console.log("✅ Progress saved");
  }

  return (
    <button
      disabled={!isOnline}
      onClick={handleSaveClick}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
    >
      {isOnline ? "Save progress" : "Reconnecting..."}
    </button>
  );
}
