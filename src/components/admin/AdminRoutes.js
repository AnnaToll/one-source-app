import { Navigate, Outlet } from 'react-router-dom';
import { useAuthorized } from '../../hooks/useAuthorized';


const AdminRoutes = () => {

  const [loggedIn] = useAuthorized(); 
    
  return (
    loggedIn ? <Outlet /> : <Navigate to='/'/>
  );
};

export default AdminRoutes;