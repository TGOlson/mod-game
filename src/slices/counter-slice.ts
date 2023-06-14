import { createSlice } from '@reduxjs/toolkit';

type State = {
  value: number;
};

const initialState: State = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state: State) => {
      state.value += 1;
    },
    decrement: (state: State) => {
      state.value -= 1;
    },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
