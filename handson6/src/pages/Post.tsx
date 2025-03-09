import { useQuery } from "@tanstack/react-query";
import axios from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reaction;
  views: number;
  userId: number;
}

interface Reaction {
  likes: number;
  dislikes: number;
}

interface PostList {
  posts: Post[];
}

const fetchPostList = async () => {
  return await axios.get<PostList>("/post");
};

const PostSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="w-full h-24 bg-gradient-to-r from-purple-300 to-pink-300 rounded-xl"></div>{" "}
      {/* Skeleton lebih berwarna */}
      <div className="w-2/3 h-6 bg-gradient-to-r from-blue-300 to-green-300 rounded"></div>
      <div className="w-1/2 h-4 bg-gradient-to-r from-yellow-300 to-orange-300 rounded"></div>
    </div>
  );
};

const Post = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["Post"],
    queryFn: fetchPostList
  });
  const navigate = useNavigate();

  const handlePostClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  const cardGradients = [
    // Array gradien untuk variasi kartu pos
    "bg-gradient-to-br from-purple-100 to-pink-200",
    "bg-gradient-to-br from-blue-100 to-sky-200",
    "bg-gradient-to-br from-green-100 to-lime-200",
    "bg-gradient-to-br from-yellow-100 to-orange-200",
    "bg-gradient-to-br from-red-100 to-rose-200",
    "bg-gradient-to-br from-teal-100 to-cyan-200"
  ];

  const tagColors = [
    // Array warna untuk variasi tag
    "bg-purple-200 text-purple-800",
    "bg-blue-200 text-blue-800",
    "bg-green-200 text-green-800",
    "bg-yellow-200 text-yellow-800",
    "bg-red-200 text-red-800",
    "bg-teal-200 text-teal-800"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2, // Delay anak lebih singkat
        staggerChildren: 0.1 // Stagger anak lebih singkat
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.95 }, // Efek masuk lebih halus
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        type: "spring",
        damping: 15
      } // Animasi lebih cepat dan springy
    },
    hover: {
      scale: 1.05, // Skala hover lebih besar
      shadow: "lg", // Bayangan hover lebih jelas
      transition: { duration: 0.2 }
    }
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-100 to-purple-100" // Latar belakang lebih berwarna
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full max-w-4xl">
        <motion.h1
          className="text-5xl font-extrabold text-gray-900 mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700 animate-pulse" // Judul lebih besar dan beranimasi
          style={{
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Daftar Postingan
        </motion.h1>
        <div className="space-y-8">
          {isLoading ? (
            <>
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </>
          ) : isError ? (
            <div className="text-center text-red-600 font-semibold text-lg">
              Error:{" "}
              {error instanceof Error
                ? error.message
                : "Kesalahan tidak diketahui"}
            </div> // Pesan error lebih jelas
          ) : (
            data?.data.posts.map((post, index) => {
              const cardGradient = cardGradients[index % cardGradients.length]; // Pilih gradien kartu berdasarkan index
              return (
                <motion.div
                  key={post.id}
                  className={`rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300 ${cardGradient} ring-1 ring-gray-100`} // Variasi gradien kartu dan border
                  onClick={() => handlePostClick(post.id)}
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3 hover:text-indigo-700 transition-colors duration-200">
                    {post.title}
                  </h2>{" "}
                  {/* Judul lebih menonjol dan hover effect */}
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {post.body.slice(0, 150)}...
                  </p>{" "}
                  {/* Body text lebih jelas */}
                  <div className="flex flex-wrap mb-4">
                    {post.tags.map((tag, tagIndex) => {
                      const tagColor = tagColors[tagIndex % tagColors.length]; // Pilih warna tag berdasarkan tagIndex
                      return (
                        <motion.span
                          key={tagIndex}
                          className={`px-3 py-1 rounded-full text-sm mr-2 mb-2 ${tagColor} font-medium ring-1 ring-opacity-50 ring-inset`} // Variasi warna tag dan style lebih menonjol
                          variants={tagVariants}
                        >
                          {tag}
                        </motion.span>
                      );
                    })}
                  </div>
                  <div className="flex justify-between items-center text-gray-700 font-medium">
                    {" "}
                    {/* Info reaksi dan views lebih jelas */}
                    <div className="flex space-x-4">
                      <span className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-1 text-red-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        {post.reactions.likes} Suka
                      </span>
                      <span className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-1 text-blue-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.828 5.172a4 4 0 01-5.656 0L10 6.343l-1.172-1.171a4 4 0 11-5.656 5.656L10 17.657l6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        {post.reactions.dislikes} Tidak Suka
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold">{post.views}</span> Kali
                      Dilihat
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>

      <motion.button
        className="fixed bottom-6 right-6 bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" // Tombol "Add Post" lebih menonjol
        onClick={() => navigate("./add")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
      </motion.button>
    </motion.div>
  );
};

export default Post;
