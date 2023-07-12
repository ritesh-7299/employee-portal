import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BlockIcon from '@mui/icons-material/Block';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DashboardLayout from '../../../layouts/company/Dashboard.layout';
import axios from 'axios';
import { APP_CONFIG } from '../../../config/app';
import Button from '@mui/material/Button';

export default function EmployeeTable() {
  const [data, setData] = useState([]);

  async function getData() {
    await axios
      .get(APP_CONFIG.BACKEND_URL + 'company/employees/list')
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleBlock(id, type) {
    await axios
      .put(APP_CONFIG.BACKEND_URL + 'company/approve-employee', {
        id: id,
        action: type,
      })
      .then((res) => {
        if (res.data.status) {
          alert(
            'Employee has been blocked. You can unblock them by re-verifying them.',
          );
          getData();
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleDelete(id) {
    await axios
      .put(APP_CONFIG.BACKEND_URL + 'company/employee/delete', {
        id: id,
      })
      .then((res) => {
        if (res.data.status) {
          alert('Employee has been deleted. ');
          getData();
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <DashboardLayout>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date of joining</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Verified</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.createdAt}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.isVerified ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    sx={{ mr: 1 }}
                    size="small"
                    color="info"
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mr: 1 }}
                    color="error"
                    onClick={() => handleBlock(row._id, 'block')}
                  >
                    <BlockIcon />
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => handleDelete(row._id)}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardLayout>
  );
}
