import React, { useEffect } from 'react';

import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';

import { useAppStore } from '../hooks';
import GoldDisplay from '../components/GoldDisplay';
import { runGameLoop } from '../game/core-loop';
import ModStash from '../components/ModStash';
import { addMod } from '../slices/game-slice';
import { Mod } from '../game/types';
import Shop from '../components/Shop';

const initialMods: Mod[] =
  [{
    name: 'Mod of Wealth',
    active: true,
    attrs: [{
      type: 'FLAT_GOLD_RATE',
      value: 100
    }, null, null],
  }, {
    name: 'Mod of Riches',
    active: false,
    attrs: [{
      type: 'PERCENT_GOLD_RATE',
      value: 20
    }, null, null],
  }, {
    name: 'Mod of Speed',
    active: false,
    attrs: [{
      type: 'FLAT_TICK_RATE',
      value: 100
    }, null, null],
  }];

const App = () => {

  const store = useAppStore();

  useEffect(() => {
    initialMods.forEach(mod => store.dispatch(addMod(mod)));

    return runGameLoop(store);
  }, []);

  return (
    <CssVarsProvider>
      <CssBaseline />
      
      <Box sx={{display: 'flex'}}>
        <GoldDisplay />
        <Shop />
      </Box>
      <ModStash />
    </CssVarsProvider>
  );
};

export default App;
