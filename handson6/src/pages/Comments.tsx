import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "../utils/AxiosInstance";
import { motion } from "framer-motion";

interface Comment {
  id: number;
  body: string;
  likes: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
}

interface CommentList {
  comments: Comment[];
}

const fetchComments = async () => {
  return await axios.get<CommentList>("/comments");
};

const CommentSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="w-full h-16 bg-gradient-to-r from-purple-300 to-pink-300 rounded-lg"></div>{" "}
      {/* Skeleton lebih berwarna */}
      <div className="w-2/3 h-6 bg-gradient-to-r from-blue-300 to-green-300 rounded"></div>
      <div className="w-1/2 h-4 bg-gradient-to-r from-yellow-300 to-orange-300 rounded"></div>
    </div>
  );
};

const Comments = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["Comments"],
    queryFn: fetchComments
  });
  const navigate = useNavigate();

  const handleCommentClick = (commentId: number) => {
    navigate(`/comments/${commentId}`);
  };

  const commentCardColors = [
    // Array warna untuk variasi kartu komentar
    "bg-gradient-to-br from-teal-100 to-lime-200",
    "bg-gradient-to-br from-blue-100 to-sky-200",
    "bg-gradient-to-br from-purple-100 to-pink-200",
    "bg-gradient-to-br from-orange-100 to-yellow-200",
    "bg-gradient-to-br from-green-100 to-emerald-200"
  ];

  const avatarColors = [
    // Array warna untuk variasi avatar
    "bg-gradient-to-br from-red-400 to-pink-500",
    "bg-gradient-to-br from-orange-400 to-yellow-500",
    "bg-gradient-to-br from-green-400 to-teal-500",
    "bg-gradient-to-br from-blue-400 to-indigo-500",
    "bg-gradient-to-br from-purple-400 to-violet-500"
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-purple-200 to-pink-200">
        {" "}
        {/* Latar belakang loading lebih lembut */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 animate-pulse">
            Memuat komentar...
          </h2>
          <CommentSkeleton />
          <CommentSkeleton />
          <CommentSkeleton />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-red-200 to-orange-200">
        {" "}
        {/* Latar belakang error lebih lembut */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-700 mb-6 animate-bounce">
            Gagal memuat komentar:
          </h2>
          <p className="text-red-700">
            {error instanceof Error
              ? error.message
              : "Kesalahan tidak diketahui"}
          </p>
        </div>
      </div>
    );
  }

  const commentVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 }, // Efek masuk lebih dinamis
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 10,
        delayChildren: 0.2,
        staggerChildren: 0.05
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
      zIndex: 1, // Menaikkan z-index saat hover
      boxShadow: "0 7px 20px rgba(0, 0, 0, 0.15)" // Bayangan lebih tebal saat hover
    }
  };

  const commentTextVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-200 to-green-200">
      {" "}
      {/* Latar belakang utama lebih lembut */}
      <div className="w-full max-w-4xl">
        <h1
          className="text-5xl font-extrabold text-gray-900 mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse" // Judul lebih besar dan tebal
          style={{
            WebkitTextFillColor: "transparent",
            WebkitBackgroundClip: "text"
          }}
        >
          Komentar Pengguna
        </h1>
        <div className="space-y-6">
          {data?.data.comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              className={`flex space-x-5 cursor-pointer ${
                commentCardColors[index % commentCardColors.length]
              } p-6 rounded-xl shadow-md transition-transform hover:shadow-xl border border-gray-100`} // Variasi warna kartu
              onClick={() => handleCommentClick(comment.id)}
              variants={commentVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <motion.div
                className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-semibold ${
                  avatarColors[index % avatarColors.length]
                }`} // Variasi warna avatar
                variants={commentTextVariants}
              >
                {comment.user.fullName.charAt(0).toUpperCase()}
              </motion.div>
              <div className="flex-1">
                <motion.h2
                  className="text-2xl font-semibold text-gray-900 mb-2" // Judul nama lebih menonjol
                  variants={commentTextVariants}
                >
                  {comment.user.fullName}
                </motion.h2>
                <motion.p
                  className="text-gray-800 mt-1 leading-relaxed" // Teks body lebih jelas
                  variants={commentTextVariants}
                >
                  {comment.body.slice(0, 100)}...{" "}
                  <span className="text-blue-600 font-medium hover:underline cursor-pointer">
                    Baca selengkapnya
                  </span>
                </motion.p>
                <motion.div
                  className="flex justify-between items-center mt-4 text-gray-700" // Info like lebih jelas
                  variants={commentTextVariants}
                >
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
                    {comment.likes} Suka
                  </span>
                  {/* Anda bisa menambahkan tombol like di sini dengan gaya yang sesuai */}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.button
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" // Tombol "Add" lebih menonjol
        onClick={() => navigate("./add")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          className="w-7 h-7" // Ikon "+" lebih besar
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
    </div>
  );
};

export default Comments;
