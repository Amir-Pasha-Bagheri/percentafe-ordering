import { create } from 'zustand';

interface Market {
  coins: any[];
  setCoins: (coins: any[]) => void;
  page: number;
  setPage: (page: number) => void;
}

interface Store {
  irt: Market;
  usdt: Market;
  mode: 'dark' | 'light';
  setMode: (mode: 'dark' | 'light') => void;
}

const useAppStore = create<Store>((set, get) => ({
  irt: {
    coins: [],
    setCoins: (coins) => set({ irt: { ...get().irt, coins } }),
    page: 1,
    setPage: (page) => set({ irt: { ...get().irt, page } }),
  },

  usdt: {
    coins: [],
    setCoins: (coins) => set({ usdt: { ...get().usdt, coins } }),
    page: 1,
    setPage: (page) => set({ usdt: { ...get().usdt, page } }),
  },

  mode: (window.localStorage.getItem('mode') as 'dark' | 'light') || 'light',
  setMode: (mode) => set({ mode }),
}));

export default useAppStore;

export const useIRTCoins = () => useAppStore((state) => state.irt.coins);
export const useIRTSetCoins = () => useAppStore((state) => state.irt.setCoins);
export const useIRTPage = () => useAppStore((state) => state.irt.page);
export const useIRTSetPage = () => useAppStore((state) => state.irt.setPage);

export const useUSDTCoins = () => useAppStore((state) => state.usdt.coins);
export const useUSDTSetCoins = () => useAppStore((state) => state.usdt.setCoins);
export const useUSDTPage = () => useAppStore((state) => state.usdt.page);
export const useUSDTSetPage = () => useAppStore((state) => state.usdt.setPage);

export const useMode = () => useAppStore((state) => state.mode);
export const useSetMode = () => useAppStore((state) => state.setMode);
