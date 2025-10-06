import VideoPlayer from '../VideoPlayer';

export default function VideoPlayerExample() {
  return (
    <div className="h-screen">
      <VideoPlayer 
        videoId="dQw4w9WgXcQ" 
        isActive={true}
      />
    </div>
  );
}
