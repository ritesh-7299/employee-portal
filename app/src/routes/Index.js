import React, { Suspense } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import EmployeeRoutes from './employee';
import CompanyRoutes from './company';
import ProtectedEmployeeRoute from '../Auth/guards/employee';
import ProtectedCompanyRoute from '../Auth/guards/company';
import Loading from '../components/Loading';
const Home = React.lazy(() => import('../views/Home'));
const Login = React.lazy(() => import('../views/Login'));
const Signup = React.lazy(() => import('../views/Signup'));
const NotFound = React.lazy(() => import('../views/NotFound'));

export default function Index() {
  return (
    <Suspense
      fallback={
        <div>
          <Loading />
        </div>
      }
    >
      <Router>
        <Routes>
          <Route path="/" Component={Home} exact />
          <Route path="/login" Component={Login} />
          <Route path="/signup" Component={Signup} />
          <Route path="*" Component={NotFound} />

          {/* Company protected routes */}

          <Route path="/company" Component={ProtectedCompanyRoute}>
            {CompanyRoutes}
          </Route>

          {/* Employee protected routes */}
          <Route path="/employee" Component={ProtectedEmployeeRoute}>
            {EmployeeRoutes}
          </Route>
        </Routes>
      </Router>
    </Suspense>
  );
}
