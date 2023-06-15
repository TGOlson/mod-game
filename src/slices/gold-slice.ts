import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { setLastTick } from './ticks-slice';

type State = {
  goldTotal: number;
  goldRate: number;
};

const initialState: State = {
  goldTotal: 0, // todo: use localstorage 
  goldRate: 1,
};

export const ticksSlice = createSlice({
  name: 'gold',
  initialState,
  reducers: {
    setGoldRate: (state: State, action: PayloadAction<number>) => {
      state.goldRate = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(setLastTick, (state: State, action: PayloadAction<number>) => {
      state.goldTotal += state.goldRate * (action.payload / 1000);
    });
  },
});

export const { setGoldRate } = ticksSlice.actions;

export default ticksSlice.reducer;
