import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Mod } from '../game/types';
import { BASE_GOLD_RATE, calcAdditionalActiveCost, calcGoldRate, calcLevel, calcModCost } from '../game/calc';
import * as Game from '../game/mod';


type State = {
  mods: Mod[];
  maxModsActive: number;
  // maxModsTotal: number; // todo: is this a fun addition? or just remove...
  tempMod: Mod | null;
  modsRolled: number;
  goldTotal: number;
  goldLifetime: number;
  goldRate: number;
  // tickRate: number;
};

const initialState: State = {
  mods: [],
  maxModsActive: 3,
  // maxModsTotal: 10, // todo: is this a fun addition? or just remove...
  tempMod: null,
  modsRolled: 0,
  goldTotal: 0, // milli gold, divide by 1000 for display 
  goldLifetime: 0, 
  goldRate: BASE_GOLD_RATE,
  // tickRate: BASE_TICK_RATE,
};

const updateGoldRate = (state: State) => {
  state.goldRate = calcGoldRate(state.mods);
  // state.tickRate = calcTickRate(state.mods);
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
      updateGoldRate(state);
    },
    rollTempMod: (state: State) => {
      state.goldTotal -= calcModCost(state.modsRolled);

      const level = calcLevel(state.goldLifetime);

      state.modsRolled += 1;
      state.tempMod = Game.rollMod(level);
    },
    saveTempMod: (state: State) => {
      if (!state.tempMod) throw new Error('No temp mod to save');

      state.mods.push(state.tempMod);
      state.tempMod = null;

      updateGoldRate(state);
    },
    discardTempMod: (state: State) => {
      if (!state.tempMod) throw new Error('No temp mod to discard');

      state.tempMod = null;
    },
    toggleModActive: (state: State, action: PayloadAction<number>) => {
      const mod = state.mods[action.payload];

      if(!mod) throw new Error (`Unable to find mod at index ${action.payload}`);

      mod.active = !mod.active;

      updateGoldRate(state);
    },
    incMaxModActive: (state: State) => {
      state.goldTotal -= calcAdditionalActiveCost(state.maxModsActive);

      state.maxModsActive += 1;
    },
    applyDelta: (state: State, action: PayloadAction<number>) => {
      updateGoldRate(state);

      // debugger;
      const goldDelta = Math.floor(state.goldRate * action.payload / 1000);
      state.goldTotal += goldDelta;
      state.goldLifetime += goldDelta;
    },
  }
});

export const { addMod, rollTempMod, saveTempMod, discardTempMod, toggleModActive, incMaxModActive, applyDelta } = gameSlice.actions;

export default gameSlice.reducer;
