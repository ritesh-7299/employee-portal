import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CopyRight from '../components/CopyRight';
import { FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import e from 'express';

export default function SignUp() {
  const [type, setType] = useState('employee');
  const [companyList, setCompanyList] = useState([]);
  const [companyForm, setCompanyForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [employeeForm, setEmployeeForm] = useState({
    name: '',
    email: '',
    company_id: '',
    password: '',
  });

  const getCompanyList = async () => {
    if (companyList.length < 1) {
      await axios
        .get('http://127.0.0.1:8000/company/user/list')
        .then((res) => {
          setCompanyList(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleEmployeeChange = (e) => {
    setEmployeeForm((employeeForm) => ({
      ...employeeForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCompanyChange = (e) => {
    setCompanyForm((companyForm) => ({
      ...companyForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    getCompanyList();
  }, [companyList]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up as {type}
        </Typography>
        <Grid container sx={{ mt: 0 }} spacing={3}>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant={type === 'employee' ? 'contained' : 'outlined'}
              onClick={() => setType('employee')}
            >
              Employee
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant={type === 'company' ? 'contained' : 'outlined'}
              onClick={() => setType('company')}
            >
              Company
            </Button>
          </Grid>
        </Grid>
        {type === 'employee' ? (
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={employeeForm.name}
                  onChange={handleEmployeeChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={employeeForm.email}
                  onChange={handleEmployeeChange}
                />
              </Grid>

              <Grid item xs={12}>
                <FormHelperText>Select company *</FormHelperText>
                <Select
                  required
                  fullWidth
                  labelId="company"
                  name="company_id"
                  value={employeeForm.company_id}
                  onChange={handleEmployeeChange}
                  id="company"
                  label="Company"
                >
                  {companyList.map((item, key) => {
                    return (
                      <MenuItem key={key} value={item._id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={employeeForm.password}
                  onChange={handleEmployeeChange}
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
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
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
                  value={companyForm.name}
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
                  value={companyForm.name}
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
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
      <CopyRight sx={{ mt: 5 }} />
    </Container>
  );
}
