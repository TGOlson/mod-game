import React from 'react';

import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';

import { decrement, increment } from '../slices/counter-slice';
import { useAppDispatch, useAppSelector } from '../hooks';


const HelloWorld = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
      <Card variant='outlined' sx={{m: 2, gap: 2, width: 320, height: 300}}>
        <Typography level='h3'>Hello World!</Typography>
        <Typography>Count: {count}</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button size='sm' onClick={() => dispatch(increment())}>Add 1</Button>
          <Button size='sm' onClick={() => dispatch(decrement())}>Sub 1</Button>
        </Box>
      </Card>
  );
};

export default HelloWorld;
