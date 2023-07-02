import React, { SyntheticEvent } from 'react';

import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import ListItem from '@mui/joy/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/joy/IconButton';
import TollIcon from '@mui/icons-material/Toll';

import { deleteMod, toggleModActive } from '../slices/game-slice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Mod, Attribute } from '../game/types';
import { Box, CardContent, CardOverflow, Divider } from '@mui/joy';


export type ModProps = {
  expanded?: boolean;
  index?: number;
  mod: Mod;
};

const modAttr = (attr: Attribute) => {
  switch (attr.target) {
    case 'GOLD_RATE': return `+${attr.value}%`;
    case 'GOLD_FLAT': return `+${attr.value / 1000}`;
    // case 'GOLD_10X_CHANCE': return `+${attr.value}% chance to earn 10x gold`;
    // case 'TICK_RATE': return `-${attr.value}% tick length`;
    // case 'TICK_FLAT': return `-${attr.value / 1000} tick length`;
    default: (`Unmapped attr: ${attr.type} ${attr.target} ${attr.value}`);
  }
};

const minimizedModTile = (mod: Mod, onTileClick: () => void) => { 
  const {level, active, attrs} = mod;

  return (
    <Card 
      variant='outlined' 
      sx={{m: 0.5, width: 75, height: 75, color: active ? '#addbff' : undefined, borderWidth: active ? 2 : 1}} 
      color={active ? 'primary' : undefined}
      onClick={onTileClick}
    >
      <CardOverflow sx={{p: 1, pb: 0.5, flexGrow: 1}}>
        {attrs.map((attr, index) => (
          attr ? <ListItem key={index}><Typography level='body4'>{modAttr(attr)} gps</Typography></ListItem> : null
        ))}
      </CardOverflow>
      <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
        <Divider inset="context" />
        <Typography level="body4">lvl{level}</Typography>
      </CardOverflow>
    </Card>
  );
};

const expandedModTile = (mod: Mod, onTileClick: () => void, onDeleteClick?: (e: SyntheticEvent) => void) => {
  const {name, level, active, attrs} = mod;

  return (
    <Card 
      variant='outlined' 
      sx={{zIndex: 100, mt: -3, ml: -3, width: 125, height: 125, color: active ? '#addbff' : undefined, borderWidth: active ? 2 : 1, position: 'absolute'}}
      color={active ? 'primary' : undefined}
      onClick={onTileClick}
    >
      <CardContent >
        <Typography level='body3' fontWeight='md'>{name}</Typography>
        {attrs.map((attr, index) => (
          attr ? <ListItem key={index}><Typography level='body3'>{modAttr(attr)} gps</Typography></ListItem> : null
        ))}
      </CardContent>
      <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
        <Divider inset="context" />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mr: '-8px' }}>
          <Typography level="body4">lvl{level}</Typography>
        {onDeleteClick
          ? <IconButton 
              variant="plain" 
              size='sm' 
              sx={{"--IconButton-size": '28px'}} 
              onClick={onDeleteClick}
              color="neutral"
            >
              <DeleteIcon />
            </IconButton>
          : emptyBox(28) 
        }
        </Box>
      </CardOverflow>
    </Card>
);
}

const emptyBox = (x: number) => <Box sx={{width: x, height: x}} />;

const ModTile = ({expanded, index, mod}: ModProps) => {
  const dispatch = useAppDispatch();
  const {mods, maxModsActive} = useAppSelector((state) => state.game);

  const [hovered, setHovered] = React.useState(false);

  const onTileClick = () => {
    // if index is undefined, this is a temp mod, so just do nothing on click
    // todo: maybe for a cleaner way to specifcy temp mods from the shop
    const isTempMod = index === undefined;
    const disableActive = !mod.active && mods.filter(m => m.active).length === maxModsActive;

    if (isTempMod || disableActive) return;

    dispatch(toggleModActive(index));
  };

  const onDeleteClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    if (index !== undefined) dispatch(deleteMod(index));
  };

  return (
    <Box sx={{width: expanded ? undefined : 83, height: expanded ? undefined : 83}} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {(expanded || hovered) ? expandedModTile(mod, onTileClick, onDeleteClick) : minimizedModTile(mod, onTileClick)}
    </Box>
  );
  
  // return expandedModTile(mod, onTileClick, onDeleteClick);
};

export default ModTile;
