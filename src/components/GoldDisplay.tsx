import React from 'react';

import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';

import { useAppSelector } from '../hooks';
import GoldIcon from './GoldIcon';

const GoldDisplay = () => {
  const {goldTotal} = useAppSelector((state) => state.game);

  return (
    <Card variant='outlined' sx={{m: 2, gap: 1, flexGrow: 1, width: '300px'}}>
      <Typography level='h2' sx={{display: 'flex'}}><GoldIcon /> <span style={{marginLeft: '4px'}}>{goldTotal / 1000}</span></Typography>
    </Card>
  );
};

export default GoldDisplay;
