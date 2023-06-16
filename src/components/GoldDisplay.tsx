import React from 'react';

import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';

import { useAppSelector } from '../hooks';

const GoldDisplay = () => {
  const {goldRate, goldTotal} = useAppSelector((state) => state.game);

  return (
      <Card variant='outlined' sx={{m: 2, gap: 2, width: 320}}>
        <Typography>Rate: {goldRate / 1000} gold/tick</Typography>
        <Typography>Gold: {goldTotal / 1000}</Typography>
      </Card>
  );
};

export default GoldDisplay;
