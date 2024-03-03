import React, { useState } from 'react';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import DashboardLayout from '../../layouts/company/Dashboard.layout';
import BrandList from '../../components/company/BrandList';

export default function Brand() {
  return (
    <DashboardLayout>
      <Box>
        <Typography variant="h5" color="initial">
          Manage your brands
        </Typography>
        <Divider sx={{ my: 1 }} />
        <BrandList />
      </Box>
    </DashboardLayout>
  );
}
