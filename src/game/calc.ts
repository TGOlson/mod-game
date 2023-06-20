import { Mod } from "./types";

export const BASE_GOLD_RATE = 1000; // milli gold/sec => 1 gold/sec

export const calcGoldRate = (mods: Mod[]): number => {
  const activeMods = mods.filter(mod => mod.active);

  const attrs = activeMods.map(mod => mod.attrs).flat();
  const goldRateAttrs = attrs.filter(attr => attr.type === 'GOLD_RATE');

  const flatGoldRateAttrs = goldRateAttrs.map(x => x.value);

  return flatGoldRateAttrs.reduce((acc, val) => acc + val, BASE_GOLD_RATE);
};

export const BASE_TICK_RATE = 1000; // 1 tick/sec

export const calcTickRate = (mods: Mod[]): number => {
  const activeMods = mods.filter(mod => mod.active);

  const attrs = activeMods.map(mod => mod.attrs).flat();
  const tickRateAttrs = attrs.filter(attr => attr.type === 'TICK_RATE');

  const flatTickRateAttrs = tickRateAttrs.map(x => x.value);

  // TODO: this could go to a weird negative value if you have enough flat mods
  // should adjust to maybe only make 1 or two mods flat, and the rest % based
  return flatTickRateAttrs.reduce((acc, val) => acc - val, BASE_TICK_RATE);
};
