import { AttributeId, Mod, ModAttribute } from "./types";

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
  const spec = attributeSpecs[randInt(0, attributeSpecs.length - 1)];

  if (!spec) throw new Error('Unexpected error: no mod type');
  
  // TODO: think there is a bug here where this will only find level 1 ranges
  const range = spec.ranges.find(range => range.minLevel <= level);

  if (!range) throw new Error('Unexpected error: no mod range');
  
  // const [min, max] = attrRanges(spec, level);
  const value = randInt(range.minValue, range.maxValue);

  return {
    id: spec.id,
    name: spec.name,
    prefix: spec.prefix,
    value,
  };
};

const randInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
};

export type AttributeRange = {
  minLevel: number;
  minValue: number;
  maxValue: number;
};

export type AttributeSpec = {
  id: AttributeId;
  name: string;
  prefix: boolean;
  ranges: AttributeRange[];
  resolution: number;
  frequency: 1 | 2 | 3;
};

const attributeSpecs: AttributeSpec[] = [
  {
    id: 'TICK_FLAT',
    name: 'Speed',
    prefix: false,
    ranges: [
      {minLevel: 1, minValue: 1, maxValue: 100},
    ],
    resolution: 1,
    frequency: 1,
  },
  {
    id: 'TICK_RATE',
    name: 'Quick',
    prefix: true,
    ranges: [
      {minLevel: 1, minValue: 5, maxValue: 50},
    ],
    resolution: 1,
    frequency: 1,
  },
  {
    id: 'GOLD_FLAT',
    name: 'Rich',
    prefix: true,
    ranges: [
      {minLevel: 1, minValue: 100, maxValue: 1000},
    ],
    resolution: 1,
    frequency: 1,
  },
  {
    id: 'GOLD_RATE',
    name: 'Wealth',
    prefix: false,
    ranges: [
      {minLevel: 1, minValue: 5, maxValue: 50},
    ],
    resolution: 1,
    frequency: 1,
  }
];
