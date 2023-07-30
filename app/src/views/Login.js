import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CopyRight from '../components/CopyRight';
import { FormHelperText, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { APP_CONFIG } from '../config/app';
import { useDispatch } from 'react-redux';
import { setAuthRole } from '../redux/authSlice';
import logo from '../assets/logo.png';

export default function Login() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'employee',
  });

  const handleChange = (e) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(process.env.REACT_APP_BACKEND_URL + 'auth/login', form)
      .then((res) => {
        if (res.data.status) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('role', form.role);
          dispatch(setAuthRole(form.role));

          axios.defaults.headers.common = {
            Authorization: `Bearer ${res.data.token}`,
          };

          navigate('/' + form.role + '/dashboard', { replace: true });
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status === 400) {
          alert(err.response.data.message[0]);
        } else {
          alert('Something Went Wrong!');
        }
      });
  };

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
        <img height={50} src={logo} />
        <Typography component="h1" variant="h5">
          Login
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={form.email}
                onChange={handleChange}
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
                value={form.password}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <FormHelperText>Select role *</FormHelperText>
              <Select
                required
                fullWidth
                labelId="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                id="role"
                label="Role"
              >
                {[
                  { id: 'employee', name: 'Employee' },
                  { id: 'company', name: 'Company' },
                ].map((item, key) => {
                  return (
                    <MenuItem key={key} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/signup" variant="body2">
                Don't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <CopyRight sx={{ mt: 5 }} />
    </Container>
  );
}
