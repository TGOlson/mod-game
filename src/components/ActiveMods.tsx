import React from 'react';

import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';

import { useAppSelector } from '../hooks';
import ModTile from './ModTile';

const ActiveMods = () => {
  const mods = useAppSelector((state) => state.game.mods);
  const activeMods = mods.filter(m => m.active);

  return (
    <Card variant='outlined' sx={{m: 2, gap: 0.5, flexGrow: 1}}>
      <Typography level='h3'>ACtive Mods</Typography>
      <Typography>{activeMods.length} active</Typography>
      {activeMods.map((mod, index) => <ModTile key={index} index={index} mod={mod} />)}
    </Card>
  );
};

export default ActiveMods;
