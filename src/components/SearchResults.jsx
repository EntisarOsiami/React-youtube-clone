import { useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getAllVideos } from '../services/youtube';
import { Link } from 'react-router';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (!query) return;

    const fetchVideos = async () => {
      try {
        const data = await getAllVideos();

        const search = query.toLowerCase();
        const filteredResults = data.items.filter((v) =>
          v.snippet.title.toLowerCase().includes(search)
        );
        setFiltered(filteredResults);
      } catch (err) {
        console.error('Failed to fetch videos', err);
      }
    };

    fetchVideos();
  }, [query]);  return (
    <div className='p-4'>
      {query ? (
        <>
          <h2 className='text-xl font-semibold mb-4'>
            Search results for:{' '}
            <span className='text-blue-700'>{decodeURIComponent(query)}</span>
          </h2>

          {filtered.length === 0 ? (
            <p>No videos found.</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {filtered.map((video) => (
                <div key={video.id} className='rounded-lg p-2'>
                  <Link to={`/video/${video.id}`} className='block'>
                    <img
                      src={video.snippet.thumbnails.medium.url}
                      className='w-full rounded hover:opacity-80'
                    />
                    <h3 className='mt-2 font-medium hover:text-blue-600'>
                      {video.snippet.title}
                    </h3>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <p>Please enter a search term.</p>
      )}
    </div>
  );
}

export default SearchResults;
