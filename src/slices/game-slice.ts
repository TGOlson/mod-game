import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Mod } from '../game/types';
import { BASE_GOLD_RATE, BASE_TICK_RATE, calcGoldRate, calcTickRate } from '../game/calc';


type State = {
  mods: Mod[];
  goldTotal: number;
  goldRate: number;
  tickRate: number;
};

const initialState: State = {
  mods: [],
  goldTotal: 0, // milli gold, divide by 1000 for display 
  goldRate: BASE_GOLD_RATE,
  tickRate: BASE_TICK_RATE,
};

const updateGoldAndTickRates = (state: State) => {
  state.goldRate = calcGoldRate(state.mods);
  state.tickRate = calcTickRate(state.mods);
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addMod: (state: State, action: PayloadAction<Mod>) => {
      state.mods.push(action.payload);

      updateGoldAndTickRates(state);
    },
    toggleModActive: (state: State, action: PayloadAction<number>) => {
      const mod = state.mods[action.payload];

      if(!mod) throw new Error (`Unable to find mod at index ${action.payload}`);

      mod.active = !mod.active;

      updateGoldAndTickRates(state);
    },
    applyTicks: (state: State, action: PayloadAction<number>) => {
      updateGoldAndTickRates(state);

      state.goldTotal += state.goldRate * action.payload;
    },
  }
});

export const { addMod, toggleModActive, applyTicks } = gameSlice.actions;

export default gameSlice.reducer;
