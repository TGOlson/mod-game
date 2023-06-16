import React from 'react';

import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';

export type ModAttribute = {
  tickModifier?: number;
  goldModifier?: number;
};

export type ModProps = {
  name: string;
  active: boolean;
  attrs: [ModAttribute]
};

const Mod = ({name, active, attrs}: ModProps) => {
  return (
      <Card variant='outlined' sx={{m: 0.5, gap: 0.5, width: 150, height: 150}} color={active ? 'primary' : undefined}>
        <Typography>{name}</Typography>
        <List size='sm'>
          {attrs.map((attr, index) => (
            <ListItem key={index}>{attr.tickModifier ? `+${(attr.tickModifier || 0) / 1000} tick/sec` : `+${(attr.goldModifier || 0) / 1000} gold/tick`}</ListItem>
          ))}
        </List>
      </Card>
  );
};

export default Mod;
