import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { apiComment } from '../services/api';
import Swal from 'sweetalert2';
import { getUser } from '../utils/user';
import { FiUser } from 'react-icons/fi';

function CommentsInput({ id }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [isFocused, setIsFocused] = useState(false);
  const user = getUser();

  async function onSubmit(data) {
    try {
      const commentData = {
        comment: data.comment,
        date: new Date().toISOString(),
        userId: user?.id,
        username: user?.username,
        videoId: id,
        ratings: [],
      };

      await apiComment(commentData);
      Swal.fire({
        title: 'Comment posted!',
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
      });
      reset();
      setIsFocused(false);
    } catch (error) {
      Swal.fire({
        title: 'Error posting comment',
        text: error.message || 'An error occurred.',
        icon: 'error',
      });
    }
  }
    return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 mb-8">
      <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center text-gray-600">
        {user?.username ? (
          <span className="font-bold text-lg">{user.username.charAt(0).toUpperCase()}</span>
        ) : (
          <FiUser size={20} />
        )}
      </div>
      
      <div className="flex-1 flex flex-col">
        <textarea
          {...register('comment', { required: 'Please enter a comment' })}
          rows={isFocused ? 3 : 1}
          placeholder="Add a comment..."
          className={`w-full resize-none py-2 px-0 focus:outline-none bg-transparent text-sm border-b ${
            errors.comment ? 'border-red-500' : 'border-gray-300'
          } ${isFocused ? 'border-black' : ''}`}
          onFocus={() => setIsFocused(true)}
        />
        
        {errors.comment && (
          <p className="text-red-500 text-xs mt-1">{errors.comment.message}</p>
        )}
        
        {isFocused && (
          <div className="flex justify-end gap-3 mt-3">
            <button
              type="button"
              onClick={() => {
                reset();
                setIsFocused(false);
              }}
              className="px-3 py-2 text-sm font-medium rounded-full hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-3 py-2 text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500"
            >
              {isSubmitting ? 'Posting...' : 'Comment'}
            </button>
          </div>
        )}
      </div>
    </form>
  );
}

export default CommentsInput;
