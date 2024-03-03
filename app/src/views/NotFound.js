import { Button, Stack } from '@mui/material';
import React from 'react';
import notFound from '../assets/notfound.jpg';
export default function NotFound() {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ width: 1, height: '100vh' }}
    >
      <img src={notFound} style={{ height: 500 }} />
    </Stack>
  );
}
