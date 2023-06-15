import React from 'react';

import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';

import { useAppDispatch, useAppSelector } from '../hooks';
import { setTickRate } from '../slices/ticks-slice';
import { setGoldRate } from '../slices/gold-slice';

const GoldDisplay = () => {
  const dispatch = useAppDispatch();

  const {goldRate, goldTotal} = useAppSelector((state) => state.gold);

  return (
      <Card variant='outlined' sx={{m: 2, gap: 2, width: 320}}>
        <Typography level='h3'>Gold!</Typography>
        <Typography>Gold rate: {goldRate}</Typography>
        <Typography>goldTotal: {goldTotal}</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button size='sm' onClick={() => dispatch(setGoldRate(goldRate + 0.1))}>Faster gold</Button>
          <Button size='sm' onClick={() => dispatch(setTickRate(goldRate - 0.1))}>Slower gold</Button>
        </Box>
      </Card>
  );
};

export default GoldDisplay;
