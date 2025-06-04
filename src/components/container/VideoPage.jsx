import VideoDetails from '../VideoDetails';
import VideoSideList from '../videoSideList';

function VideoPage() {
  return (
    <div className="grid md:grid-cols-6 gap-6 px-2 sm:px-4 py-6 max-w-7xl mx-auto">
      <div className="md:col-span-4">
        <VideoDetails />
      </div>
      <div className="md:col-span-2 hidden md:block">
        <h2 className="text-base font-semibold mb-4 text-gray-900">Related Videos</h2>
        <VideoSideList />
      </div>
    </div>
  );
}

export default VideoPage;
