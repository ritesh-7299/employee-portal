import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function Home() {
  let navigate = useNavigate();
  function logout() {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <div>
      <center>
        Employee Home
        <br />
        <br />
        <Button onClick={logout} variant="contained" color="error">
          Logout
        </Button>
      </center>
    </div>
  );
}
