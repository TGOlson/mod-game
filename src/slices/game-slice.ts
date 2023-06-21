import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Mod } from '../game/types';
import { BASE_GOLD_RATE, BASE_TICK_RATE, calcGoldRate, calcModCost, calcTickRate } from '../game/calc';
import * as Game from '../game/mod';


type State = {
  mods: Mod[];
  tempMod: Mod | null;
  modsRolled: number;
  goldTotal: number;
  goldLifetime: number;
  goldRate: number;
  tickRate: number;
};

const initialState: State = {
  mods: [],
  tempMod: null,
  modsRolled: 0,
  goldTotal: 0, // milli gold, divide by 1000 for display 
  goldLifetime: 0, 
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
    // Note: right now addMod is only used for testing
    // normal game flow is roll -> save/discard
    // maybe remove this action later
    addMod: (state: State, action: PayloadAction<Mod>) => {
      state.mods.push(action.payload);
      updateGoldAndTickRates(state);
    },
    rollTempMod: (state: State) => {
      state.goldTotal -= calcModCost(state.modsRolled);

      state.modsRolled += 1;
      state.tempMod = Game.rollMod();
    },
    saveTempMod: (state: State) => {
      if (!state.tempMod) throw new Error('No temp mod to save');

      state.mods.push(state.tempMod);
      state.tempMod = null;

      updateGoldAndTickRates(state);
    },
    discardTempMod: (state: State) => {
      if (!state.tempMod) throw new Error('No temp mod to discard');

      state.tempMod = null;
    },
    toggleModActive: (state: State, action: PayloadAction<number>) => {
      const mod = state.mods[action.payload];

      if(!mod) throw new Error (`Unable to find mod at index ${action.payload}`);

      mod.active = !mod.active;

      updateGoldAndTickRates(state);
    },
    applyTicks: (state: State, action: PayloadAction<number>) => {
      updateGoldAndTickRates(state);

      const goldDelta = state.goldRate * action.payload;
      state.goldTotal += goldDelta;
      state.goldLifetime += goldDelta;
    },
  }
});

export const { addMod, rollTempMod, saveTempMod, discardTempMod, toggleModActive, applyTicks } = gameSlice.actions;

export default gameSlice.reducer;
