import React from 'react';

import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';

import { useAppSelector } from '../hooks';
import GoldIcon from './GoldIcon';
import { calcLevel } from '../game/calc';

const GoldDisplay = () => {
  const {goldTotal, goldRate, goldLifetime} = useAppSelector((state) => state.game);

  const goldDisplay = Math.floor(goldTotal  / 1000);
  const level = calcLevel(goldLifetime);

  const rate = Math.floor(goldRate / 1000 * 100) / 100;

  return (
    <Card variant='outlined' sx={{m: 2, gap: 1, flexGrow: 1, width: '300px'}}>
      <Typography level='h2' sx={{display: 'flex'}}><GoldIcon /> <span style={{marginLeft: '4px'}}>{goldDisplay}</span></Typography>
      <Typography level='body2'>{rate} gold per second (gps)</Typography>
      <Typography level='body2'>Level {level}</Typography>
    </Card>
  );
};

export default GoldDisplay;
