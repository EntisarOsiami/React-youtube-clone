import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getVideoById } from '../services/youtube';
import Comments from './Comments';
import Input from './CommentsInput';
import { formatDistanceToNow } from 'date-fns';
import numeral from 'numeral';
import {
  BiLike,
  BiDislike,
  BiShare,
  BiDotsHorizontalRounded,
} from 'react-icons/bi';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const API_URL = 'https://683f4a751cd60dca33dee921.mockapi.io/youtube-likes';

function Details() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDesc, setShowDesc] = useState(false);
  const [likeData, setLikeData] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id || user?.username;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getVideoById(id);
        setVideo(data);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

 useEffect(() => {
  const fetchLikeData = async () => {
    try {
      const res = await fetch(API_URL); 
      const all = await res.json();

      const existing = all.find(item => item.videoId === id);
      if (existing) {
        setLikeData(existing);
      } else {
        const createRes = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            videoId: id,
            like: 0,
            dislike: 0,
            users: {},
          }),
        });

        if (!createRes.ok) {
          throw new Error(`Failed to POST: ${createRes.status}`);
        }

        const created = await createRes.json();
        setLikeData(created);
      }
    } catch (err) {
      console.error('Like setup failed:', err);
    }
  };

  fetchLikeData();
}, [id]);


  const handleLike = async () => {
    if (!likeData || !userId) return;

    const currentAction = likeData.users?.[userId];
    if (currentAction === 'like') return;

    const updated = {
      ...likeData,
      like: currentAction === 'dislike' ? likeData.like + 1 : likeData.like + 1,
      dislike: currentAction === 'dislike' ? likeData.dislike - 1 : likeData.dislike,
      users: { ...likeData.users, [userId]: 'like' },
    };

    const res = await fetch(`${API_URL}/${likeData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    const updatedData = await res.json();
    setLikeData(updatedData);
  };

  const handleDislike = async () => {
    if (!likeData || !userId) return;

    const currentAction = likeData.users?.[userId];
    if (currentAction === 'dislike') return;

    const updated = {
      ...likeData,
      like: currentAction === 'like' ? likeData.like - 1 : likeData.like,
      dislike: currentAction === 'like' ? likeData.dislike + 1 : likeData.dislike + 1,
      users: { ...likeData.users, [userId]: 'dislike' },
    };

    const res = await fetch(`${API_URL}/${likeData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    const updatedData = await res.json();
    setLikeData(updatedData);
  };
  return (
    <div className="w-full">
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-red-500"></div>
        </div>
      ) : video ? (
        <>
          <div className="relative w-full mb-4" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={`https://www.youtube.com/embed/${id}`}
              title={video.snippet?.title}
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-2 gap-2">
            <h1 className="text-xl font-bold md:text-xl text-black leading-snug flex-1">
              {video.snippet?.title}
            </h1>
            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <button onClick={handleLike} className="flex items-center px-3 py-1.5 rounded-full text-[#0f0f0f] text-sm font-medium hover:bg-[#e5e5e5]">
                <BiLike className="w-5 h-5 mr-1" />
                {likeData ? numeral(likeData.like).format('0a') : '0'}
              </button>
              <button onClick={handleDislike} className="flex items-center px-3 py-1.5 rounded-full text-[#0f0f0f] text-sm font-medium hover:bg-[#e5e5e5]">
                <BiDislike className="w-5 h-5 mr-1" />
                {likeData ? numeral(likeData.dislike).format('0a') : '0'}
              </button>
              <button className="flex items-center px-3 py-1.5 rounded-full text-[#0f0f0f] text-sm font-medium hover:bg-[#e5e5e5]">
                <BiShare className="w-5 h-5 mr-1" />Share
              </button>
              <button className="flex items-center p-2 rounded-full hover:bg-[#e5e5e5]">
                <BiDotsHorizontalRounded className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {video.snippet?.channelTitle?.charAt(0)?.toUpperCase()}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-medium text-[15px] text-[#0f0f0f]">{video.snippet?.channelTitle}</span>
                <AiOutlineCheckCircle className="text-gray-500 text-sm" />
              </div>
            </div>
            <button className="ml-4 px-5 py-2 bg-[#0f0f0f] text-white rounded-full hover:bg-[#272727] text-sm font-medium">
              Subscribe
            </button>
          </div>
          <div className="mt-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#606060] mb-1">
              <span className="font-medium">
                {numeral(video.statistics?.viewCount).format('0,0')} views
              </span>
              <span>
                {formatDistanceToNow(new Date(video.snippet?.publishedAt), { addSuffix: true })}
              </span>
              <span className="text-blue-600">#trending</span>
            </div>
            <div className="text-sm text-[#0f0f0f] whitespace-pre-line">
              {showDesc
                ? video.snippet?.description
                : `${video.snippet?.description?.substring(0, 200)}${video.snippet?.description?.length > 200 ? '...' : ''}`}
              {video.snippet?.description?.length > 200 && (
                <button
                  onClick={() => setShowDesc(!showDesc)}
                  className="block text-blue-700 font-medium mt-2 hover:underline"
                >
                  {showDesc ? 'Show less' : 'Show more'}
                </button>
              )}
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <span>Comments</span>
              <span className="ml-2 text-sm text-gray-600">
                {numeral(video.statistics?.commentCount || 0).format('0,0')}
              </span>
            </h3>            <Input id={id} />
            <Comments id={id} className="mt-6" />
          </div>
        </>
      ) : (
        <div className="text-center p-10 bg-red-50 rounded-xl">
          <AiOutlineCheckCircle className="w-16 h-16 mx-auto text-red-300 mb-4" />
          <p className="text-red-500 font-medium text-lg">Video not found</p>
          <p className="text-red-400 text-sm mt-1">
            The video you're looking for doesn't exist or has been removed.
          </p>
        </div>
      )}
    </div>
  );
}

export default Details;
