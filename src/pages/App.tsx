import React, { useEffect } from 'react';

import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

import HelloWorld from '../components/HelloWorld';
import { useAppDispatch, useAppSelector } from '../hooks';
import { applyTicks } from '../slices/ticks-slice';
import TicksDisplay from '../components/TicksDisplay';
import GoldDisplay from '../components/GoldDisplay';

const App = () => {
  // const dispatch = useAppDispatch();
  // const tickRate = useAppSelector((state) => state.ticks.tickRate);

  // const [lastTickMs, setLastTickMs] = React.useState(0);

  // useEffect(() => {
  //   let frameId = 0;
  //   const gameLoop = (tick: number) => {
  //     const deltaMs = tick - lastTickMs;
  //     const tickDelta = Math.floor(deltaMs / tickRate);
  //     // console.log(tick, deltaMs, tickDelta);
      
  //     if (tickDelta > 0) {
  //       // console.log('aplying tick delta', tickDelta);
  //       dispatch(applyTicks({ticks: tickDelta, lastTickMs: tick}));
  //       setLastTickMs(tick);
  //     }
      
  //     frameId = requestAnimationFrame(gameLoop);
  //     // dispatch(setLastTick(tick));
  //   };

  //   frameId = requestAnimationFrame(gameLoop);

  //   return () => cancelAnimationFrame(frameId);
  // }, []);

  return (
    <CssVarsProvider>
      <CssBaseline />
      
      <GoldDisplay />
      <TicksDisplay />
    </CssVarsProvider>
  );
};

export default App;
