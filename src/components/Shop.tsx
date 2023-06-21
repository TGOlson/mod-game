import React from 'react';

import Card from '@mui/joy/Card';
import Button from '@mui/joy/Button';

import { useAppDispatch } from '../hooks';
import RollModal from './RollModModal';
import { Mod } from '../game/types';
import { rollMod } from '../game/mod';
import { addMod } from '../slices/game-slice';

const Shop = () => {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [tempMod, setTempMod] = React.useState<Mod | null>(null);

  const openModal = () => {
    const mod = rollMod();
    setTempMod(mod);
    setModalOpen(true);
  };

  const closeModal = (saveMod: boolean) => {
    if (saveMod) {
      if (!tempMod) throw new Error('Unexpected error: no temp mod to save');
      dispatch(addMod(tempMod));
    }

    setModalOpen(false);
    setTempMod(null);
  };

  return (
    <Card variant='outlined' sx={{m: 2, gap: 0.5, minWidth: 320}}>
      <Button onClick={openModal}>Roll Mod (1 gold)</Button>
      {tempMod ? <RollModal open={modalOpen} mod={tempMod} onClose={closeModal} /> : null}
    </Card>
  );
};

export default Shop;
