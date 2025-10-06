import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Loader2 } from "lucide-react";
import { SiYoutube } from "react-icons/si";

interface PlaylistInputProps {
  onPlaylistLoad: (playlistId: string) => void;
  isLoading?: boolean;
}

export default function PlaylistInput({ onPlaylistLoad, isLoading = false }: PlaylistInputProps) {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [error, setError] = useState("");

  const extractPlaylistId = (url: string): string | null => {
    const patterns = [
      /[?&]list=([^&]+)/,
      /youtube\.com\/playlist\?list=([^&]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }

    if (url.length === 34 && /^[a-zA-Z0-9_-]+$/.test(url)) {
      return url;
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!playlistUrl.trim()) {
      setError("Please enter a playlist URL");
      return;
    }

    const playlistId = extractPlaylistId(playlistUrl);
    
    if (!playlistId) {
      setError("Invalid YouTube playlist URL");
      return;
    }

    onPlaylistLoad(playlistId);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <SiYoutube className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Shorts Player
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Watch your YouTube playlists in a vertical shorts-style interface
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Paste YouTube playlist URL or ID..."
              value={playlistUrl}
              onChange={(e) => {
                setPlaylistUrl(e.target.value);
                setError("");
              }}
              className="h-12 text-base"
              disabled={isLoading}
              data-testid="input-playlist-url"
            />
            {error && (
              <p className="text-sm text-destructive animate-in slide-in-from-top-1" data-testid="text-error">
                {error}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base"
            disabled={isLoading}
            data-testid="button-load-playlist"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Loading Playlist...
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Load Playlist
              </>
            )}
          </Button>
        </form>

        <div className="mt-8 p-4 rounded-md bg-card border border-card-border">
          <h3 className="text-sm font-medium mb-2">How to use:</h3>
          <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
            <li>Copy a YouTube playlist URL</li>
            <li>Paste it in the input field above</li>
            <li>Click "Load Playlist" to start watching</li>
            <li>Swipe or scroll to navigate between videos</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
