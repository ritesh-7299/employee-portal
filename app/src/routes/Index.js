import React, { Suspense } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
const Home = React.lazy(() => import('../views/Home'));
const Login = React.lazy(() => import('../views/Login'));
const Signup = React.lazy(() => import('../views/Signup'));
const NotFound = React.lazy(() => import('../views/NotFound'));

export default function Index() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route path="/" Component={Home} exact />
          <Route path="/login" Component={Login} />
          <Route path="/signup" Component={Signup} />
          <Route path="*" Component={NotFound} />
        </Routes>
      </Router>
    </Suspense>
  );
}
