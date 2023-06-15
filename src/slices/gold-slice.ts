import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { applyTicks } from './ticks-slice';

type State = {
  goldTotal: number;
  goldRate: number;
};

const initialState: State = {
  goldTotal: 0, // milli gold, divide by 1000 for display 
  goldRate: 1000, // milli gold per second, 1 gold per second
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
    builder.addCase(applyTicks, (state: State, action: PayloadAction<number>) => {
      state.goldTotal += state.goldRate * action.payload;
    });
  },
});

export const { setGoldRate } = ticksSlice.actions;

export default ticksSlice.reducer;
