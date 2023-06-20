export type ModAttributeType = 'FLAT_TICK_RATE' | 'PERCENT_TICK_RATE' | 'FLAT_GOLD_RATE' | 'PERCENT_GOLD_RATE';

export type ModAttribute = {type: ModAttributeType, value: number};

export type Mod = {
  name: string;
  active: boolean;
  attrs: [ModAttribute, ModAttribute | null, ModAttribute | null];
};
