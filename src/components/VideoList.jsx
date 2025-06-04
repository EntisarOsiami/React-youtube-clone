import { useEffect, useState } from 'react';
import { getAllVideos } from '../services/youtube';
import { Link } from 'react-router';
import { formatDistanceToNow } from 'date-fns';
import numeral from 'numeral';

function VideoList() {
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
    <div className='p-2 sm:p-4 md:p-6'>
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

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6 min-h-[60vh]'>
        {loading ? (
          <div className='col-span-full flex justify-center items-center py-16'>
            <p>Loading videos...</p>
          </div>
        ) : (
          videos.map((video) => (
            <div key={video.id}>
              <Link to={`/video/${video.id}`} className='block'>
                <img
                  src={
                    video.snippet.thumbnails.high.url ||
                    video.snippet.thumbnails.medium.url ||
                    video.snippet.thumbnails.default.url
                  }
                  className='w-full rounded-xl object-cover hover:scale-105 transition-transform'
                  style={{
                    aspectRatio: '16/9',
                    maxHeight: 392,
                    minHeight: 221,
                  }}
                />
                <h3 className='text-base font-medium line-clamp-2 hover:underline mt-2 mb-1'>
                  {video.snippet.title}
                </h3>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <img
                    src={video.snippet.thumbnails.default.url}
                    alt={video.snippet.channelTitle}
                    className='w-8 h-8 rounded-full object-cover'
                  />
                  <span className='truncate'>{video.snippet.channelTitle}</span>
                  <span>·</span>
                  <span>
                    {numeral(video.statistics?.viewCount).format('0.[0]a')}{' '}
                    views
                  </span>
                  <span>·</span>
                  <span>
                    {formatDistanceToNow(new Date(video.snippet.publishedAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default VideoList;
