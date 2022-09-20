<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
import { Link } from 'react-router-dom';
import { useState } from 'react';
>>>>>>> 6fc0ef375da8c70a37e956f8018cad706b1d01ef

function Header({ handleClick, user, setUser }) {
  return (
    <header>
      <img className="logo" src={require('../img/logo.png')} />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/team">The team</Link>
        <Link to="/contact">Contact</Link>
        {
                    user
                      ? (
                        <div>
                          Hi
                          {user.name}
                          !  |
                          <span onClick={() => setUser(null)}>Logout</span>
                        </div>
                      )
                      : (
                        <div className="login-icon-container" onClick={handleClick}>
                          <i className="bi bi-person-circle" />
                        </div>
                      )
                }
      </nav>
    </header>
  );
}

export default Header;
