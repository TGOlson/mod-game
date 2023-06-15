import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type State = {
  lastDelta: number;
  tickRate: number;
};

const initialState: State = {
  lastDelta: 0,
  tickRate: 1000,
};

export const ticksSlice = createSlice({
  name: 'ticks',
  initialState,
  reducers: {
    applyTicks: (state: State, action: PayloadAction<number>) => {
      state.lastDelta = action.payload;
    },
    setTickRate: (state: State, action: PayloadAction<number>) => {
      state.tickRate = action.payload;
    },
  },
});

export const { applyTicks, setTickRate } = ticksSlice.actions;

export default ticksSlice.reducer;
