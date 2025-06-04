import { useNavigate } from 'react-router';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim() === '') return;
    navigate({
      pathname: 'search',
      search: `?q=${encodeURIComponent(searchTerm.trim())}`
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center max-w-2xl w-full">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500 text-sm"
      />
      <button 
        onClick={handleSearch} 
        className="px-6 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-100 transition-colors flex items-center justify-center"
      >
        <FiSearch size={18} className="text-gray-600" />
      </button>
    </div>
  );
}
export default Search;