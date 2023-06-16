export type ModAttrType = 'TICK_RATE' | 'GOLD_RATE';

export type ModAttribute = {
  type: ModAttrType;
  value: number;
};

export type Mod = {
  name: string;
  active: boolean;
  attrs: [ModAttribute]
};
