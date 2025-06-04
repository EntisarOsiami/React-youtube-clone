import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { getByName } from '../services/api';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const getUser = await getByName(data.username);

      if (
        getUser.data[0].password !== data.password ||
        getUser.data[0].username !== data.username
      ) {
        setErrorMessage('Invalid username or password');
        return;
      }
      const user = {
        username: getUser.data[0].username,
        email: getUser.data[0].email,
        id: getUser.data[0].id,
        isLoggedIn: true,
      };

      localStorage.setItem('user', JSON.stringify(user));

      Swal.fire({
        title: 'Login Successful',
        text: 'Welcome back!',
        icon: 'success',
      });
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred while logging in');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#f9f9f9] py-8 px-2'>
      <div className='w-full max-w-md p-8'>
        <h2 className='text-3xl font-bold mb-6 text-center text-gray-900'>
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Username
            </label>
            <input
              type='text'
              {...register('username', { required: 'Username is required' })}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.username && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              type='password'
              {...register('password', { required: 'Password is required' })}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.password && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.password.message}
              </p>
            )}
          </div>

          {errorMessage && (
            <p className='text-red-500 text-sm mt-2'>{errorMessage}</p>
          )}

          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200'>
            Login
          </button>
          <div>
            if you don't have an account{' '}
            <span className='text-blue-300 hover:underline'>
              <Link to='/register'>Register</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
