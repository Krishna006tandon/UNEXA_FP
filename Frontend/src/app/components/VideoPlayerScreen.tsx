import {
  ChevronLeft,
  ThumbsUp,
  ThumbsDown,
  Share2,
  MoreVertical,
  MessageCircle,
  Play,
} from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

interface VideoPlayerScreenProps {
  onBack: () => void;
}

export function VideoPlayerScreen({ onBack }: VideoPlayerScreenProps) {
  const comments = [
    {
      id: 1,
      user: "alex_m",
      text: "Amazing content! Keep it up 🔥",
      likes: 234,
      time: "2h ago",
    },
    {
      id: 2,
      user: "sarah_k",
      text: "This is exactly what I needed to see today",
      likes: 89,
      time: "5h ago",
    },
    {
      id: 3,
      user: "mike_r",
      text: "Can't wait for the next one!",
      likes: 45,
      time: "1d ago",
    },
  ];

  const recommendations = [
    { id: 1, title: "Amazing Sunset Timelapse", views: "1.2M", duration: "5:32" },
    { id: 2, title: "City Lights at Night", views: "890K", duration: "8:15" },
    { id: 3, title: "Ocean Waves Compilation", views: "2.4M", duration: "10:45" },
  ];

  return (
    <div className="h-screen bg-[#001C30] flex flex-col pb-20 overflow-y-auto">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 z-20 w-10 h-10 bg-[#001C30]/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#176B87]/50 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-[#DAFFFB]" />
      </button>

      {/* Video Player */}
      <div className="relative w-full aspect-video bg-gradient-to-br from-[#176B87]/20 to-[#64CCC5]/20 flex items-center justify-center">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop"
          alt="Video"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <button className="w-16 h-16 bg-[#64CCC5] rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(100,204,197,0.6)] hover:scale-110 transition-transform">
            <Play className="w-8 h-8 text-[#001C30] fill-[#001C30] ml-1" />
          </button>
        </div>
      </div>

      {/* Video Info */}
      <div className="px-6 py-4">
        <h1 className="text-[#DAFFFB] text-lg font-semibold mb-2 leading-snug">
          Beautiful Sunset Over the Ocean - 4K Nature Video
        </h1>
        <div className="text-[#64CCC5] text-sm mb-4">2.4M views • 2 days ago</div>

        {/* Channel Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#176B87] to-[#64CCC5] flex items-center justify-center">
              <span className="text-[#001C30] font-semibold">N</span>
            </div>
            <div>
              <div className="text-[#DAFFFB] font-semibold">Nature Channel</div>
              <div className="text-[#64CCC5] text-xs">125K subscribers</div>
            </div>
          </div>
          <button className="px-6 py-2 bg-[#176B87] hover:bg-[#1d7a9a] text-[#DAFFFB] rounded-xl transition-colors font-semibold">
            Subscribe
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pb-4 border-b border-[#176B87]/20">
          <button className="flex-1 bg-[#176B87]/20 hover:bg-[#176B87]/30 text-[#64CCC5] py-3 rounded-2xl flex items-center justify-center gap-2 transition-colors">
            <ThumbsUp className="w-5 h-5" />
            <span className="font-semibold">12K</span>
          </button>
          <button className="flex-1 bg-[#176B87]/20 hover:bg-[#176B87]/30 text-[#64CCC5] py-3 rounded-2xl flex items-center justify-center gap-2 transition-colors">
            <ThumbsDown className="w-5 h-5" />
          </button>
          <button className="flex-1 bg-[#176B87]/20 hover:bg-[#176B87]/30 text-[#64CCC5] py-3 rounded-2xl flex items-center justify-center gap-2 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="bg-[#176B87]/20 hover:bg-[#176B87]/30 text-[#64CCC5] py-3 px-4 rounded-2xl flex items-center justify-center transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="px-6 py-4">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="w-5 h-5 text-[#64CCC5]" />
          <span className="text-[#DAFFFB] font-semibold">
            {comments.length} Comments
          </span>
        </div>

        {comments.map((comment, index) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#176B87] flex items-center justify-center flex-shrink-0">
                <span className="text-[#DAFFFB] text-xs font-semibold">
                  {comment.user[0].toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#DAFFFB] text-sm font-semibold">
                    {comment.user}
                  </span>
                  <span className="text-[#64CCC5]/70 text-xs">{comment.time}</span>
                </div>
                <div className="text-[#DAFFFB] text-sm mb-2">{comment.text}</div>
                <div className="flex items-center gap-4">
                  <button className="text-[#64CCC5] text-xs flex items-center gap-1 hover:text-[#DAFFFB] transition-colors">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{comment.likes}</span>
                  </button>
                  <button className="text-[#64CCC5] text-xs hover:text-[#DAFFFB] transition-colors">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recommended Videos */}
      <div className="px-6 py-4">
        <div className="text-[#DAFFFB] font-semibold mb-4">Recommended</div>
        {recommendations.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-3 mb-4 cursor-pointer"
          >
            <div className="relative w-40 aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-[#176B87]/20 to-[#64CCC5]/20 flex-shrink-0">
              <ImageWithFallback
                src={`https://images.unsplash.com/photo-${
                  1500000000000 + video.id * 20000000
                }?w=320&h=180&fit=crop`}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-black/80 text-[#DAFFFB] text-xs px-2 py-0.5 rounded">
                {video.duration}
              </div>
            </div>
            <div className="flex-1">
              <div className="text-[#DAFFFB] text-sm font-semibold mb-1 line-clamp-2">
                {video.title}
              </div>
              <div className="text-[#64CCC5] text-xs">Nature Channel</div>
              <div className="text-[#64CCC5] text-xs">{video.views} views</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
