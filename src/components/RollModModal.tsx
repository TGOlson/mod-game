import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import { Mod } from '../game/types';
import ModTile from './ModTile';
import { Box, Button } from '@mui/joy';

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
          <ModTile index={-1} mod={mod} />
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
