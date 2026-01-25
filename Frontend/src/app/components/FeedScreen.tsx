import { MessageCircle, Heart, Share2, Bookmark, MoreVertical } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

export function FeedScreen() {
  const stories = [
    { id: 1, username: "alex_m", hasNew: true },
    { id: 2, username: "sarah_k", hasNew: true },
    { id: 3, username: "mike_r", hasNew: false },
    { id: 4, username: "emma_w", hasNew: true },
    { id: 5, username: "john_d", hasNew: false },
  ];

  const posts = [
    {
      id: 1,
      username: "alex_m",
      timeAgo: "2h ago",
      caption: "Sunset views hitting different ✨",
      likes: 1234,
      comments: 89,
      isLiked: false,
      isSaved: false,
    },
    {
      id: 2,
      username: "sarah_k",
      timeAgo: "5h ago",
      caption: "New project launch! So excited 🚀",
      likes: 2567,
      comments: 234,
      isLiked: true,
      isSaved: true,
    },
  ];

  return (
    <div className="h-screen bg-[#001C30] flex flex-col pb-20">
      {/* Top Bar */}
      <div className="px-6 py-4 flex items-center justify-between bg-[#001C30] border-b border-[#176B87]/20">
        <div className="text-[#64CCC5] text-2xl font-bold tracking-wider drop-shadow-[0_0_20px_rgba(100,204,197,0.4)]">
          UNEXA
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#176B87]/20 transition-colors">
          <MessageCircle className="w-6 h-6 text-[#64CCC5]" />
        </button>
      </div>

      {/* Stories */}
      <div className="px-4 py-4 border-b border-[#176B87]/20">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {stories.map((story) => (
            <div key={story.id} className="flex flex-col items-center gap-2 flex-shrink-0">
              <div
                className={`w-16 h-16 rounded-full p-0.5 ${
                  story.hasNew
                    ? "bg-gradient-to-tr from-[#64CCC5] via-[#176B87] to-[#64CCC5]"
                    : "bg-[#176B87]/30"
                }`}
              >
                <div className="w-full h-full rounded-full bg-[#001C30] p-0.5">
                  <div className="w-full h-full rounded-full bg-[#176B87] flex items-center justify-center">
                    <span className="text-[#DAFFFB] text-lg font-semibold">
                      {story.username[0].toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              <span className="text-[#64CCC5] text-xs">{story.username}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            {/* Post Header */}
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#176B87] flex items-center justify-center">
                  <span className="text-[#DAFFFB] font-semibold">
                    {post.username[0].toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="text-[#DAFFFB] font-semibold">{post.username}</div>
                  <div className="text-[#64CCC5] text-xs">{post.timeAgo}</div>
                </div>
              </div>
              <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#176B87]/20 transition-colors">
                <MoreVertical className="w-5 h-5 text-[#64CCC5]" />
              </button>
            </div>

            {/* Post Image */}
            <div className="w-full aspect-square bg-gradient-to-br from-[#176B87]/20 to-[#64CCC5]/20 flex items-center justify-center">
              <ImageWithFallback
                src={`https://images.unsplash.com/photo-${
                  post.id === 1 ? "1506905925346-21bda4d32df4" : "1516116216624-53e697fedbea"
                }?w=600&h=600&fit=crop`}
                alt="Post"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Action Bar */}
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="hover:scale-110 transition-transform">
                  <Heart
                    className={`w-6 h-6 ${
                      post.isLiked ? "text-[#FF4D6A] fill-[#FF4D6A]" : "text-[#64CCC5]"
                    }`}
                  />
                </button>
                <button className="hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6 text-[#64CCC5]" />
                </button>
                <button className="hover:scale-110 transition-transform">
                  <Share2 className="w-6 h-6 text-[#64CCC5]" />
                </button>
              </div>
              <button className="hover:scale-110 transition-transform">
                <Bookmark
                  className={`w-6 h-6 ${
                    post.isSaved ? "text-[#64CCC5] fill-[#64CCC5]" : "text-[#64CCC5]"
                  }`}
                />
              </button>
            </div>

            {/* Likes & Caption */}
            <div className="px-4">
              <div className="text-[#DAFFFB] font-semibold mb-2">
                {post.likes.toLocaleString()} likes
              </div>
              <div className="text-[#DAFFFB]">
                <span className="font-semibold">{post.username}</span>{" "}
                <span className="text-[#64CCC5]">{post.caption}</span>
              </div>
              <button className="text-[#64CCC5]/70 text-sm mt-1">
                View all {post.comments} comments
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
