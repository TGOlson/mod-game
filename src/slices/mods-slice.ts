// import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// import { Mod } from '../game/types';


// type State = {
//   mods: Mod[];
// };

// const initialState: State = {
//   mods: [],
// };

// export const ticksSlice = createSlice({
//   name: 'mods',
//   initialState,
//   reducers: {
//     addMod: (state: State, action: PayloadAction<Mod>) => {
//       state.mods.push(action.payload);
//     },
//     toggleActive: (state: State, action: PayloadAction<number>) => {
//       const mod = state.mods[action.payload];

//       if(!mod) throw new Error (`Unable to find mod at index ${action.payload}`);

//       mod.active = !mod.active;
//     },
//   },
// });

// export const { addMod, toggleActive } = ticksSlice.actions;

// export default ticksSlice.reducer;
