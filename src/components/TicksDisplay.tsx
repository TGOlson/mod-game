import React from 'react';

import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';

import { useAppDispatch, useAppSelector } from '../hooks';
import { setTickRate } from '../slices/ticks-slice';

const TicksDisplay = () => {
  const dispatch = useAppDispatch();

  const {tickRate, lastTick} = useAppSelector((state) => state.ticks);

  return (
      <Card variant='outlined' sx={{m: 2, gap: 2, width: 320}}>
        <Typography level='h3'>Ticks!</Typography>
        <Typography>Tick rate: {tickRate}</Typography>
        <Typography>Ticks: {Math.round(lastTick / tickRate)}</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button size='sm' onClick={() => dispatch(setTickRate(tickRate - 100))}>Faster ticks</Button>
          <Button size='sm' onClick={() => dispatch(setTickRate(tickRate + 100))}>Slower ticks</Button>
        </Box>
      </Card>
  );
};

export default TicksDisplay;
