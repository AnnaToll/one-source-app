import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './components.css';
import jwt_decode from 'jwt-decode';
import { useAuthorized } from '../hooks/useAuthorized';
import { useLoginDisplay } from '../hooks/useLoginDisplay';
import useIntro from '../hooks/useIntro';

function Header({  navPages }) {

  const [ loggedIn ] = useAuthorized();
  const [, toggleLoginDisplay ] = useLoginDisplay();
  const { showIntro } = useIntro();
  const navigate = useNavigate();
  const location = useLocation();
  const [headerClass, setHeaderClass] = useState('');
  const [name, setName] = useState('');
  const [linkClass, setLinkClass] = useState([
    'active',
    '',
    '',
    ''
  ]);

  useEffect(() => {
    if (sessionStorage.getItem('accessToken')) {
      const user = jwt_decode(sessionStorage.getItem('accessToken'));
      setName(user.name);
    }


  }, [loggedIn]);

  const handleNavClick = (num) => {
    if (location.pathname !== '/') {
      navigate('/');
    }
    window.removeEventListener('scroll', handleScroll2);
    navPages.current[num].scrollIntoView({ behavior: 'smooth' });
    setClass(num);
    setTimeout(function(){
      window.addEventListener('scroll', handleScroll2);
    }, 1000);
  };

  const setClass = (num) => {
    setLinkClass(prevClass => {
      for (let i = 0; i < linkClass.length; i++) {
        prevClass[i] = '';
      }
      prevClass[num] = 'active';
      return [...prevClass];  
    }); 
  };

  const handleScroll = useCallback(() => {
    const current = window.pageYOffset + 1;
    if ( current > window.innerHeight - 100) {
      setHeaderClass('scrolled-down');
    } else {
      setHeaderClass('');
    }

  }, []);

  const handleScroll2 = useCallback(() => {
    const current = window.pageYOffset + 1;

    if (navPages.current[0].offsetTop <= current && navPages.current[1].offsetTop > current)
      setClass(0);
    else if (navPages.current[1].offsetTop <= current && navPages.current[2].offsetTop > current)
      setClass(1);
    else if (navPages.current[2].offsetTop <= current && navPages.current[3].offsetTop > current)
      setClass(2);
    else
      setClass(3);

  }, []);
  
  useEffect(() => {
    if (location.pathname === '/') {
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('scroll', handleScroll2);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('scroll', handleScroll2);
      };
    }

  }, []);

  const handleClickNavigate = () => {
    navigate('/admin');
  };
  
  return (
    <header className={headerClass}>
      <div id='logo'>
        <div id='logo-one'>1</div>
        <div id='logo-source'>source</div>
      </div>
      <section className='logo-horizontal'>
        <span>1 </span>
        <span>SOURCE</span>
      </section>
      <nav>
        <span onClick={() => handleNavClick(0)} className={ linkClass[0] } >
          Home
        </span>
        <span onClick={() => handleNavClick(1)} className={ linkClass[1] } >
          About
        </span>
        <span onClick={() => handleNavClick(2)} className={ linkClass[2] } >
          The team
        </span>
        <span onClick={() => handleNavClick(3)} className={ linkClass[3] } >
          Contact
        </span>
        {
          loggedIn
          ? 
            <>
              <div className="login-icon-container" onClick={ handleClickNavigate }>
                <span className='user-name'>{ name }</span>
                <i className="bi bi-caret-down-fill" />
              </div>
            </>
          : 
            <div className="login-icon-container" onClick={ toggleLoginDisplay }>
              <i className="bi bi-lock-fill" />
            </div>
          }
          <i className='bi bi-info-circle' onClick={ showIntro }></i>
      </nav>
    </header>
  );
}

export default Header;
