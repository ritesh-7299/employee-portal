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
const CustomForm = React.lazy(() =>
  import('../views/company/Dashboard/CustomForm'),
);
const Inventory = React.lazy(() => import('../views/company/Inventory'));
const Brand = React.lazy(() => import('../views/company/Brand'));

export default (
  <>
    <Route path="/company/dashboard" Component={CompanyDashboard} />
    <Route path="/company/employee" Component={EmployeeTable} />
    <Route path="/company/verification" Component={Verification} />
    <Route path="/company/custom-form" Component={CustomForm} />
    <Route path="/company/inventory" Component={Inventory} />
    <Route path="/company/brand" Component={Brand} />
  </>
);
