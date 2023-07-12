import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DashboardLayout from '../../../layouts/company/Dashboard.layout';
import axios from 'axios';
import { APP_CONFIG } from '../../../config/app';
import Button from '@mui/material/Button';

export default function Verification() {
  const [data, setData] = useState([]);

  async function getData() {
    await axios
      .get(APP_CONFIG.BACKEND_URL + 'company/pending-employees/list')
      .then((res) => {
        if (res.data.status) {
          setData(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleApprove(id) {
    await axios
      .put(APP_CONFIG.BACKEND_URL + 'company/approve-employee', {
        id: id,
        action: 'approve',
      })
      .then((res) => {
        if (res.data.status) {
          alert('Request has been approved!');
          getData();
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleReject() {
    alert('Approved!');
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
              <TableCell>Actions</TableCell>
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
                    onClick={() => handleApprove(row._id)}
                    variant="outlined"
                    sx={{ mr: 1 }}
                    color="info"
                  >
                    Approve
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleReject}
                  >
                    Reject
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
