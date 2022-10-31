import { useState } from 'react';
import '.././components.css';
import { useLogin } from '../../hooks/useLogin';

function Login({ setCurrent }) {

  const [loginDetails, setLoginDetails] = useState({});
  const [ login, success, error, setError ] = useLogin(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const settings = {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginDetails),
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ADDRESS}/api/v0/authorize`, settings);
      const data = await response.json();
      if (response.status === 200) {
        login(data);
        setLoginDetails({});
      } else if (response.status === 401) {
        setError(data.error);
      } else {
        setError(`Oops, something went wrong! Error code: ${response.status}. Please try again or contact us for more information.`);
      }
    } catch (error) {
      setError('Oops, something went wrong! Please try again or contact us for more information.');
      await fetch(`${process.env.REACT_APP_API_ADDRESS}/api/v0/deleteCookies`);
      sessionStorage.removeItem('accessToken');

    }
  };

  return (
    <>
      <h2>Login
        { error ? <p className="error">{error}</p> : '' }
        { success ?  <p className="success">{success}</p> : '' }
      </h2>
      <form onSubmit={handleSubmit}>
        <div className='input-container'>
          <i className="bi bi-envelope"></i>
          <hr />
          <input
            type="text"
            name="email"
            value={loginDetails.email || ''}
            placeholder='Email'
            onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })}
            required
          />
        </div>
        <div className='input-container'>
          <i className="bi bi-lock"></i>
          <hr />
          <input
            type="password"
            name="pwd"
            value={loginDetails.pwd || ''}
            placeholder='Password'
            onChange={(e) => setLoginDetails({ ...loginDetails, pwd: e.target.value })}
            required
          />
        </div>
        <button type="submit" className='btn bg-orange'>Sign in</button>
      </form>
      <h5>
        Or
        <span className="strong" onClick={() => setCurrent('register')}> register an account</span>
      </h5>
    </>
  );
}

export default Login;

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './components.css';
// import jwt_decode from 'jwt-decode';

// function Login({ setCurrent, setLoggedIn, setToggleHide }) {

//   const navigate = useNavigate();
//   const [loginDetails, setLoginDetails] = useState({});
//   // const [error, setError] = useState('');
//   // const [success, setSuccess] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const settings = {
//       method: 'POST',
//       credentials: 'include',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(loginDetails),
//     };
//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_ADDRESS}/api/v0/authorize`, settings);
//       const data = await response.json();
//       if (response.status === 200) {
//         // setError('');
//         // if (sessionStorage.getItem('accessToken')) {
//         //   sessionStorage.removeItem('accessToken');
//         // }
//         // sessionStorage.setItem('accessToken', data.accessToken);
//         // if (localStorage.getItem('expiration')) {
//         //   localStorage.removeItem('expiration');
//         // }
//         // const expiration = Date.now() + (12 * 60 * 60 * 1000);
//         // localStorage.setItem('expiration', expiration);
//         // const user = jwt_decode(data.accessToken);
//         // setSuccess(`Welcome ${user.name}! You are logged in.`);
//         // setLoggedIn(true);
//         setLoginDetails({});
//         // setTimeout(() => {
//           // setToggleHide('hidden');
//           // setSuccess('');
//           // navigate('/admin');
//         // }, 1300);
//       } else if (response.status === 401) {
//         setError(data.error);
//       } else {
//         setError(`Oops, something went wrong! Error code: ${response.status}. Please try again or contact us for more information.`);
//       }
//     } catch (error) {
//       setError('Oops, something went wrong! Please try again or contact us for more information.');
//       await fetch(`${process.env.REACT_APP_API_ADDRESS}/api/v0/deleteCookies`);
//       sessionStorage.removeItem('accessToken');

//     }
//   };

//   return (
//     <>
//       <h2>Login
//         { error ? <p className="error">{error}</p> : '' }
//         { success ?  <p className="success">{success}</p> : '' }
//       </h2>
//       <form onSubmit={handleSubmit}>
//         <div className='input-container'>
//           <i className="bi bi-envelope"></i>
//           <hr />
//           <input
//             type="text"
//             name="email"
//             value={loginDetails.email || ''}
//             placeholder='Email'
//             onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })}
//             required
//           />
//         </div>
//         <div className='input-container'>
//           <i className="bi bi-lock"></i>
//           <hr />
//           <input
//             type="password"
//             name="pwd"
//             value={loginDetails.pwd || ''}
//             placeholder='Password'
//             onChange={(e) => setLoginDetails({ ...loginDetails, pwd: e.target.value })}
//             required
//           />
//         </div>
//         <button type="submit" className='btn bg-orange'>Sign in</button>
//       </form>
//       <h5>
//         Or
//         <span className="strong" onClick={() => setCurrent('register')}> register an account</span>
//       </h5>
//     </>
//   );
// }

// export default Login;

