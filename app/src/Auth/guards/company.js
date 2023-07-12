import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedCompanyRoute = () => {
  // const role = useSelector((state) => state.role);
  const role = localStorage.getItem('role');
  const isCompany = role === 'company' ? true : null;

  return isCompany ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedCompanyRoute;
