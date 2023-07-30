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
import { formatDate } from '../../../helpers/formatDate';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function EmployeeTable() {
  const [data, setData] = useState([]);
  const MySwal = withReactContent(Swal);

  async function getData() {
    await axios
      .get(process.env.REACT_APP_BACKEND_URL + 'company/employees/list')
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleBlock(id, type) {
    Swal.fire({
      title: 'Block this user?',
      text: 'You can always unblock this user by re-verifying ',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .put(process.env.REACT_APP_BACKEND_URL + 'company/approve-employee', {
            id: id,
            action: type,
          })
          .then((res) => {
            if (res.data.status) {
              MySwal.fire('User blocked successfully!').then(() => getData());
            } else {
              alert(res.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }

  async function handleDelete(id) {
    MySwal.fire({
      title: 'Delete this user?',
      text: 'User will be deleted permanently. You can not undone this in future.',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then(async () => {
      await axios
        .put(process.env.REACT_APP_BACKEND_URL + 'company/employee/delete', {
          id: id,
        })
        .then((res) => {
          if (res.data.status) {
            MySwal.fire('User deleted successfully!');
            getData();
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
                <TableCell>{formatDate(row.createdAt)}</TableCell>
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
