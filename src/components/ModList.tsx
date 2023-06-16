import React from 'react';

import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';

import { useAppSelector } from '../hooks';
import ModTile from './ModTile';

const ModList = () => {
  const mods = useAppSelector((state) => state.game.mods);

  return (
    <Card variant='outlined' sx={{m: 2, gap: 0.5, width: 600}}>
        <Typography level='h3'>Mods</Typography>
        <Typography>{mods.filter(m => m.active).length} of {mods.length} active</Typography>
        {mods.map((mod, index) => <ModTile key={index} index={index} mod={mod} />)}
    </Card>
  );
};

export default ModList;
