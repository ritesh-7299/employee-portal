import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { Link } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}

export default function EmployeeBox({ employeeData }) {
  const [currentDate, setCurrentDate] = React.useState(getDate());

  return (
    <React.Fragment>
      {!employeeData ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          No data found
        </Box>
      ) : (
        <>
          <Title>Total Employees</Title>
          <Typography component="p" variant="h4">
            {employeeData}
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            on {currentDate}
          </Typography>
          <div>
            <Link style={{ color: 'inherit' }} to={'/company/verification'}>
              View pending employees
            </Link>
          </div>{' '}
        </>
      )}
    </React.Fragment>
  );
}
