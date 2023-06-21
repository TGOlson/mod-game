import React from 'react';

import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import ListItem from '@mui/joy/ListItem';

import { toggleModActive } from '../slices/game-slice';
import { useAppDispatch } from '../hooks';
import { Mod, Attribute } from '../game/types';


export type ModProps = {
  index?: number;
  mod: Mod;
};

const modAttr = (attr: Attribute) => {
  switch (attr.target) {
    case 'GOLD_RATE': return `+${attr.value}% gold rate`;
    case 'GOLD_FLAT': return `+${attr.value / 1000} gold rate`;
    case 'TICK_RATE': return `-${attr.value}% tick length`;
    case 'TICK_FLAT': return `-${attr.value / 1000} tick length`;
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
        onClick={() => index !== undefined ? dispatch(toggleModActive(index)) : null}
      >
        <Typography level='body2'>{name}</Typography>
        {attrs.map((attr, index) => (
          attr ? <ListItem key={index}><Typography level='body3'>{modAttr(attr)}</Typography></ListItem> : null
        ))}
      </Card>
  );
};

export default ModTile;
