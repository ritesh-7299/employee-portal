import React from 'react';
import { Route } from 'react-router-dom';
const EmployeeDashboard = React.lazy(() => import('../views/employee/Home'));

export default (
  <>
    <Route path="/employee/dashboard" Component={EmployeeDashboard} />
  </>
);
