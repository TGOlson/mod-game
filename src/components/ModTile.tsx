import React, { SyntheticEvent } from 'react';

import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import ListItem from '@mui/joy/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/joy/IconButton';

import { deleteMod, toggleModActive } from '../slices/game-slice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Mod, Attribute } from '../game/types';
import { Box, CardContent, CardOverflow, Divider } from '@mui/joy';


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

const emptyBox = (x: number) => <Box sx={{width: x, height: x}} />;

const ModTile = ({index, mod}: ModProps) => {
  const {name, level, active, attrs} = mod;

  const dispatch = useAppDispatch();

  const {mods, maxModsActive} = useAppSelector((state) => state.game);


  const onTileClick = () => {
    // if index is undefined, this is a temp mod, so just do nothing on click
    // todo: maybe for a cleaner way to specifcy temp mods from the shop
    const isTempMod = index === undefined;
    const disableActive = !active && mods.filter(m => m.active).length === maxModsActive;

    if (isTempMod || disableActive) return;

    dispatch(toggleModActive(index));
  };

  const onDeleteClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    if (index !== undefined) dispatch(deleteMod(index));
  };

  return (
      <Card 
        variant='outlined' 
        sx={{m: 0.5, width: 150, height: 150, color: active ? '#addbff' : undefined, borderWidth: active ? 2 : 1}} 
        color={active ? 'primary' : undefined}
        onClick={onTileClick}
      >
        <CardContent>
          <Typography level='body2'>{name}</Typography>
          {attrs.map((attr, index) => (
            attr ? <ListItem key={index}><Typography level='body3'>{modAttr(attr)}</Typography></ListItem> : null
            ))}
        </CardContent>
        <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
          <Divider inset="context" />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mr: '-8px' }}>
            <Typography level="body3">Level {level}</Typography>
            {index === undefined 
              ? emptyBox(28) 
              : <IconButton 
                  variant="plain" 
                  size='sm' 
                  sx={{"--IconButton-size": '28px'}} 
                  onClick={onDeleteClick}
                  color="neutral"
                >
                  <DeleteIcon />
                </IconButton>
            }
          </Box>
        </CardOverflow>
      </Card>
  );
};

export default ModTile;
