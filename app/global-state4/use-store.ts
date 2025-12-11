import { useSyncExternalStore } from "react";
import { Store, CounterStore } from "./store";

const useStore = <T>(store: CounterStore, selector: (state: Store) => T) => {
  return useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    () => selector(store.getServerSideSnapshot())
  );
};

export default useStore;
