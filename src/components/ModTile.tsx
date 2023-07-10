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
import { SxProps } from '@mui/joy/styles/types';


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
        <Typography level="body4" sx={{ml: '-4px'}}>lvl{level}</Typography>
      </CardOverflow>
    </Card>
  );
};

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

  const {name, level, active, attrs} = mod;
  
  const largeCard = expanded ?? hovered;
  const isHovered = hovered && !expanded;

  const cardStyle: SxProps = {
    zIndex: isHovered ? 100 : undefined, 
    width: largeCard ? 125 : 75, 
    height: largeCard ? 125 : 75, 
    m: largeCard ? undefined : 0.5,
    mt: isHovered ? -3 : undefined, 
    ml: isHovered ? -3 : undefined, 
    position: isHovered ? 'absolute' : undefined, 
    color: active ? '#addbff' : undefined, 
    borderWidth: active ? 2 : 1, 
  };

  const deleteIcon = isHovered 
    ? (
      <IconButton variant="plain" size='sm' sx={{"--IconButton-size": '28px'}} onClick={onDeleteClick} color="neutral">
        <DeleteIcon />
      </IconButton>
    ) : (expanded ? emptyBox(28) : null);

  return (
    <Box sx={{width: expanded ? undefined : 83, height: expanded ? undefined : 83}} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Card variant='outlined' sx={cardStyle} color={active ? 'primary' : undefined} onClick={onTileClick}>
        <CardOverflow sx={{p: largeCard ? 1.5 : 1, pb: 0.5, flexGrow: 1}}>
          {largeCard ? <Typography level='body3' fontWeight='md'>Mod Name</Typography> : null}
          {attrs.map((attr, index) => (
            attr ? <ListItem key={index}><Typography level={largeCard ? 'body3' : 'body4'}>{modAttr(attr)} gps</Typography></ListItem> : null
          ))}
        </CardOverflow>
        <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
          <Divider inset="context" />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mr: '-8px' }}>
            <Typography level={largeCard ? 'body3' : 'body4'} sx={{ml: largeCard ? undefined : '-4px'}}>lvl{level}</Typography>
            {deleteIcon}
          </Box>
        </CardOverflow>
      </Card>
    </Box>
  );
};

export default ModTile;
