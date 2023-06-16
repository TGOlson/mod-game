import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Mod } from '../game/types';
import { BASE_GOLD_RATE, calcGoldRate } from '../game/calc';


type State = {
  mods: Mod[];
  goldTotal: number;
  goldRate: number;
  tickRate: number;
};

const initialState: State = {
  mods: [],
  goldTotal: 0, // milli gold, divide by 1000 for display 
  goldRate: BASE_GOLD_RATE, // milli gold/second => 1 gold/second
  tickRate: 1000,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addMod: (state: State, action: PayloadAction<Mod>) => {
      const goldRate = calcGoldRate(state.mods);

      state.goldRate = goldRate;
      state.mods.push(action.payload);
    },
    toggleModActive: (state: State, action: PayloadAction<number>) => {
      const mod = state.mods[action.payload];

      if(!mod) throw new Error (`Unable to find mod at index ${action.payload}`);

      mod.active = !mod.active;

      const goldRate = calcGoldRate(state.mods);
      state.goldRate = goldRate;
    },
    applyTicks: (state: State, action: PayloadAction<number>) => {
      const goldRate = calcGoldRate(state.mods);

      state.goldRate = goldRate;
      state.goldTotal += goldRate * action.payload;
    },
    setTickRate: (state: State, action: PayloadAction<number>) => {
      state.tickRate = action.payload;
    },
  }
});

export const { addMod, toggleModActive, applyTicks, setTickRate } = gameSlice.actions;

export default gameSlice.reducer;
