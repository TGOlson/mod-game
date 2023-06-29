import React, { useEffect } from 'react';

import Card from '@mui/joy/Card';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/joy/Divider';

import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

import { useAppDispatch, useAppSelector } from '../hooks';
import NewModModal from './NewModModal';
import { incMaxModActive, openRollModModal, closeRollModModal } from '../slices/game-slice';
import { calcAdditionalActiveCost, calcModCost } from '../game/calc';
import GoldIcon from './GoldIcon';
import { Box, IconButton, Tooltip } from '@mui/joy';

const Shop = () => {
  const dispatch = useAppDispatch();
  const {goldTotal, tempMod, modsRolled, maxModsActive, rollModModalOpen} = useAppSelector((state) => state.game);
  const modCost = calcModCost(modsRolled);
  const additionalActiveCost = calcAdditionalActiveCost(maxModsActive);

  const openModal = () => {
    dispatch(openRollModModal());
  };

  const closeModal = (saveMod: boolean) => {
    dispatch(closeRollModModal(saveMod));
  };

  return (
    <Card variant='outlined' sx={{gap: 0.5, minWidth: 320}}>
      <Typography level='h6'>Shop</Typography>
      <Divider inset='none' />
      <Box sx={{display: 'flex', mt: 1, gap: 2}}>
        <Tooltip title='Roll a new mod with random attributes (shortcut: R)' arrow  size='sm' variant="outlined" placement="bottom">
          <Button 
            sx={{flexGrow: 1, flexBasis: 0}}
            disabled={goldTotal < modCost} 
            onClick={openModal} 
            variant='outlined' 
            startDecorator={<CasinoOutlinedIcon />}
            >
            {modCost / 1000} gold
          </Button>
        </Tooltip>
        <Tooltip title='+1 max active mods' arrow  size='sm' variant="outlined" placement="bottom">
          <Button 
            sx={{flexGrow: 1, flexBasis: 0}}
            disabled={goldTotal < additionalActiveCost} 
            onClick={() => dispatch(incMaxModActive())} 
            variant='outlined' 
            startDecorator={<ElectricBoltIcon />}
            >
            {additionalActiveCost / 1000} gold
          </Button>
        </Tooltip>
      </Box>
      {tempMod ? <NewModModal open={rollModModalOpen} mod={tempMod} onClose={closeModal} /> : null}
    </Card>
  );
};

export default Shop;
