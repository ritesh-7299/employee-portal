import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Stack } from '@mui/material';

export default function Loading() {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ width: 1, height: '100vh' }}
    >
      <CircularProgress />
    </Stack>
  );
}
