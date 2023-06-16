import { Mod } from "./types";

export const BASE_GOLD_RATE = 1000; // milli gold/sec => 1 gold/sec

export const calcGoldRate = (mods: Mod[]): number => {
  const activeMods = mods.filter(mod => mod.active);

  const attrs = activeMods.map(mod => mod.attrs).flat();
  const goldRateAttrs = attrs.filter(attr => attr.type === 'GOLD_RATE');

  const flatGoldRateAttrs = goldRateAttrs.map(x => x.value);

  // TODO: this could go to a weird negative value if you have enough flat mods
  // should adjust to maybe only make 1 or two mods flat, and the rest % based
  return flatGoldRateAttrs.reduce((acc, val) => acc + val, BASE_GOLD_RATE);
};

// export const calcTickRate = (mods: Mod[]) => {
//   const activeMods = mods.filter(mod => mod.active);

//   const activeTickMods = activeMods.filter(mod => mod.attrs.some(attr => attr.type === 'TICK_RATE'));
//   const tickRate = activeTickMods.reduce((acc, mod) => {
//     const tickRateAttr = mod.attrs.find(attr => attr.type === 'TICK_RATE');
//     if(!tickRateAttr) throw new Error(`Unable to find tick rate attribute on mod ${mod.name}`);
//     return acc + tickRateAttr.value;
//   }, 0);

//   return tickRate;
// };
