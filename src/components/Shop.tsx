import React, { useEffect } from 'react';

import Card from '@mui/joy/Card';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

import { useAppDispatch, useAppSelector } from '../hooks';
import NewModModal from './NewModModal';
import { incMaxModActive, openRollModModal, closeRollModModal } from '../slices/game-slice';
import { calcAdditionalActiveCost, calcModCost } from '../game/calc';

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
      <Typography level='h4'>Shop</Typography>
      <Button disabled={goldTotal < modCost} onClick={openModal}>Roll Mod ({modCost / 1000} gold)</Button>
      <Button disabled={goldTotal < additionalActiveCost} onClick={() => dispatch(incMaxModActive())}>+1 max active mods ({additionalActiveCost / 1000} gold)</Button>
      {tempMod ? <NewModModal open={rollModModalOpen} mod={tempMod} onClose={closeModal} /> : null}
    </Card>
  );
};

export default Shop;
