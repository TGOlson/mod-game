import React from 'react';

import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';

import { useAppSelector } from '../hooks';

const GoldDisplay = () => {
  const {goldTotal, goldRate} = useAppSelector((state) => state.game);

  const goldDisplay = Math.floor(goldTotal  / 1000);

  const rate = Math.floor(goldRate.rate / 1000 * 10) / 10;

  return (
    <Card variant='outlined' sx={{gap: 1, flexGrow: 1, width: '300px', alignItems: 'center', justifyContent: 'center'}}>
      <Typography level='h2' sx={{display: 'flex'}}><Typography sx={{fontVariantNumeric: 'tabular-nums', mr: 1}}>{goldDisplay}</Typography> gold</Typography>
      <Typography level='body2'>{rate} gold per second (gps)</Typography>        
    </Card>
  );
};

export default GoldDisplay;
