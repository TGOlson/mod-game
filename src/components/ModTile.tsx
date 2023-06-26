import React from 'react';

import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import ListItem from '@mui/joy/ListItem';

import { toggleModActive } from '../slices/game-slice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Mod, Attribute } from '../game/types';


export type ModProps = {
  index?: number;
  mod: Mod;
};

const modAttr = (attr: Attribute) => {
  switch (attr.target) {
    case 'GOLD_RATE': return `+${attr.value}% gold rate`;
    case 'GOLD_FLAT': return `+${attr.value / 1000} gold rate`;
    // case 'GOLD_10X_CHANCE': return `+${attr.value}% chance to earn 10x gold`;
    // case 'TICK_RATE': return `-${attr.value}% tick length`;
    // case 'TICK_FLAT': return `-${attr.value / 1000} tick length`;
    default: (`Unmapped attr: ${attr.type} ${attr.target} ${attr.value}`);
  }
};

const ModTile = ({index, mod}: ModProps) => {
  const {name, level, active, attrs} = mod;

  const dispatch = useAppDispatch();

  const {mods, maxModsActive} = useAppSelector((state) => state.game);


  const onClick = () => {
    // if index is undefined, this is a temp mod, so just do nothing on click
    // todo: maybe for a cleaner way to specifcy temp mods from the shop
    const isTempMod = index === undefined;
    const disableActive = !active && mods.filter(m => m.active).length === maxModsActive;

    if (isTempMod || disableActive) return;

    dispatch(toggleModActive(index));
  };

  return (
      <Card 
        variant='outlined' 
        sx={{m: 0.5, gap: 0.5, width: 150, height: 150, borderWidth: active ? 2 : 1}} 
        color={active ? 'primary' : undefined}
        onClick={onClick}
      >
        <Typography level='body2'>{name}</Typography>
        <Typography level='body3'>Level {level}</Typography>
        {attrs.map((attr, index) => (
          attr ? <ListItem key={index}><Typography level='body3'>{modAttr(attr)}</Typography></ListItem> : null
        ))}
      </Card>
  );
};

export default ModTile;
