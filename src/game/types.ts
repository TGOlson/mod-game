export type AttributeTarget 
  = 'TICK_FLAT' // unused
  | 'TICK_RATE' // unused
  | 'GOLD_RATE' 
  | 'GOLD_FLAT'
  | 'GOLD_10X_CHANCE'; // unused

export type AttributeType = 'BASE' | 'PREFIX' | 'ADJECTIVE';

export type Attribute = {
  target: AttributeTarget;
  type: AttributeType
  name: string;
  level: number;
  value: number;
};

export type AttributeSpec = {
  target: AttributeTarget;
  type: AttributeType
  name: string;
  values: {level: number, value: number}[];
};

export type Mod = {
  name: string;
  active: boolean;
  level: number;
  attrs: [Attribute, Attribute | null, Attribute | null];
};
