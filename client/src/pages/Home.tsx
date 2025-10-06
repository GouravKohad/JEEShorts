import { useState, useEffect } from "react";
import ShortsViewer, { type Video } from "@/components/ShortsViewer";

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/videos.json')
      .then(res => res.json())
      .then(data => {
        setVideos(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading videos:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading videos...</p>
        </div>
      </div>
    );
  }

  return <ShortsViewer videos={videos} />;
}
