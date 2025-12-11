import { CounterDisplay } from "./uses-counter-display";
import { UsesControls } from "./uses-controls";
import { Description } from "./description";
import { ZustandDisplay } from "./zustand-display";
import { ZustandControls } from "./zustand-contols";

export default function ZustandPage() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Zustand + useSyncExternalStore
          </h1>
          <p className="text-gray-600">
            zustandストアをuseSyncExternalStoreで購読する例
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <CounterDisplay />
          <UsesControls />
          <ZustandDisplay />
          <ZustandControls />
        </div>
      </div>
    </div>
  );
}
