import ShortsViewer from '../ShortsViewer';

export default function ShortsViewerExample() {
  const mockVideos = [
    { id: "dQw4w9WgXcQ", title: "Rick Astley - Never Gonna Give You Up", channelTitle: "Rick Astley" },
    { id: "9bZkp7q19f0", title: "PSY - GANGNAM STYLE", channelTitle: "officialpsy" },
  ];

  return (
    <ShortsViewer videos={mockVideos} />
  );
}
