import { canRollNewMod, closeRollModModal, openRollModModal } from "../slices/game-slice";
import { AppStore } from "../store";

const isKey = (e: KeyboardEvent, key: string) => e.key === key || e.key === key.toUpperCase();

export const handleKeyPress = (store: AppStore) => {
  window.addEventListener('keyup', (e) => {
    console.log('Keypress', e.key);

    const {game} = store.getState();

    if (isKey(e, 'r')) {
      if (canRollNewMod(game)) store.dispatch(openRollModModal());
    }
    
    if (isKey(e, 'Enter') && game.rollModModalOpen) {
      store.dispatch(closeRollModModal(true));
    }
    
    if (isKey(e, 'd') && game.rollModModalOpen) {
      store.dispatch(closeRollModModal(false));
    }
  });
};
