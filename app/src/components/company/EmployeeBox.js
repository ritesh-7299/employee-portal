import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import axios from 'axios';
import { APP_CONFIG } from '../../config/app';
import { Link } from 'react-router-dom';

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}

export default function EmployeeBox() {
  const [data, setData] = React.useState(0);
  const [currentDate, setCurrentDate] = React.useState(getDate());

  async function getData() {
    await axios
      .get(APP_CONFIG.BACKEND_URL + 'company/total-employees/list')
      .then((res) => {
        if (res.data.status) {
          setData(res.data.data);
        }
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
      <Title>Total Employees</Title>
      <Typography component="p" variant="h4">
        {data}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {currentDate}
      </Typography>
      <div>
        <Link style={{ color: 'inherit' }} to={'/company/verification'}>
          View pending employees
        </Link>
      </div>
    </React.Fragment>
  );
}
