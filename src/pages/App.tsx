import React, { useEffect } from 'react';

import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';

import { useAppStore } from '../hooks';
import TicksDisplay from '../components/TicksDisplay';
import GoldDisplay from '../components/GoldDisplay';
import { runGameLoop } from '../game';
import ModList from '../components/ModList';

const App = () => {

  const store = useAppStore();

  useEffect(() => {
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
