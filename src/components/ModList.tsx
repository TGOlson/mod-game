import React from 'react';

import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';

import { useAppDispatch, useAppSelector } from '../hooks';
import { setGoldRate } from '../slices/gold-slice';
import Mod, { ModAttribute, ModProps } from './Mod';

const ModList = () => {
  const dispatch = useAppDispatch();

  // const {goldRate, goldTotal} = useAppSelector((state) => state.gold);

  const mods: ModProps[] = [{
    name: 'Mod of Wealth',
    active: true,
    attrs: [{
      goldModifier: 100
    }],
  }, {
    name: 'Mod of Riches',
    active: false,
    attrs: [{
      goldModifier: 200
    }]
  }, {
    name: 'Mod of Speed',
    active: false,
    attrs: [{
      tickModifier: 500
    }]
  }];

  return (
    <Card variant='outlined' sx={{m: 2, gap: 0.5, width: 600}}>
        <Typography level='h3'>Mods</Typography>
        <Typography>{mods.filter(m => m.active).length} of {mods.length} active</Typography>
        {mods.map((mod, index) => <Mod key={index} {...mod} />)}
    </Card>
  );
};

export default ModList;
