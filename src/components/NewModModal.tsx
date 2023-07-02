import * as React from 'react';

import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';

import { Mod } from '../game/types';
import ModTile from './ModTile';

type NewModModalProps = {
  open: boolean;
  mod: Mod;
  onClose: (saveMod: boolean) => void;
};

const NewModModal = ({open, mod, onClose}: NewModModalProps) => {
  return (
    <Modal open={open} hideBackdrop={true}>
      <ModalDialog
        layout="center"
        size="md"
        variant="outlined"
      >
        <Typography fontSize='lg' fontWeight='lg'>You rolled a new mod!</Typography>
        <Typography sx={{mt: 0.5}} level='body3'>Mod attributes are random. If this mod looks useful, you can keep it and add it to your stash. If it's no good, discard it and roll another!</Typography>
        <Divider sx={{mt: 1}} inset="none" />
        <Box sx={{mt: 4, gap: 2, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <ModTile expanded mod={mod} />
        </Box>
        <Divider inset='none' sx={{mt: 4}}/>
        <Box sx={{mt: 2, gap: 1, display: 'flex',  flexDirection: { xs: 'column', sm: 'row-reverse' }}}>
          <Button onClick={() => onClose(true)}>Add to Stash (Enter)</Button>
          <Button variant='outlined' color='danger' onClick={() => onClose(false)}>Discard (D)</Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
};

export default NewModModal;
