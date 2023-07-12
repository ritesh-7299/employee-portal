import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from '../../../components/company/Chart';
import EmployeeBox from '../../../components/company/EmployeeBox';
import RecentEmployeeBox from '../../../components/company/RecentEmployeeBox';
import DashboardLayout from '../../../layouts/company/Dashboard.layout';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Chart />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <EmployeeBox />
          </Paper>
        </Grid>
        {/* Recent RecentEmployeeBox */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <RecentEmployeeBox />
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
