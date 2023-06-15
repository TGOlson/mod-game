import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type State = {
  lastTick: number;
  delta: number;
  tickRate: number;
};

const initialState: State = {
  lastTick: 0, // todo: use localstorage 
  delta: 0,
  tickRate: 1000,
};

export const ticksSlice = createSlice({
  name: 'ticks',
  initialState,
  reducers: {
    setLastTick: (state: State, action: PayloadAction<number>) => {
      state.delta = state.lastTick - action.payload;
      state.lastTick = action.payload;
    },
    setTickRate: (state: State, action: PayloadAction<number>) => {
      state.tickRate = action.payload;
    },
  },
});

export const { setLastTick, setTickRate } = ticksSlice.actions;

export default ticksSlice.reducer;
