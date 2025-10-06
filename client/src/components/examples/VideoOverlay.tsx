import VideoOverlay from '../VideoOverlay';

export default function VideoOverlayExample() {
  return (
    <div className="h-screen bg-gradient-to-br from-gray-800 to-gray-900 relative">
      <VideoOverlay
        title="Amazing Video Title That Could Be Very Long And Span Multiple Lines"
        channelTitle="Channel Name"
        currentIndex={2}
        totalVideos={10}
        onNext={() => console.log('Next clicked')}
        onPrevious={() => console.log('Previous clicked')}
        onShuffle={() => console.log('Shuffle clicked')}
        hasNext={true}
        hasPrevious={true}
      />
    </div>
  );
}
