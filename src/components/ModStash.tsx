import React from 'react';

import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import Box from '@mui/joy/Box';

import { useAppSelector } from '../hooks';
import ModTile from './ModTile';

const ModStash = () => {
  const {mods, maxModsActive} = useAppSelector((state) => state.game);
  const activeMods = mods.filter(m => m.active);

  const notMaxActive = activeMods.length < maxModsActive;

  return (
    <Card variant='outlined' sx={{gap: 0.5, flexGrow: 1}}>
      <Typography level='h3'>Mod Stash</Typography>
      <Typography level='body2'>
        <Typography fontWeight='lg' color={notMaxActive ? 'danger' : undefined}>{activeMods.length} of {maxModsActive}</Typography> active / <Typography fontWeight='lg'>{mods.length}</Typography> total
      </Typography>
      <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5, overflowY: 'scroll'}}>
        {mods.map((mod, index) => <ModTile key={index} index={index} mod={mod} />)}
      </Box>
    </Card>
  );
};

export default ModStash;
