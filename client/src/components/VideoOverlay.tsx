import { ChevronDown, ChevronUp, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoOverlayProps {
  title: string;
  channelTitle: string;
  currentIndex: number;
  totalVideos: number;
  onNext?: () => void;
  onPrevious?: () => void;
  onShuffle?: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

export default function VideoOverlay({
  title,
  channelTitle,
  currentIndex,
  totalVideos,
  onNext,
  onPrevious,
  onShuffle,
  hasNext,
  hasPrevious,
}: VideoOverlayProps) {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10" />
      
      <div className="absolute top-4 left-4 right-4 z-20">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-white/90" data-testid="text-video-count">
            {currentIndex + 1} / {totalVideos}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10 pb-6 pt-20">
        <div className="px-4 space-y-2">
          <h2 className="text-lg font-semibold text-white line-clamp-2" data-testid="text-video-title">
            {title}
          </h2>
          <p className="text-sm text-white/70" data-testid="text-channel-name">
            {channelTitle}
          </p>
        </div>
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
        <Button
          size="icon"
          variant="ghost"
          className="bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-sm disabled:opacity-30"
          onClick={onPrevious}
          disabled={!hasPrevious}
          data-testid="button-previous-video"
        >
          <ChevronUp className="w-6 h-6" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-sm"
          onClick={onShuffle}
          data-testid="button-shuffle"
        >
          <Shuffle className="w-5 h-5" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-sm disabled:opacity-30"
          onClick={onNext}
          disabled={!hasNext}
          data-testid="button-next-video"
        >
          <ChevronDown className="w-6 h-6" />
        </Button>
      </div>
    </>
  );
}
