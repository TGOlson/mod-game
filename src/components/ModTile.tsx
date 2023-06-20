import React from 'react';

import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import { toggleModActive } from '../slices/game-slice';
import { useAppDispatch } from '../hooks';
import { Mod, ModAttribute } from '../game/types';


export type ModProps = {
  index: number;
  mod: Mod;
};

const modAttr = (attr: ModAttribute) => {
  switch (attr.type) {
    case 'GOLD_RATE': return `+${attr.value / 1000} gold per tick`;
    case 'TICK_RATE': return `-${attr.value / 1000} seconds per tick`;
    // default: throw new Error(`Unknown attribute type: ${attr.type}`);
  } 
};

const ModTile = ({index, mod}: ModProps) => {
  const {name, active, attrs} = mod;

  const dispatch = useAppDispatch();

  return (
      <Card 
        variant='outlined' 
        sx={{m: 0.5, gap: 0.5, width: 150, height: 150, borderWidth: active ? 2 : 1}} 
        color={active ? 'primary' : undefined}
        onClick={() => dispatch(toggleModActive(index))}
      >
        <Typography>{name}</Typography>
        <List size='sm'>
          {attrs.map((attr, index) => (
            <ListItem key={index}>{modAttr(attr)}</ListItem>
          ))}
        </List>
      </Card>
  );
};

export default ModTile;
