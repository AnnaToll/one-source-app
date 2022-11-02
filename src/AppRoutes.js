import React, { useRef, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Header from './components/Header';
import LoginContainer from './components/auth/LoginContainer';
import AdminRoutes from './components/admin/AdminRoutes';
import Admin from './components/admin/Admin';
import { useAuthorized } from './hooks/useAuthorized';
import { useJWT } from './hooks/useJWT';
import Intro from './components/Intro';

function AppRoutes() {

  const [ loggedIn ] = useAuthorized();
  const [ checkExpiration, checkExpirationTimeout ] = useJWT();
  const navPages = useRef([]);

  
  useEffect(() => {
   
    checkExpiration();
  
  }, []);


  useEffect(() => {

    if (loggedIn === true) {
      checkExpirationTimeout();
    } else {
      clearTimeout(checkExpirationTimeout);
    }

    return () => {
      clearTimeout(checkExpirationTimeout);
    };

  }, [loggedIn]);


  return (
      <Router>    
        <Intro />
        <LoginContainer />
        <Header navPages={navPages} />
          <Routes>
            <Route path='/' element={<App navPages={navPages} />} />
            <Route element={<AdminRoutes />}>
                <Route path='/admin/*' element={ <Admin navPages={ navPages } />} />
            </Route>          
          </Routes>
      </Router>
  );
}

export default AppRoutes;
