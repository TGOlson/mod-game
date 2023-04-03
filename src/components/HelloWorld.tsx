import React from 'react';

import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';


const HelloWorld = () => {
  return (
      <Card sx={{m: 1, width: 300, height: 300}} className="hello-world">
        <Typography>Hello World!</Typography>
      </Card>
  );
};

export default HelloWorld;
