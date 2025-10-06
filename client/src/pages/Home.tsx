import { useState } from "react";
import PlaylistInput from "@/components/PlaylistInput";
import ShortsViewer from "@/components/ShortsViewer";

export default function Home() {
  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlaylistLoad = (id: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setPlaylistId(id);
      setIsLoading(false);
    }, 500);
  };

  const handleBack = () => {
    setPlaylistId(null);
  };

  if (playlistId) {
    return <ShortsViewer playlistId={playlistId} onBack={handleBack} />;
  }

  return <PlaylistInput onPlaylistLoad={handlePlaylistLoad} isLoading={isLoading} />;
}
