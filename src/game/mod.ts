import { randInt } from "../util";
import { AttributeSpec, Mod, Attribute } from "./types";

export const rollMod = (level: number): Mod => {
  const base = rollAttr(level, baseAttributes);
  const prefix = randInt(1, 5) === 5 ? rollAttr(level, prefixAttributes) : null;
  const adjective = prefix && randInt(1, 5) === 5 ? rollAttr(level, adjectiveAttributes) : null;

  const name = `${prefix ? prefix.name + ' ' : ''}Mod of ${adjective ? adjective.name + ' ' : ''}${base.name}`;

  const modLevel = Math.max(base.level, prefix?.level ?? 0, adjective?.level ?? 0);

  return {
    name,
    level: modLevel,
    active: false,
    attrs: [base, prefix, adjective],
  };
};

const rollAttr = (level: number, specs: AttributeSpec[]): Attribute => {
  const spec = specs[randInt(0, specs.length - 1)];

  if (!spec) throw new Error('Unexpected index error');
  
  // TODO: think about how to handle differences per level
  const possibleValues = spec.values.filter(v => v.level <= level);

  // TODO: some attrs should only be available at high levels (eg. not all should have a lvl 1 value)
  const roll = possibleValues[randInt(0, possibleValues.length - 1)];

  if (!roll) throw new Error(`Unexpected error: unable to find value for ${spec.name} at level ${level}`);

  return {
    target: spec.target,
    type: spec.type,
    name: spec.name,
    level: roll.level,
    value: roll.value,
  };
};

const baseAttributes: AttributeSpec[] = [
  // TODO: this is a fun mod, but probably need to limit to one per game
  // multiple could lead to negative tick rates
  {
    target: 'GOLD_FLAT',
    type: 'BASE',
    name: 'Riches',
    values: [
      {level: 1, value: 1000}, 
      {level: 1, value: 1500},
      {level: 1, value: 2000},
      {level: 2, value: 3000},
      {level: 2, value: 4000},
      {level: 3, value: 5000},
      {level: 5, value: 7500}
    ],
  },
  {
    target: 'GOLD_RATE',
    type: 'BASE',
    name: 'Wealth',
    values: [
      {level: 1, value: 10}, 
      {level: 1, value: 20},
      {level: 1, value: 30},
      {level: 2, value: 40},
      {level: 2, value: 50},
      {level: 2, value: 75},
      {level: 3, value: 100},
      {level: 5, value: 150}
    ],
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
    values: [
      {level: 1, value: 1000}, 
      {level: 1, value: 1500},
      {level: 2, value: 2000},
      {level: 5, value: 5000}
    ],
  },
  {
    target: 'GOLD_RATE',
    type: 'PREFIX',
    name: 'Elaborate',
    values: [
      {level: 1, value: 10}, 
      {level: 1, value: 15},
      {level: 2, value: 20},
      {level: 5, value: 50}
    ],
  }
];

const adjectiveAttributes: AttributeSpec[] = [
  {
    target: 'GOLD_FLAT',
    type: 'ADJECTIVE',
    name: 'Luxurious',
    values: [
      {level: 1, value: 1000}, 
      {level: 1, value: 1500},
      {level: 2, value: 2000},
      {level: 5, value: 5000}
    ],
  },
  {
    target: 'GOLD_RATE',
    type: 'ADJECTIVE',
    name: 'Opulent',
    values: [
      {level: 1, value: 10}, 
      {level: 1, value: 15},
      {level: 2, value: 20},
      {level: 5, value: 50}
    ],
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
