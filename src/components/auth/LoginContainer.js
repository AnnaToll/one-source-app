import { useState, useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import '.././components.css';
import { useLoginDisplay } from '../../hooks/useLoginDisplay';

function LoginContainer() {
  const [loginDisplay, toggleLoginDisplay ] = useLoginDisplay();
  const [current, setCurrent] = useState('login');

  console.log(loginDisplay);

  return (
    <div className={`${ loginDisplay } dark-fs`}>
      <div onClick={ toggleLoginDisplay } className="fs" />
      <section className="login-container">
        {
          current === 'login' ? 
          <Login setCurrent={ setCurrent }  />
          : 
          <Register setCurrent={ setCurrent } />
        }
      </section>
    </div>
  );
}

export default LoginContainer;
