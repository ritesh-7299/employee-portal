import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import axios from 'axios';
import { APP_CONFIG } from '../../config/app';

// Generate Order Data
function createData(id, date, name, age, city) {
  return { id, date, name, age, city };
}

export default function RecentEmployeeBox() {
  const [data, setData] = React.useState([]);

  async function getData() {
    await axios
      .get(APP_CONFIG.BACKEND_URL + 'company/recent-employees/list')
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  React.useEffect(() => {
    getData();
  }, []);

  return (
    <React.Fragment>
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
          {data.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.createdAt}</TableCell>
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
    </React.Fragment>
  );
}
