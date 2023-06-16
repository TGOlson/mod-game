import { applyTicks } from "./slices/ticks-slice";
import { AppStore } from "./store";

export const runGameLoop = (store: AppStore) => {
  let lastTs = 0;
  let frameId = 0;

  const loop = (ts: number) => {
    const tickRate = store.getState().ticks.tickRate;

    if(lastTs === 0) lastTs = ts;

    const deltaMs = ts - lastTs;
    const deltaTicks = Math.floor(deltaMs / tickRate);
    
    if (deltaTicks > 0) {
      console.log('Applying ticks:', deltaTicks);
      store.dispatch(applyTicks(deltaTicks));
      lastTs = ts;
    }
  
    frameId = requestAnimationFrame(loop);
  };

  frameId = requestAnimationFrame(loop);

  const cancel = () => {
    cancelAnimationFrame(frameId);
  };

  return cancel;
};
