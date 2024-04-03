import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

const DynamicCard = ({ title, children }) => {
  return (
    <Card variant="outlined" sx={{ width: '100%', boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ fontWeight: '400', color:"grey", marginBottom: 2, textAlign:"left", padding:"2px" }}>
          {title}
        </Typography>
        <hr style={{margin:"-20px", border:"solid 0.5px #d3d0d0"}}></hr>
        {children}
      </CardContent>
    </Card>
  );
};

export default DynamicCard;
