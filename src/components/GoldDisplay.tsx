import React from 'react';

import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import LinearProgress from '@mui/joy/LinearProgress';

import { useAppSelector } from '../hooks';
import GoldIcon from './GoldIcon';
import { calcGoldRequiredForLevel, calcLevel } from '../game/calc';
import { Box, Tooltip } from '@mui/joy';

const levelToopTip = () => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column'}}>
      <Typography level='body2' fontSize='small'>Higher levels unlock the potential to roll better mods.</Typography>
      <Typography level='body2' fontSize='small'>Accumulate more gold to level up.</Typography>
    </Box>
  );
}

const levelTooltipText = 'Higher levels unlock the potential to roll better mods. Accumulate more gold to level up.';

const GoldDisplay = () => {
  const {goldTotal, goldRate, goldLifetime} = useAppSelector((state) => state.game);

  const goldDisplay = Math.floor(goldTotal  / 1000);
  const level = calcLevel(goldLifetime);

  const rate = Math.floor(goldRate / 1000 * 100) / 100;

  const goldForCurrentLevel = calcGoldRequiredForLevel(level);
  const goldForNextLevel = calcGoldRequiredForLevel(level + 1);
  const progressToNextLevel = Math.round((goldLifetime - goldForCurrentLevel) / (goldForNextLevel - goldForCurrentLevel) * 100);

  return (
    <Card variant='outlined' sx={{gap: 1, flexGrow: 1, width: '300px'}}>
      <Typography level='h2' sx={{display: 'flex'}}><GoldIcon /> <span style={{marginLeft: '4px'}}>{goldDisplay}</span></Typography>
      <Typography level='body2'>{rate} gold per second (gps)</Typography>
      <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
        <Typography level='body2'>Level {level}</Typography>
        <Tooltip title={levelToopTip()} arrow  size='sm' variant="outlined" placement="right">
          <LinearProgress sx={{maxWidth: 100}} determinate value={progressToNextLevel} />
        </Tooltip>
      </Box>
        
    </Card>
  );
};

export default GoldDisplay;
