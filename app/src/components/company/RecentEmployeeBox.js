import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Link } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { formatDate } from '../../helpers/formatDate';

export default function RecentEmployeeBox({ employeeData }) {
  return (
    <React.Fragment>
      {!employeeData.length ? (
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
          <Title>Recent Employees</Title>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Verified</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employeeData.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{formatDate(row.createdAt)}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.isVerified ? 'Yes' : 'No'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Link style={{ textDecoration: 'none' }} to={'/company/employee'}>
            <Typography color="primary" sx={{ mt: 3 }}>
              See more employees
            </Typography>
          </Link>
        </>
      )}
    </React.Fragment>
  );
}
