import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

interface IGlobalStore {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useGlobalStore = create(
  immer<IGlobalStore>((set, get) => ({
    theme: 'dark',
    setTheme: theme =>
      set(state => {
        state.theme = theme;
      }),
  })),
);
