import React from 'react';
import AppLayout from '../../layouts/employee/App.layout';
import { Grid, Box, Typography, Chip } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function Home() {
  const todayDate = new Date().toLocaleDateString();

  return (
    <AppLayout>
      <Box>
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <div>
            <Chip
              icon={<AccessTimeIcon />}
              sx={{
                fontSize: 17,
                backgroundColor: '#e74a5f',
                color: 'white',
              }}
              label={'check-out in'}
            />
            <span
              style={{
                marginLeft: '4px',
                marginTop: '100px',
                fontWeight: 'bold',
              }}
            >
              08:00 Hr
            </span>
          </div>
          <Chip
            icon={<CalendarMonthOutlinedIcon />}
            sx={{ fontSize: 17 }}
            label={todayDate}
          />
        </Grid>

        <Typography variant="h5" align="center" marginTop={12}>
          This is under construction... We will update you once this feature is
          live
        </Typography>
      </Box>
    </AppLayout>
  );
}
