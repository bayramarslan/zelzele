import { create } from "zustand";

import { Data, Filter } from "@/lib/types";

interface State {
  loading: boolean;
  data: Data;
  filter: Filter;
  setLoading: (_state: boolean) => void;
  setData: (_data: Data) => void;
  setFilter: (_filter: Filter) => void;
  setCity: (_city: string | null) => void;
  fetchData: () => Promise<void>;
}

// Aynı anda birden fazla isteğin (ör. art arda tıklama) çalışmasını engeller.
let inFlight: AbortController | null = null;

const store = create<State>((set, get) => ({
  loading: true,
  data: { lastUpdate: "", data: [] },
  filter: { hide: 2 },
  setLoading: state => set(() => ({ loading: state })),
  setData: data => set(() => ({ data })),
  setFilter: filter =>
    set(state => ({ filter: { ...state.filter, ...filter } })),
  setCity: city => set(state => ({ filter: { ...state.filter, city } })),
  fetchData: async () => {
    if (inFlight) return;

    const controller = new AbortController();
    inFlight = controller;

    const { setLoading, setData } = get();

    try {
      setLoading(true);

      const res = await fetch("/api", { signal: controller.signal });

      if (!res.ok) {
        throw new Error(`API HTTP ${res.status}`);
      }

      const data = (await res.json()) as Data;
      setData(data);
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    } finally {
      inFlight = null;
      setLoading(false);
    }
  }
}));

export default store;
