"use client";

import { useMediaWidth } from "./use-media-width";

export default function WindowWidthPage() {
  const windowWidth = useMediaWidth();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Window Width Example</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Window Width</h2>
          <div className="text-4xl font-bold text-blue-600">
            {windowWidth}px
          </div>
          <p className="text-gray-600 mt-2">
            ウィンドウのサイズを変更すると、幅がリアルタイムで更新されます
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">レスポンシブ情報</h2>
          <div className="space-y-2">
            <div
              className={`p-3 rounded ${
                windowWidth < 640 ? "bg-red-100 text-red-800" : "bg-gray-200"
              }`}
            >
              <span className="font-medium">Mobile:</span>{" "}
              {windowWidth < 640 ? "✓ アクティブ" : "✗"}
            </div>
            <div
              className={`p-3 rounded ${
                windowWidth >= 640 && windowWidth < 768
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-200"
              }`}
            >
              <span className="font-medium">Small:</span>{" "}
              {windowWidth >= 640 && windowWidth < 768 ? "✓ アクティブ" : "✗"}
            </div>
            <div
              className={`p-3 rounded ${
                windowWidth >= 768 && windowWidth < 1024
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-200"
              }`}
            >
              <span className="font-medium">Medium:</span>{" "}
              {windowWidth >= 768 && windowWidth < 1024 ? "✓ アクティブ" : "✗"}
            </div>
            <div
              className={`p-3 rounded ${
                windowWidth >= 1024
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-200"
              }`}
            >
              <span className="font-medium">Large:</span>{" "}
              {windowWidth >= 1024 ? "✓ アクティブ" : "✗"}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            useSyncExternalStoreについて
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <code className="bg-gray-100 px-2 py-1 rounded">
                useSyncExternalStore
              </code>
              は、
              外部ストア（この場合はウィンドウサイズ）をReactコンポーネントと同期させるためのフックです。
            </p>
            <div>
              <h3 className="font-semibold mb-2">実装のポイント:</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  <strong>subscribe:</strong>{" "}
                  resizeイベントをリスナー登録し、変更を検知
                </li>
                <li>
                  <strong>getSnapshot:</strong> 現在のwindow.innerWidthを取得
                </li>
                <li>
                  <strong>getServerSideSnapshot:</strong>{" "}
                  SSR時のデフォルト値（0）を返す
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
