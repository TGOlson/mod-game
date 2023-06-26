import { randInt } from "../util";
import { AttributeSpec, Mod, Attribute } from "./types";

export const rollMod = (level: number): Mod => {
  const base = rollAttr(baseAttributes);
  const prefix = randInt(1, 5) === 5 ? rollAttr(prefixAttributes) : null;
  const adjective = prefix && randInt(1, 5) === 5 ? rollAttr(adjectiveAttributes) : null;

  const name = `${prefix ? prefix.name + ' ' : ''}Mod of ${adjective ? adjective.name + ' ' : ''}${base.name}`;

  return {
    name,
    level,
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

const baseAttributes: AttributeSpec[] = [
  // TODO: this is a fun mod, but probably need to limit to one per game
  // multiple could lead to negative tick rates
  {
    target: 'GOLD_FLAT',
    type: 'BASE',
    name: 'Riches',
    values: [1000, 1500, 2000, 2500, 3000],
  },
  {
    target: 'GOLD_RATE',
    type: 'BASE',
    name: 'Wealth',
    values: [50, 75, 100, 125, 150]
  }
];

const prefixAttributes: AttributeSpec[] = [
  // {
  //   target: 'GOLD_10X_CHANCE',
  //   type: 'PREFIX',
  //   name: 'Lucky',
  //   values: [10, 20, 30]
  // },
  {
    target: 'GOLD_FLAT',
    type: 'PREFIX',
    name: 'Lavish',
    values: [1000, 1500, 2000],
  },
  {
    target: 'GOLD_RATE',
    type: 'PREFIX',
    name: 'Elaborate',
    values: [25, 50, 75]
  }
];

const adjectiveAttributes: AttributeSpec[] = [
  {
    target: 'GOLD_FLAT',
    type: 'ADJECTIVE',
    name: 'Luxurious',
    values: [1000, 1500, 2000],
  },
  {
    target: 'GOLD_RATE',
    type: 'ADJECTIVE',
    name: 'Opulent',
    values: [25, 50, 75]
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
