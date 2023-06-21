import React from 'react';

import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';

import { useAppSelector } from '../hooks';

const StatsDisplay = () => {
  const {goldRate, tickRate} = useAppSelector((state) => state.game);

  return (
    <Card variant='outlined' sx={{m: 2, gap: 1, flexGrow: 1}}>
      <Typography level='body1'>Stats</Typography>
      <Typography level='body2'>Gold per tick: {goldRate / 1000}</Typography>
      <Typography level='body2'>Tick length: {tickRate / 1000} seconds</Typography>
    </Card>
  );
};

export default StatsDisplay;
