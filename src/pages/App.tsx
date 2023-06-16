import React, { useEffect } from 'react';

import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

import { useAppStore } from '../hooks';
import TicksDisplay from '../components/TicksDisplay';
import GoldDisplay from '../components/GoldDisplay';
import { runGameLoop } from '../game';

const App = () => {

  const store = useAppStore();

  useEffect(() => {
    return runGameLoop(store);
  }, []);

  return (
    <CssVarsProvider>
      <CssBaseline />
      
      <GoldDisplay />
      <TicksDisplay />
    </CssVarsProvider>
  );
};

export default App;
