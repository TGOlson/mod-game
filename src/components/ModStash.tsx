import React from 'react';

import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import Box from '@mui/joy/Box';

import { useAppSelector } from '../hooks';
import ModTile from './ModTile';

const ModStash = () => {
  const {mods, maxModsActive} = useAppSelector((state) => state.game);
  const activeMods = mods.filter(m => m.active);

  return (
    <Card variant='outlined' sx={{m: 2, gap: 0.5, flexGrow: 1}}>
      <Typography level='h3'>Mods</Typography>
      <Typography>Total: {mods.length}</Typography>
      <Typography>Active: {activeMods.length} of {maxModsActive}</Typography>
      <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
        {mods.map((mod, index) => <ModTile key={index} index={index} mod={mod} />)}
      </Box>
    </Card>
  );
};

export default ModStash;
