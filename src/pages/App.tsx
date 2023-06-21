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
import { rollMod } from '../game/mod';
import StatsDisplay from '../components/StatsDisplay';

const initialMods: Mod[] =
  [rollMod(), rollMod(), rollMod(), rollMod(), rollMod()];

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
        <StatsDisplay />
        <GoldDisplay />
        <Shop />
      </Box>
      <ModStash />
    </CssVarsProvider>
  );
};

export default App;
