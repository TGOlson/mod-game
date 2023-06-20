import React from 'react';

import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';

import { useAppSelector } from '../hooks';
import { Box } from '@mui/joy';

const GoldDisplay = () => {
  const {goldRate, goldTotal, tickRate} = useAppSelector((state) => state.game);

  return (
    <Card variant='outlined' sx={{m: 2, gap: 1, flexGrow: 1}}>
      <Typography level='h4'>Gold: {goldTotal / 1000}</Typography>
      <Typography>Rate: {goldRate / 1000} gold/tick</Typography>
      <Typography>Tick length: {tickRate / 1000} seconds</Typography>
    </Card>
  );
};

export default GoldDisplay;
