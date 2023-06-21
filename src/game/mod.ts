import { AttributeSpec, Mod, Attribute } from "./types";

export const rollMod = (): Mod => {
  const base = rollAttr(baseAttributes);
  const prefix = randInt(1, 10) === 10 ? rollAttr(prefixAttributes) : null;
  const adjective = prefix && randInt(1, 10) === 10 ? rollAttr(adjectiveAttributes) : null;

  const name = `${prefix ? prefix.name + ' ' : ''}Mod of ${adjective ? ' ' + adjective.name : ''}${base.name}`;

  return {
    name,
    active: false,
    attrs: [base, prefix, adjective],
  };
};

const rollAttr = (specs: AttributeSpec[]): Attribute => {
  const spec = specs[randInt(0, specs.length - 1)];

  if (!spec) throw new Error('Unexpected index error');
  
  // TODO: think about how to handle differences per level
  const value = spec.values[randInt(0, spec.values.length - 1)];

  if (!value) throw new Error('Unexpected index error');

  return {
    target: spec.target,
    type: spec.type,
    name: spec.name,
    value,
  };
};

const randInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
};


const baseAttributes: AttributeSpec[] = [
  // TODO: this is a fun mod, but probably need to limit to one per game
  // multiple could lead to negative tick rates
  {
    target: 'TICK_FLAT',
    type: 'BASE',
    name: 'Haste',
    values: [100]
  },
  {
    target: 'TICK_RATE',
    type: 'BASE',
    name: 'Speed',
    values: [10, 20, 30, 40, 50]
  },
  {
    target: 'GOLD_FLAT',
    type: 'BASE',
    name: 'Riches',
    values: [500, 1000, 1500, 2000],
  },
  {
    target: 'GOLD_RATE',
    type: 'BASE',
    name: 'Wealth',
    values: [10, 20, 30, 40, 50]
  }
];

const prefixAttributes: AttributeSpec[] = [
  {
    target: 'TICK_RATE',
    type: 'PREFIX',
    name: 'Timely',
    values: [5, 10, 15, 20]
  },
  {
    target: 'GOLD_FLAT',
    type: 'PREFIX',
    name: 'Lavish',
    values: [500, 1000],
  },
  {
    target: 'GOLD_RATE',
    type: 'PREFIX',
    name: 'Elaborate',
    values: [5, 10, 15, 20]
  }
];

const adjectiveAttributes: AttributeSpec[] = [
  {
    target: 'TICK_RATE',
    type: 'ADJECTIVE',
    name: 'Efficient',
    values: [5, 10, 15, 20]
  },
  {
    target: 'GOLD_FLAT',
    type: 'ADJECTIVE',
    name: 'Luxurious',
    values: [500, 1000],
  },
  {
    target: 'GOLD_RATE',
    type: 'ADJECTIVE',
    name: 'Opulent',
    values: [5, 10, 15, 20]
  }
];

// mod design
//
// number of attributes
// - up 3 attributes per mod (increasingly rare)
// - first attr is a base attribute (simple, common)
// - second attr is a prefix (more complex, less common)
// - third attr is an adjective suffix (more complex, less common)
// (eg. barren's mod of glimerring wealth)
// 
// attribute types
// - flat tick rate (can only have so many, maybe start with one, and have one unique later on?)
// - percent tick rate (10-50%, 10% increments)
// - flat gold rate (1-10, maybe increase by level?)
// - percent gold rate (10-50%, 10% increments)
// - x% chance to double gold per tick (10-50%, 10% increments)
