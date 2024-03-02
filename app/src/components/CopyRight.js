import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export default function CopyRight(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <a
        target="_blank"
        color="inherit"
        href="https://www.linkedin.com/in/ritesh-macwan-8a70891ba/"
      >
        Ritesh Macwan
      </a>{' '}
      {'2023'}
      {'.'}
    </Typography>
  );
}
