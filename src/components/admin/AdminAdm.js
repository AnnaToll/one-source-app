import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useState } from 'react';
import { useJWT } from '../../hooks/useJWT';

const AdminAdm = () => { 

    const [addAccessDetails, setAddAccessDetails] = useState({});
    const [removeAccessDetails, setRemoveAccessDetails] = useState({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [ checkExpiration ] = useJWT();

    const handleClickDeleteCookies = async () => {
        await fetch(`${process.env.REACT_APP_API_ADDRESS}/api/v0/admin/delete-cookies`, { credentials: 'include' });
    };

    const handleClickAccess = async (e, details, type) => {
        e.preventDefault();
        const accessLevel = details.accessLevel;
        if (accessLevel !== 'admin' && accessLevel !== 'developer' && accessLevel !== 'support') {
            setError('Not valid access type');
            return;
        }
        setError('');
        checkExpiration();
        const settings = {
            method: 'PATCH',
            credentials: 'include',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify(details),
        };
        try {
            let response = {};
            if (type === 'add') {
                response = await fetch(`${process.env.REACT_APP_API_ADDRESS}/api/v0/admin/add-access`, settings);
            } else {
                response = await fetch(`${process.env.REACT_APP_API_ADDRESS}/api/v0/admin/remove-access`, settings);
            }
            const data = await response.json();
            if (response.status !== 200) {
                setError(data.error);
            }
            else {
                setError('');
                setSuccess(data.success);
                setTimeout(() => {
                    setSuccess('');
                }, 2000);
            }
        } catch (error) {
            setError('Oops, something went wrong! Please try again or contact us for more information.');
        }
    };

    return (
        !jwt_decode(sessionStorage.getItem('accessToken')).accessLevel.includes('admin')
        ?
            <Navigate to='/admin'/>
        :
        <>
            <h2>Admin</h2>
            { error ? <p className="error">{error}</p> : '' }
            { success ?  <p className="success">{success}</p> : '' }
            <section className='admin-content-container'>               
                <h3 className='green'>Access</h3>
                <section>
                    <div>
                        <h5 className='gray'>Add access</h5>
                        <form>
                            <p>Email</p>
                            <input 
                                type="email" 
                                value={addAccessDetails.email || ''}
                                onChange={(e) => setAddAccessDetails({...addAccessDetails, email: e.target.value})}
                            />
                            <p>Access type</p>
                            <input 
                                type="text"
                                value={addAccessDetails.accessLevel || ''}
                                onChange={(e) => setAddAccessDetails({...addAccessDetails, accessLevel: e.target.value})}
                                placeholder='developer, support or admin'
                            />
                            <button onClick={(e) => handleClickAccess(e, addAccessDetails, 'add')} className='btn bg-grey top-s pad-s'>Add</button>
                        </form>
                    </div>
                    <div>
                        <h5 className='gray'>Remove access</h5>
                        <form>
                            <p>Email</p>
                            <input 
                                type="email" 
                                value={removeAccessDetails.email || ''}
                                onChange={(e) => setRemoveAccessDetails({...removeAccessDetails, email: e.target.value})}
                            />
                            <p>Access type</p>
                            <input 
                                type="text"
                                value={removeAccessDetails.accessLevel || ''}
                                onChange={(e) => setRemoveAccessDetails({...removeAccessDetails, accessLevel: e.target.value})} 
                                placeholder='developer, support or admin'
                            />
                            <button onClick={(e) => handleClickAccess(e, removeAccessDetails, 'remove')} className='btn bg-grey top-s pad-s'>Remove</button>
                        </form>
                    </div>
                </section>
                <hr />
                <button onClick={ handleClickDeleteCookies } className='btn bg-grey'>Clear all Cookies</button>
            </section>
        </>
    );
};

export default AdminAdm;