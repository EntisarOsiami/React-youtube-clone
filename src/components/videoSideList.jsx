import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { getAllVideos } from '../services/youtube';
import { formatDistanceToNow } from 'date-fns';
import numeral from 'numeral';

function VideoSideList() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getAllVideos();
        setVideos(data.items);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  return (
    <aside>
      <div className='bg-[#0077b5] text-white p-4 rounded-lg shadow-md mb-4'>
        <p className='text-lg font-semibold mb-2'>
           I'm on LinkedIn — let's connect.
        </p>
        <a
          href='https://www.linkedin.com/in/intisar-alotaibi/'
          target='_blank'
          rel='noopener noreferrer'
          className='underline hover:opacity-90 text-sm'>
          linkedin
        </a>
      </div>

      {loading ? (
        <div className='flex justify-center items-center py-8'>
          <div className='animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-red-500'></div>
        </div>
      ) : (
        videos.map((v) => (
          <Link
            to={`/video/${v.id}`}
            key={v.id}
            className='flex gap-2 hover:bg-gray-100 p-2 transition'>
            <div className='relative'>
              <img
                src={
                  v.snippet.thumbnails.medium.url ||
                  v.snippet.thumbnails.default.url
                }
                className='w-32 h-20 object-cover'
              />
          
            </div>
            <div className='flex flex-col min-w-0 flex-1 gap-1'>
              <h3 className='text-sm font-semibold line-clamp-2 mb-1'>
                {v.snippet.title}
              </h3>
              <span className='text-xs font-bold text-gray-600 line-clamp-1'>
                {v.snippet.channelTitle}
              </span>
              <div className='text-xs text-gray-500 flex gap-2 justify-start items-center mt-auto'>
                <span>
                  {numeral(v.statistics?.viewCount).format('0.[0]a')} views
                </span>
                <span>
                  {formatDistanceToNow(new Date(v.snippet.publishedAt))}
                </span>
              </div>
            </div>
          </Link>
        ))
      )}
    </aside>
  );
}

export default VideoSideList;
