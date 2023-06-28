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
import { handleKeyPress } from '../game/keypress-handlers';

const initialMods: Mod[] =
  [rollMod(1), rollMod(1), rollMod(1), rollMod(1), rollMod(1)];

const App = () => {

  const store = useAppStore();

  useEffect(() => {
    initialMods.forEach(mod => store.dispatch(addMod(mod)));

    handleKeyPress(store);
    return runGameLoop(store);
  }, []);

  return (
    <CssVarsProvider>
      <CssBaseline />
      
      <Box sx={{display: 'flex', m: 2, mb: 0, gap: 2}}>
        <GoldDisplay />
        <Shop />
      </Box>
      <Box sx={{display: 'flex', m: 2, flexGrow: 1, overflow: 'auto'}}>
        <ModStash />
      </Box>
    </CssVarsProvider>
  );
};

export default App;
