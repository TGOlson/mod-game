import React, { useEffect } from 'react';

import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

import HelloWorld from '../components/HelloWorld';
import { useAppDispatch } from '../hooks';
import { setLastTick } from '../slices/ticks-slice';
import TicksDisplay from '../components/TicksDisplay';
import GoldDisplay from '../components/GoldDisplay';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let frameId = 0;
    const gameLoop = (tick: number) => {
      frameId = requestAnimationFrame(gameLoop);

      dispatch(setLastTick(tick));
    };

    frameId = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(frameId);
  });

  return (
    <CssVarsProvider>
      <CssBaseline />
      
      <HelloWorld />
      <TicksDisplay />
      <GoldDisplay />
    </CssVarsProvider>
  );
};

export default App;
