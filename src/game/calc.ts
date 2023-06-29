// import { randInt } from "../util";
import { Mod } from "./types";

export const BASE_GOLD_RATE = 1000; // 1000 milli-gold/sec => 1 gold/sec

export type GoldRateStats = {
  base: number;
  flatIncrease: number;
  percentIncrease: number;
  rate: number;
};

export const calcGoldRate = (mods: Mod[]): GoldRateStats => {
  // TODO: multiple loops are used here
  // this is fine for now, but with lots of mods/attrs could lead to some slowness
  // should be able to refactor this to be a single big loop...
  const attrs = activeAttrs(mods);
  const flatAttrs = attrs.filter(attr => attr.target === 'GOLD_FLAT');
  const rateAttrs = attrs.filter(attr => attr.target === 'GOLD_RATE');

  const flatIncrease = flatAttrs.reduce((acc, {value}) => acc + value, 0);
  const percentIncrease = rateAttrs.reduce((acc, {value}) => acc * (1 + (value / 100)), 1);

  return {
    base: BASE_GOLD_RATE,
    flatIncrease,
    percentIncrease,
    rate: BASE_GOLD_RATE + flatIncrease * percentIncrease,
  };
};

// todo: delete, unused
// export const BASE_TICK_RATE = 1000; // 1 tick/sec

// export const calcTickRate = (mods: Mod[]): number => {
//   const attrs = activeAttrs(mods);
//   const flatAttrs = attrs.filter(attr => attr.target === 'TICK_FLAT');
//   const rateAttrs = attrs.filter(attr => attr.target === 'TICK_RATE');

//   const flatAdjustment = flatAttrs.reduce((acc, {value}) => acc + value, 0);
//   const rateAdjustment = rateAttrs.reduce((acc, {value}) => acc + value, 0);
  
//   // flat first, then rate
//   // TODO: rounding
//   return (BASE_GOLD_RATE - flatAdjustment) * (1 - (rateAdjustment / 100));
// };

export const calcLevel = (goldLifetime: number): number => {
  // gold = 5^lvl * 100
  // lvl = log5(gold / 100)
  return Math.max(Math.floor(Math.log(goldLifetime / 100 / 1000) / Math.log(5)) + 1, 1);
};

export const calcGoldRequiredForLevel = (level: number): number => {
  if (level === 1) return 0;

  return Math.pow(5, level - 1) * 100 * 1000;
};

export const calcModCost = (modsRolled: number): number => {
  return Math.floor((1 + Math.pow(modsRolled, 1.2))) * 1000;
};

export const calcAdditionalActiveCost = (maxModsActive: number): number => {
  return Math.pow(5, maxModsActive - 3) * 500 * 1000;
};

const activeAttrs = (mods: Mod[]) => {
  return mods
    .filter(mod => mod.active)
    .map(mod => mod.attrs).flat().filter(notNull);
};

function notNull<T>(x: T | null): x is T {
  return x !== null;
}
