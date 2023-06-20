import React from 'react';

import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';

import { useAppSelector } from '../hooks';
import ModTile from './ModTile';
import { Box } from '@mui/joy';

const ModStash = () => {
  const mods = useAppSelector((state) => state.game.mods);

  return (
    <Card variant='outlined' sx={{m: 2, gap: 0.5, flexGrow: 1}}>
      <Typography level='h3'>Mods</Typography>
      <Typography>{mods.filter(m => m.active).length} of {mods.length} active</Typography>
      <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
        {mods.map((mod, index) => <ModTile key={index} index={index} mod={mod} />)}
      </Box>
    </Card>
  );
};

export default ModStash;
