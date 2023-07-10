import React from 'react';

import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import LinearProgress from '@mui/joy/LinearProgress';
import Box from '@mui/joy/Box';
import Tooltip from '@mui/joy/Tooltip';
import Divider from '@mui/joy/Divider';

import { useAppSelector } from '../hooks';
import { calcGoldRequiredForLevel, calcLevel } from '../game/calc';

const levelToopTip = (
  <Box sx={{display: 'flex', flexDirection: 'column'}}>
    <Typography level='body2' fontSize='small'>Higher levels unlock the potential to roll better mods.</Typography>
    <Typography level='body2' fontSize='small'>Accumulate more gold to level up.</Typography>
  </Box>
);

const StatsDisplay = () => {
  const {goldLifetime, goldRate} = useAppSelector((state) => state.game);

  const level = calcLevel(goldLifetime);

  const goldForCurrentLevel = calcGoldRequiredForLevel(level);
  const goldForNextLevel = calcGoldRequiredForLevel(level + 1);
  const progressToNextLevel = Math.round((goldLifetime - goldForCurrentLevel) / (goldForNextLevel - goldForCurrentLevel) * 100);

  const flatIncrease = goldRate.flatIncrease / 1000;
  const percentIncrease = Math.round((goldRate.percentIncrease - 1) * 100); 

  return (
    <Card variant='outlined' sx={{gap: 0.5, minWidth: 320}}>
      <Typography level='h6'>Stats</Typography>
      <Divider inset='none' />
      <Box sx={{display: 'flex', mt: 1, gap: 1, alignItems: 'center'}}>
        <Typography level='body2'>Level {level}</Typography>
        <Tooltip title={levelToopTip} arrow  size='sm' variant="outlined" placement="right">
          <LinearProgress sx={{maxWidth: 100}} determinate value={progressToNextLevel} />
        </Tooltip>
      </Box>
      <Typography level='body3'>Flat increase from mods <Typography fontWeight='md'>+{flatIncrease} gps</Typography></Typography>
      <Typography level='body3'>Percent increase from mods <Typography fontWeight='md'>+{percentIncrease}% gps</Typography></Typography>
    </Card>
  );
};

export default StatsDisplay;
