import { Mod } from "./types";

export const BASE_GOLD_RATE = 1000; // milli gold/sec => 1 gold/sec

export const calcGoldRate = (mods: Mod[]): number => {
  const attrs = activeAttrs(mods);
  const flatAttrs = attrs.filter(attr => attr.target === 'GOLD_FLAT');
  const rateAttrs = attrs.filter(attr => attr.target === 'GOLD_RATE');

  const flatAdjustment = flatAttrs.reduce((acc, {value}) => acc + value, 0);
  const rateAdjustment = rateAttrs.reduce((acc, {value}) => acc + value, 0);
  
  // flat first, then rate
  // TODO: rounding
  return (BASE_GOLD_RATE + flatAdjustment) * (1 + (rateAdjustment / 100));
};

export const BASE_TICK_RATE = 1000; // 1 tick/sec

export const calcTickRate = (mods: Mod[]): number => {
  const attrs = activeAttrs(mods);
  const flatAttrs = attrs.filter(attr => attr.target === 'TICK_FLAT');
  const rateAttrs = attrs.filter(attr => attr.target === 'TICK_RATE');

  const flatAdjustment = flatAttrs.reduce((acc, {value}) => acc + value, 0);
  const rateAdjustment = rateAttrs.reduce((acc, {value}) => acc + value, 0);
  
  // flat first, then rate
  // TODO: rounding
  return (BASE_GOLD_RATE - flatAdjustment) * (1 - (rateAdjustment / 100));
};

export const calcModCost = (modsRolled: number): number => {
  return (1 + modsRolled * modsRolled) * 1000;
};

const activeAttrs = (mods: Mod[]) => {
  return mods
    .filter(mod => mod.active)
    .map(mod => mod.attrs).flat().filter(notNull);
};

function notNull<T>(x: T | null): x is T {
  return x !== null;
}
