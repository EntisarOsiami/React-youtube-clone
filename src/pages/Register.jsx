import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { getByMail, apiRegister } from '../services/api';
import { Link } from 'react-router';

function Registration() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const isEmail = await getByMail(data.email);
      if (isEmail) {
        Swal.fire({
          title: 'Error registering',
          text: 'This email is already registered! Use a different email',
        });
        return;
      }
      const response = await apiRegister({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      if (response) {
        Swal.fire({
          title: 'Registration successful',
          text: 'Please login now',
        });
        navigate('/login');
      }
    } catch {
      Swal.fire({
        title: 'Error',
        text: 'Registration failed. Please try again.',
      });
    }
  };
  return (
    <div className='min-h-screen flex items-center justify-center py-8 px-2'>
      <div className='w-full max-w-md p-8'>
        <h2 className='text-3xl font-bold mb-6 text-center text-gray-900'>
          Create your account
        </h2>
        <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <input
                {...register('username', { required: 'Username is required' })}
                type='text'
                placeholder='Username'
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              />
              {errors.username && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register('email', {
                  required: 'Email is required',
                  validate: (value) =>
                    value.includes('@') || 'Please enter a valid email',
                })}
                type='email'
                placeholder='Email address'
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              />
              {errors.email && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,

                    message: 'Password must be at least 8 characters',
                  },
                })}
                type='password'
                placeholder='Password'
                className='rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              />
              {errors.password && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register('confirmPassword', {
                  required: 'Confirm password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                  validate: (value) =>
                    value === watch('password') || 'Passwords do not match',
                })}
                type='password'
                placeholder='Confirm Password'
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              />
              {errors.confirmPassword && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
              Register
            </button>
          </div>
          <p>
            {' '}
            if you have an account{' '}
            <span>
              <Link className='text-blue-700' to='/login'>
                Login
              </Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registration;
