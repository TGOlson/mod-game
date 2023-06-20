import { Mod, ModAttribute, ModAttributeType } from "./types";

export const rollMod = (level: number): Mod => {
  const attr1 = rollAttr(level);
  const attr2 = randInt(1, 10) === 10 ? rollAttr(level) : null;
  const attr3 = attr2 && randInt(1, 10) === 10 ? rollAttr(level) : null;

  return {
    name: 'Rand Mod', // todo: figure out names
    active: false,
    attrs: [attr1, attr2, attr3],
  };
};

const rollAttr = (level: number): ModAttribute => {
  const modType = attrTypes[randInt(0, attrTypes.length - 1)];

  if (!modType) throw new Error('Unexpected error: no mod type');

  const [min, max] = attrRanges(modType, level);
  const value = randInt(min, max);

  return {type: modType, value};
};

const attrTypes: ModAttributeType[] = ['FLAT_TICK_RATE', 'PERCENT_TICK_RATE', 'FLAT_GOLD_RATE', 'PERCENT_GOLD_RATE'];

const attrRanges = (type: ModAttributeType, _level: number): [number, number] => {
  switch (type) {
    case 'FLAT_TICK_RATE': return [100, 1000];
    case 'PERCENT_TICK_RATE': return [5, 50];
    case 'FLAT_GOLD_RATE': return [100, 1000];
    case 'PERCENT_GOLD_RATE': return [5, 50];
  }
};

const randInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
};
