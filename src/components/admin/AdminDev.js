import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const AdminDev = ({ checkExpiration, getNewToken }) => { 

    return (
        !jwt_decode(sessionStorage.getItem('accessToken')).accessLevel.includes('developer')
        ?
            <Navigate to='/admin'/>
        :
        <>
            <h2>Super secret projects</h2>
        </>
    );
};

export default AdminDev;