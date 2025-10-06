import { useState, useEffect, useRef } from "react";
import VideoPlayer from "./VideoPlayer";
import VideoOverlay from "./VideoOverlay";

export interface Video {
  id: string;
  title: string;
  channelTitle: string;
}

interface ShortsViewerProps {
  videos: Video[];
}

export default function ShortsViewer({ videos }: ShortsViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, videos.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (videos.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center space-y-4">
          <p className="text-lg text-foreground">No videos found</p>
        </div>
      </div>
    );
  }

  const currentVideo = videos[currentIndex];

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-screen overflow-hidden bg-black"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >

      <div className="w-full h-full">
        <VideoPlayer
          videoId={currentVideo.id}
          isActive={true}
          onVideoEnd={handleNext}
        />
      </div>

      <VideoOverlay
        title={currentVideo.title}
        channelTitle={currentVideo.channelTitle}
        currentIndex={currentIndex}
        totalVideos={videos.length}
        onNext={handleNext}
        onPrevious={handlePrevious}
        hasNext={currentIndex < videos.length - 1}
        hasPrevious={currentIndex > 0}
      />
    </div>
  );
}
