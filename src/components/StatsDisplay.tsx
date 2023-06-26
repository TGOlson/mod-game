import React from 'react';

import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';

import { useAppSelector } from '../hooks';

const StatsDisplay = () => {
  const {goldRate} = useAppSelector((state) => state.game);

  return (
    <Card variant='outlined' sx={{m: 2, gap: 1, flexGrow: 1}}>
      <Typography level='body1'>Stats</Typography>
      <Typography level='body2'>{goldRate / 1000} gold per second (gps)</Typography>
    </Card>
  );
};

export default StatsDisplay;
