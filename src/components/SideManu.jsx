import { AiOutlineHome } from 'react-icons/ai';
import {
  MdSubscriptions,
  MdLiveTv,
  MdSportsEsports,
  MdMusicNote,
} from 'react-icons/md';
import { RiCloseLine } from 'react-icons/ri';
import { SiYoutubeshorts } from 'react-icons/si';
import { FaFire } from 'react-icons/fa';

function SideMenu({ isOpen, onClose }) {
  const menu = [
    {
      title: 'Main',
      items: [
        { id: 'home', icon: AiOutlineHome, label: 'Home', active: true },
        { id: 'shorts', icon: SiYoutubeshorts, label: 'Shorts' },
        { id: 'subs', icon: MdSubscriptions, label: 'Subscriptions' },
      ],
    },
    {
      title: 'Explore',
      items: [
        { id: 'trending', icon: FaFire, label: 'Trending' },
        { id: 'music', icon: MdMusicNote, label: 'Music' },
        { id: 'live', icon: MdLiveTv, label: 'Live' },
        { id: 'gaming', icon: MdSportsEsports, label: 'Gaming' },
      ],
    },
  ];
  return (
    <>
      {isOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden'
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed top-14 left-0 h-[calc(100vh-56px)] bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-56 border-r border-gray-200`}>
        <div className='flex items-center justify-between p-4 border-b border-gray-200 lg:hidden'>
          <span className='font-semibold text-lg'>YouTube</span>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 rounded-full'>
            <RiCloseLine className='text-xl' /> 
          </button>
        </div>{' '}
        <nav className='py-2'>
          {menu.map((section, idx) => (
            <div key={section.title} className='mb-2'>
              <h3 className='px-6 py-2 text-sm font-semibold text-gray-700 uppercase tracking-wide'>
                {section.title}
              </h3>
              <div className='space-y-1'>
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center px-6 py-2 hover:bg-gray-100 cursor-pointer transition-colors ${
                      item.active ? 'bg-gray-100' : ''
                    }`}>
                    <item.icon className='h-5 w-5 text-gray-600 mr-4' />
                    <span className='text-sm font-medium text-gray-800'>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
              {idx < menu.length - 1 && (
                <div className='my-3 border-b border-gray-200' />
              )}
            </div>
          ))}
          <div className='px-6 py-4 text-xs text-gray-500 border-t border-gray-200 mt-4 space-y-1'>
            <div>About Press Copyright</div>
            <div>Contact us Creators</div>
            <div>Advertise Developers</div>
            <div className='pt-2'>
              Terms Privacy Policy & Safety How YouTube works Test new features
            </div>
            <div className='pt-2 text-gray-400'>© 2025 Google LLC</div>
          </div>
        </nav>
      </aside>
    </>
  );
}

export default SideMenu;
