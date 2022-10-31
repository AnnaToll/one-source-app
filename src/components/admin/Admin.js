
import styles from './admin.css';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import App from '../../App';
import AdminAdm from './AdminAdm';
import AdminDev from './AdminDev';
import AdminSupp from './AdminSupp';
import jwt_decode from 'jwt-decode';
import { useAuthorized } from '../../hooks/useAuthorized';
import { SocketContext } from '../../providers/SocketProvider';

const Admin = ({ navPages }) => {

    const [, setLoggedIn ] = useAuthorized();
    const { socketAdm } = useContext(SocketContext);
    const [linkClass, setLinkClass] = useState(0);
    const navigate = useNavigate();
    const [nav] = useState(() => {
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
                    {nav.map((access, index) => (
                        <Link 
                            to={`/admin/${access}`} 
                            key={index}
                            onClick={() => setLinkClass(index)}
                        > 
                            <p className={ linkClass === index ? 'is-active' : '' }>
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
                        <Route path='/support' element={
                            socketAdm.connected && <AdminSupp socket={ socketAdm } />} 
                        />
                    </Routes>
                </section>
            </div>
        </>
    );
};

export default Admin;