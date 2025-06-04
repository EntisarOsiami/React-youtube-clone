import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiHeart } from 'react-icons/fi';
import axios from 'axios';
import { getUser } from '../utils/user';
import { getVideoById } from '../services/youtube';

const API_URL = 'https://683f4a751cd60dca33dee921.mockapi.io/youtube-likes';

function Profile() {
  const [user, setUser] = useState(null);
  const [liked, setLiked] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = getUser();
    if (userData) {
      setUser(userData);
      fetchLikes(userData.id || userData.username);
    }
    setLoading(false);
  }, []);
  const fetchLikes = async (userId) => {
    try {
      const response = await axios.get(API_URL);
      const allLikes = response.data;

      const userLikedVideoIds = allLikes
        .filter((item) => item.users && item.users[userId] === 'like')
        .map((item) => item.videoId);

      const videoPromises = userLikedVideoIds.map((videoId) =>
        getVideoById(videoId)
      );
      const videos = await Promise.all(videoPromises);

      setLiked(videos.filter((video) => video !== null));
    } catch (error) {
      console.error( error);
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-red-500'></div>
      </div>
    );
  }
  return (
    <div className='max-w-4xl mx-auto p-6'>
      <div className='bg-white rounded-lg shadow-md p-6 mb-6 flex items-center space-x-6'>
        <div className='w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center border-4 border-gray-200'>
          <FiUser size={32} className='text-gray-600' />
        </div>
        <div className='flex-1'>
          <h1 className='text-3xl font-bold text-gray-900'>{user.username}</h1>
          <div className='flex items-center text-gray-600 mt-1'>
            <FiMail size={16} className='mr-2' />
            <span>{user.email}</span>
          </div>
          {user.bio && <p className='text-gray-700 mt-3'>{user.bio}</p>}
        </div>
      </div>

      <div className='bg-white rounded-lg shadow-md p-6'>
        <div className='flex items-center mb-6'>
          <FiHeart size={24} className='text-red-500 mr-3' />
          <h2 className='text-2xl font-bold text-gray-900'>
            Liked Videos
          </h2>{' '}
          <span className='ml-2 bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full'>
            {liked.length}
          </span>
        </div>{' '}
        {liked.length === 0 ? (
          <div className='text-center py-12'>
            <FiHeart size={48} className='mx-auto text-gray-400 mb-4' />
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              No liked videos yet
            </h3>
            <p className='text-gray-600'>
              Start exploring and like videos to see them here!
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {liked.map((video) => (
              <div
                key={video.id}
                className='bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer'
                onClick={() => (window.location.href = `/video/${video.id}`)}>
                <div className='relative'>
                  <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                    className='w-full h-48 object-cover'
                  />
                  <div className='absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded'>
                    {video.contentDetails?.duration || '0:00'}
                  </div>
                </div>
                <div className='p-4'>
                  <h3 className='font-semibold text-gray-900 mb-2 line-clamp-2'>
                    {video.snippet.title}
                  </h3>
                  <p className='text-sm text-gray-600 mb-2'>
                    {video.snippet.channelTitle}
                  </p>
                  <div className='flex items-center justify-between text-xs text-gray-500'>
                    <span>
                      {video.statistics?.viewCount
                        ? `${parseInt(
                            video.statistics.viewCount
                          ).toLocaleString()} views`
                        : 'No views'}
                    </span>
                    <span>
                      {new Date(video.snippet.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
