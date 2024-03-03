import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import DataTable from '../DataTable';

export default function AddItemCategory() {
  const initialCompanyForm = {
    name: '',
    email: '',
    password: '',
  };
  const [companyForm, setCompanyForm] = useState(initialCompanyForm);
  const handleSubmit = async (event) => {
    event.preventDefault();

    let formData = companyForm;
    await axios
      .post(process.env.REACT_APP_BACKEND_URL + '/signup', formData)
      .then((res) => {
        if (res.data.status) {
          alert('Signup Successful!');
          axios.defaults.headers.common = {
            Authorization: `Bearer ${res.data.token}`,
          };
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert(err.response.data.message[0]);
        } else {
          console.log('error : ', err);
          alert('Something Went Wrong!');
        }
      });
  };

  const handleCompanyChange = (e) => {
    setCompanyForm((companyForm) => ({
      ...companyForm,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <DataTable />
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              required
              fullWidth
              id="name"
              label="Name"
              autoFocus
              value={companyForm.name}
              onChange={handleCompanyChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={companyForm.email}
              onChange={handleCompanyChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={companyForm.password}
              onChange={handleCompanyChange}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
      </Box>
    </>
  );
}
