import { useState } from 'react';
import '.././components.css';

function Register({ setCurrent }) {

  const [loginDetails, setLoginDetails] = useState({});
  const [ login, success, error, setError ] = useLogin(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const settings = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(loginDetails),
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ADDRESS}/api/v0/register`, settings);
      const data = await response.json();
      if (response.status === 200) {
        login(data);
        setLoginDetails({});
      } else if (response.status === 409) {
        setError(data.error);
      } else {
        setError(`Oops, something went wrong! Error code: ${response.status}. Please try again or contact us for more information.`);
      }
    } catch (error) {
      setError('Oops, something went wrong! Please try again or contact us for more information.');
    }
  };

  return (
    <>
      <h2>Register</h2>
      { error ? <p className="error">{error}</p> : '' }
      { success ? <p className="success">{success}</p> : '' }
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className='input-container'>
          <i className="bi bi-person"></i>
          <hr />
          <input
            type="text"
            name="name"
            placeholder='Name'
            value={loginDetails.name || ''}
            onChange={(e) => setLoginDetails({ ...loginDetails, name: e.target.value })}
            required
          />
        </div>
        <div className='input-container'>
          <i className="bi bi-envelope"></i>
          <hr />
          <input
            type="text"
            name="email"
            placeholder='Email'
            value={loginDetails.email || ''}
            onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })}
            required
          />
        </div>
        <div className='input-container'>
          <i className="bi bi-phone"></i>
          <hr />
          <input
            type="text"
            name="phone"
            placeholder='Phone'
            value={loginDetails.phone || ''}
            onChange={(e) => setLoginDetails({ ...loginDetails, phone: e.target.value })}
            required
          />
        </div>
        <div className='input-container'>
          <i className="bi bi-lock"></i>
          <hr />
          <input
            type="password"
            name="pwd"
            placeholder='Password'
            value={loginDetails.pwd || ''}
            onChange={(e) => setLoginDetails({ ...loginDetails, pwd: e.target.value })}
            required
          />
        </div>
        <button type="submit" className='btn bg-orange'>Register</button>
      </form>
      <h5>
        Or
        <span className="strong" onClick={() => setCurrent('login')}> login</span>
      </h5>
    </>
  );
}

export default Register;
// import { useState } from 'react';
// import './components.css';
// import jwt_decode from 'jwt-decode';

// function Register({ setCurrent, setLoggedIn, setToggleHide }) {
//   const [loginDetails, setLoginDetails] = useState({});

//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(loginDetails);
//     const settings = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       credentials: 'include',
//       body: JSON.stringify(loginDetails),
//     };
//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_ADDRESS}/api/v0/register`, settings);
//       const data = await response.json();
//       if (response.status === 200) {
//         setError('');
//         if (sessionStorage.getItem('accessToken')) {
//           sessionStorage.removeItem('accessToken');
//         }
//         sessionStorage.setItem('accessToken', data.accessToken);
//         if (localStorage.getItem('expiration')) {
//           localStorage.removeItem('expiration');
//         }
//         const expiration = Date.now() + (12 * 60 * 60 * 1000);
//         localStorage.setItem('expiration', expiration);
//         const user = jwt_decode(data.accessToken);
//         setSuccess(`Welcome ${user.name}! You are logged in.`);
//         setLoggedIn(true);
//         setLoginDetails({});
//         setTimeout(() => {
//           setToggleHide('hidden');
//           setSuccess('');
//           navigate('/admin');
//         }, 1300);
//       } else if (response.status === 409) {
//         setError(data.error);
//       } else {
//         setError(`Oops, something went wrong! Error code: ${response.status}. Please try again or contact us for more information.`);
//       }
//     } catch (error) {
//       setError('Oops, something went wrong! Please try again or contact us for more information.');
//     }
//   };

//   return (
//     <>
//       <h2>Register</h2>
//       { error ? <p className="error">{error}</p> : '' }
//       { success ? <p className="success">{success}</p> : '' }
//       <form onSubmit={(e) => handleSubmit(e)}>
//         <div className='input-container'>
//           <i className="bi bi-person"></i>
//           <hr />
//           <input
//             type="text"
//             name="name"
//             placeholder='Name'
//             value={loginDetails.name || ''}
//             onChange={(e) => setLoginDetails({ ...loginDetails, name: e.target.value })}
//             required
//           />
//         </div>
//         <div className='input-container'>
//           <i className="bi bi-envelope"></i>
//           <hr />
//           <input
//             type="text"
//             name="email"
//             placeholder='Email'
//             value={loginDetails.email || ''}
//             onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })}
//             required
//           />
//         </div>
//         <div className='input-container'>
//           <i className="bi bi-phone"></i>
//           <hr />
//           <input
//             type="text"
//             name="phone"
//             placeholder='Phone'
//             value={loginDetails.phone || ''}
//             onChange={(e) => setLoginDetails({ ...loginDetails, phone: e.target.value })}
//             required
//           />
//         </div>
//         <div className='input-container'>
//           <i className="bi bi-lock"></i>
//           <hr />
//           <input
//             type="password"
//             name="pwd"
//             placeholder='Password'
//             value={loginDetails.pwd || ''}
//             onChange={(e) => setLoginDetails({ ...loginDetails, pwd: e.target.value })}
//             required
//           />
//         </div>
//         <button type="submit" className='btn bg-orange'>Register</button>
//       </form>
//       <h5>
//         Or
//         <span className="strong" onClick={() => setCurrent('login')}> login</span>
//       </h5>
//     </>
//   );
// }

// export default Register;
