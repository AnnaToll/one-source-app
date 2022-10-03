
import styles from './admin.css';
import { useNavigate } from 'react-router-dom';
import App from '../App';
import AdminAdm from './AdminAdm';
import AdminDev from './AdminDev';
import AdminSupp from './AdminSupp';
import { Routes, Route, Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import jwt_decode from 'jwt-decode';
import { useEffect } from 'react';

const Admin = ({ setLoggedIn, navPages }) => { 

    const [linkClass, setLinkClass] = useState(0);
    const navigate = useNavigate();
    const [nav, setNav] = useState(() => {
        if (sessionStorage.getItem('accessToken')) {
            const user = jwt_decode(sessionStorage.getItem('accessToken'));
            if (typeof user.accessLevel === 'string') {
                return [user.accessLevel];
            }
            return user.accessLevel;
        }
    });
    const handleClickLogout = async () => {
        sessionStorage.removeItem('accessToken');
        localStorage.removeItem('expiration');
        await fetch(`${process.env.REACT_APP_API_ADDRESS}/api/v0/logout`, { credentials: 'include' });
        setLoggedIn(false);
    };

    useEffect(() => {
        navigate(`/admin/${nav[0]}`);
    }, []);

    return (
        <>
            <App navPages={navPages} />        
            <div className='admin-container'>
                <i className="bi bi-x" onClick={() => {navigate('/');}}></i>
                <aside>
                    {nav.map(access => (
                        <Link 
                            to={`/admin/${access}`} 
                            key={nav.indexOf(access)}
                            onClick={() => setLinkClass(nav.indexOf(access))}
                        > 
                            <p className={ linkClass === nav.indexOf(access) ? 'is-active' : '' }>
                                {access.charAt(0).toUpperCase() + access.slice(1)}
                            </p>
                        </Link>
                    ))}
                    <p onClick={handleClickLogout}>Logout</p>
                </aside>
                <section>
                    <Routes>
                        <Route path='/admin' element={<AdminAdm />} />
                        <Route path='/developer' element={<AdminDev />} />
                        <Route path='/support' element={<AdminSupp />} />
                    </Routes>
                </section>
            </div>
        </>
    );
};

export default Admin;