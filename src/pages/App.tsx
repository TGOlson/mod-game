import React, { useEffect } from 'react';

import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';

import { useAppStore } from '../hooks';
import TicksDisplay from '../components/TicksDisplay';
import GoldDisplay from '../components/GoldDisplay';
import { runGameLoop } from '../game/core-loop';
import ModList from '../components/ModList';
import { addMod } from '../slices/game-slice';
import { Mod } from '../game/types';

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
      value: 500
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
      
      <Box sx={{display: 'flex', gap: 2, flexWrap: 'wrap'}}>
        <GoldDisplay />
        <TicksDisplay />
      </Box>
      <ModList />
    </CssVarsProvider>
  );
};

export default App;
