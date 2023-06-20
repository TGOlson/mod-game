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
// import ActiveMods from '../components/ActiveMods';

const initialMods: Mod[] =
  [{
    name: 'Mod of Wealth',
    active: true,
    attrs: [{
      type: 'GOLD_RATE',
      value: 100
    }],
  }, {
    name: 'Mod of Riches',
    active: false,
    attrs: [{
      type: 'GOLD_RATE',
      value: 200
    }],
  }, {
    name: 'Mod of Speed',
    active: false,
    attrs: [{
      type: 'TICK_RATE',
      value: 100
    }],
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
