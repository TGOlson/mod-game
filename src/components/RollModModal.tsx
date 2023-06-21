import * as React from 'react';

import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';

import { Mod } from '../game/types';
import ModTile from './ModTile';

type RollModModalProps = {
  open: boolean;
  mod: Mod;
  onClose: (saveMod: boolean) => void;
};

const RollModModal = ({open, mod, onClose}: RollModModalProps) => {
  return (
    <Modal open={open}>
      <ModalDialog
        layout="center"
        size="md"
        variant="outlined"
      >
        <Typography>You rolled a new mod!</Typography>
        <Box sx={{mt: 2, gap: 2, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <ModTile mod={mod} />
          <Box sx={{display: 'flex', gap: 1}}>
            <Button onClick={() => onClose(true)}>Keep</Button>
            <Button color='danger' onClick={() => onClose(false)}>Discard</Button>
          </Box>
        </Box>
      </ModalDialog>
    </Modal>
  );
};

export default RollModModal;
