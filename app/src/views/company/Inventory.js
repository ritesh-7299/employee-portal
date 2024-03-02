import React, { useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import DashboardLayout from '../../layouts/company/Dashboard.layout';

export default function Inventory() {
  return (
    <DashboardLayout>
      <Box>
        <Typography variant="h4" color="initial">
          Manage your inventory from here
        </Typography>
        <Divider sx={{ my: 1 }} />
        Coming soon... We will email you once we are ready with this feature
        until then stay tuned!
      </Box>
    </DashboardLayout>
  );
}
