import React from 'react';
import { Route } from 'react-router-dom';
const CompanyDashboard = React.lazy(() =>
  import('../views/company/Dashboard/Home'),
);
const EmployeeTable = React.lazy(() =>
  import('../views/company/Dashboard/Employee'),
);
const Verification = React.lazy(() =>
  import('../views/company/Dashboard/Verification'),
);

export default (
  <>
    <Route path="/company/dashboard" Component={CompanyDashboard} />
    <Route path="/company/employee" Component={EmployeeTable} />
    <Route path="/company/verification" Component={Verification} />
  </>
);
