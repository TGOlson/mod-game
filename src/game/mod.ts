import { Mod } from "./types";

export const rollMod = (_level: number): Mod => {
  const mod: Mod = {
    name: 'Test Mod',
    active: false,
    attrs: [
      {
        type: 'TICK_RATE',
        value: 100,
      },
      {
        type: 'GOLD_RATE',
        value: 100,
      },
    ],
  };

  return mod;
};
