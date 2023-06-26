import { applyDelta } from "../slices/game-slice";
import { AppStore } from "../store";

export const runGameLoop = (store: AppStore) => {
  let lastTs = 0;
  let frameId = 0;

  const loop = (ts: number) => {
    if(lastTs === 0) lastTs = ts;

    const deltaMs = ts - lastTs;

    store.dispatch(applyDelta(deltaMs));
    lastTs = ts;

    frameId = requestAnimationFrame(loop);
  };

  frameId = requestAnimationFrame(loop);

  const cancel = () => {
    cancelAnimationFrame(frameId);
  };

  return cancel;
};
