export type AttributeTarget = 'TICK_FLAT' | 'TICK_RATE' | 'GOLD_RATE' | 'GOLD_FLAT';
export type AttributeType = 'BASE' | 'PREFIX' | 'ADJECTIVE';

export type Attribute = {
  target: AttributeTarget;
  type: AttributeType
  name: string;
  value: number;
};

export type AttributeSpec = {
  target: AttributeTarget;
  type: AttributeType
  name: string;
  values: number[];
};

export type Mod = {
  name: string;
  active: boolean;
  attrs: [Attribute, Attribute | null, Attribute | null];
};
