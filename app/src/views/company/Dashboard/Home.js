import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from '../../../components/company/Chart';
import EmployeeBox from '../../../components/company/EmployeeBox';
import RecentEmployeeBox from '../../../components/company/RecentEmployeeBox';
import DashboardLayout from '../../../layouts/company/Dashboard.layout';
import { APP_CONFIG } from '../../../config/app';
import axios from 'axios';

export default function Dashboard() {
  const [data, setData] = React.useState({});

  async function getCompanyDashboardData() {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + 'company/dashboard',
      );
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    getCompanyDashboardData();
  }, []);

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
            <Chart data={data.graphData ? data.graphData : []} />
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
            <EmployeeBox
              employeeData={data.employeeBoxData ? data.employeeBoxData : 0}
            />
          </Paper>
        </Grid>
        {/* Recent RecentEmployeeBox */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <RecentEmployeeBox
              employeeData={
                data.recentEmployeeData ? data.recentEmployeeData : []
              }
            />
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
