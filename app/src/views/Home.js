import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

export default function Home() {
  let navigate = useNavigate();
  useEffect(() => {
    switch (localStorage.getItem('role')) {
      case 'company':
        navigate('/company/dashboard');
        break;

      case 'employee':
        navigate('/employee/dashboard');
        break;

      default:
        navigate('/login');
        break;
    }
  });

  return <Loading />;
}
