import React from 'react';

import Card from '@mui/joy/Card';
import Button from '@mui/joy/Button';

import { useAppDispatch, useAppSelector } from '../hooks';
import NewModModal from './NewModModal';
import { discardTempMod, rollTempMod, saveTempMod } from '../slices/game-slice';
import { calcModCost } from '../game/calc';
import { Typography } from '@mui/joy';

const Shop = () => {
  const dispatch = useAppDispatch();
  const {goldTotal, tempMod, modsRolled} = useAppSelector((state) => state.game);
  const modCost = calcModCost(modsRolled);

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const openModal = () => {
    dispatch(rollTempMod());
    setModalOpen(true);
  };

  const closeModal = (saveMod: boolean) => {
    if (saveMod) {
      dispatch(saveTempMod());
    } else {
      dispatch(discardTempMod());
    }

    setModalOpen(false);
  };

  return (
    <Card variant='outlined' sx={{m: 2, gap: 0.5, minWidth: 320}}>
      <Typography level='h4'>Shop</Typography>
      <Button disabled={goldTotal < modCost} onClick={openModal}>Roll Mod ({modCost / 1000} gold)</Button>
      {tempMod ? <NewModModal open={modalOpen} mod={tempMod} onClose={closeModal} /> : null}
    </Card>
  );
};

export default Shop;
