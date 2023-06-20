export type ModAttributeType = 'FLAT_TICK_RATE' | 'PERCENT_TICK_RATE' | 'FLAT_GOLD_RATE' | 'PERCENT_GOLD_RATE';

export type AttributeId 
  = 'TICK_FLAT' 
  | 'TICK_RATE'
  | 'GOLD_FLAT'
  | 'GOLD_RATE';

export type ModAttribute = {
  id: AttributeId;
  name: string;
  prefix: boolean;
  value: number;
};

export type Mod = {
  name: string;
  active: boolean;
  attrs: [ModAttribute, ModAttribute | null, ModAttribute | null];
};
