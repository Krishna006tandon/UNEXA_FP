import { Search, TrendingUp, Play } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

interface StreamFeedScreenProps {
  onVideoSelect: (videoId: number) => void;
}

export function StreamFeedScreen({ onVideoSelect }: StreamFeedScreenProps) {
  const trendingVideos = [
    { id: 1, title: "Amazing Tech Review 2024", channel: "TechGuru", views: "1.2M" },
    { id: 2, title: "How to Build Apps Fast", channel: "DevDaily", views: "850K" },
    { id: 3, title: "Travel Vlog: Tokyo", channel: "Wanderlust", views: "2.1M" },
  ];

  const shortVideos = [
    { id: 4, title: "Quick Tutorial", channel: "LearnFast", views: "500K" },
    { id: 5, title: "Funny Moments", channel: "Laughs", views: "1.5M" },
    { id: 6, title: "Life Hacks", channel: "DailyTips", views: "900K" },
  ];

  const longVideos = [
    { id: 7, title: "Complete Guide to React", channel: "CodeMaster", views: "3.2M", duration: "45:32" },
    { id: 8, title: "Photography Masterclass", channel: "PhotoPro", views: "1.8M", duration: "1:12:45" },
    { id: 9, title: "Music Production Tips", channel: "BeatMaker", views: "650K", duration: "28:15" },
  ];

  return (
    <div className="h-screen bg-[#001C30] flex flex-col pb-20">
      {/* Top Bar */}
      <div className="px-6 py-4 bg-[#001C30] border-b border-[#176B87]/20">
        <div className="text-[#DAFFFB] text-2xl font-semibold mb-4">Stream</div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64CCC5]/50" />
          <input
            type="text"
            placeholder="Search videos..."
            className="w-full bg-[#176B87]/20 border border-[#176B87]/40 text-[#DAFFFB] placeholder:text-[#64CCC5]/50 px-12 py-3 rounded-2xl focus:outline-none focus:border-[#64CCC5] focus:ring-2 focus:ring-[#64CCC5]/30 transition-all"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Trending Section */}
        <div className="px-4 py-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-[#64CCC5]" />
            <h3 className="text-[#DAFFFB] font-semibold">Trending Now</h3>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {trendingVideos.map((video, index) => (
              <motion.button
                key={video.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onVideoSelect(video.id)}
                className="flex-shrink-0 w-40 group"
              >
                <div className="w-full h-24 bg-gradient-to-br from-[#176B87]/30 to-[#64CCC5]/30 rounded-2xl mb-2 relative overflow-hidden flex items-center justify-center">
                  <ImageWithFallback
                    src={`https://images.unsplash.com/photo-${
                      video.id === 1
                        ? "1519389950473-47ba0277781c"
                        : video.id === 2
                        ? "1498050108023-c5249f4df085"
                        : "1540959733332-eab4deabeeaf"
                    }?w=320&h=192&fit=crop`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <Play className="w-8 h-8 text-white fill-white" />
                  </div>
                </div>
                <div className="text-[#DAFFFB] text-sm font-medium text-left line-clamp-2 mb-1">
                  {video.title}
                </div>
                <div className="text-[#64CCC5] text-xs text-left">{video.views} views</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Short Videos */}
        <div className="px-4 py-4">
          <h3 className="text-[#DAFFFB] font-semibold mb-3">Quick Watch</h3>
          <div className="grid grid-cols-3 gap-2">
            {shortVideos.map((video) => (
              <button
                key={video.id}
                onClick={() => onVideoSelect(video.id)}
                className="aspect-[9/16] bg-gradient-to-br from-[#176B87]/30 to-[#64CCC5]/30 rounded-2xl relative overflow-hidden flex items-center justify-center group"
              >
                <ImageWithFallback
                  src={`https://images.unsplash.com/photo-${
                    video.id === 4
                      ? "1516116216624-53e697fedbea"
                      : video.id === 5
                      ? "1522202176988-66273c2fd55f"
                      : "1484480974693-6ca0a78fb36b"
                  }?w=240&h=427&fit=crop`}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <Play className="w-6 h-6 text-white fill-white" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Long Form Videos */}
        <div className="px-4 py-4">
          <h3 className="text-[#DAFFFB] font-semibold mb-3">Long Form</h3>
          <div className="space-y-3">
            {longVideos.map((video, index) => (
              <motion.button
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onVideoSelect(video.id)}
                className="w-full flex gap-3 group"
              >
                <div className="w-40 h-24 bg-gradient-to-br from-[#176B87]/30 to-[#64CCC5]/30 rounded-2xl relative overflow-hidden flex items-center justify-center flex-shrink-0">
                  <ImageWithFallback
                    src={`https://images.unsplash.com/photo-${
                      video.id === 7
                        ? "1461749280684-6bc89b4ae681"
                        : video.id === 8
                        ? "1452587925148-ce544e77e70d"
                        : "1511379938547-c1f69419868d"
                    }?w=320&h=192&fit=crop`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <Play className="w-8 h-8 text-white fill-white" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="flex-1 text-left">
                  <div className="text-[#DAFFFB] font-medium line-clamp-2 mb-1">
                    {video.title}
                  </div>
                  <div className="text-[#64CCC5] text-sm">{video.channel}</div>
                  <div className="text-[#64CCC5] text-xs">{video.views} views</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
