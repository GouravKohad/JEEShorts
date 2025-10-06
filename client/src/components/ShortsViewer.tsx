import { useState, useEffect, useRef } from "react";
import VideoPlayer from "./VideoPlayer";
import VideoOverlay from "./VideoOverlay";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

interface Video {
  id: string;
  title: string;
  channelTitle: string;
}

interface ShortsViewerProps {
  playlistId: string;
  onBack: () => void;
}

export default function ShortsViewer({ playlistId, onBack }: ShortsViewerProps) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);

  // TODO: remove mock functionality - Replace with real YouTube API
  useEffect(() => {
    const mockVideos: Video[] = [
      { id: "dQw4w9WgXcQ", title: "Never Gonna Give You Up", channelTitle: "Rick Astley" },
      { id: "9bZkp7q19f0", title: "PSY - GANGNAM STYLE", channelTitle: "officialpsy" },
      { id: "kJQP7kiw5Fk", title: "Luis Fonsi - Despacito", channelTitle: "Luis Fonsi" },
      { id: "fJ9rUzIMcZQ", title: "Queen - Bohemian Rhapsody", channelTitle: "Queen Official" },
      { id: "3JZ_D3ELwOQ", title: "Ed Sheeran - Shape of You", channelTitle: "Ed Sheeran" },
    ];
    
    setTimeout(() => {
      setVideos(mockVideos);
      setIsLoading(false);
    }, 1000);
  }, [playlistId]);

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading playlist...</p>
        </div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center space-y-4">
          <p className="text-lg text-foreground">No videos found in this playlist</p>
          <Button onClick={onBack} data-testid="button-back-home">
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
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
      <Button
        size="icon"
        variant="ghost"
        className="absolute top-4 left-4 z-30 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-sm"
        onClick={onBack}
        data-testid="button-back"
      >
        <Home className="w-5 h-5" />
      </Button>

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
