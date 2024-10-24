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
}));

export default useAppStore;

export const useIRTCoins = () => useAppStore((state) => state.irt.coins);
export const useIRTSetCoins = () => useAppStore((state) => state.irt.setCoins);

export const useUSDTCoins = () => useAppStore((state) => state.usdt.coins);
export const useUSDTSetCoins = () => useAppStore((state) => state.usdt.setCoins);
