import { useMutation } from "@tanstack/react-query";
import axios from "../utils/AxiosInstance";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import { motion } from "framer-motion";

interface postDat {
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

const addPost = async (data: postDat) => {
  return await axios.post("/posts/add", data);
};

const AddPost = () => {
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: addPost
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/posts", { replace: true });
    }
  }, [isSuccess, navigate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6, // Sedikit lebih lambat
        ease: "easeInOut"
      }
    }
  };

  const formVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.3 },
      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)" // Bayangan lebih halus saat hover form
    }
  };

  const loadingOverlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4 } // Sedikit lebih lambat
    }
  };

  const loadingContentVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, delay: 0.2, type: "spring", damping: 12 } // Animasi loading lebih springy
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200" // Latar belakang gradien lebih lembut dan berwarna
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="relative w-full max-w-lg p-8 bg-white/95 shadow-2xl rounded-3xl border border-gray-200 backdrop-blur-md" // Card dengan backdrop blur dan border lembut
        variants={formVariants}
        whileHover="hover"
      >
        {isPending && (
          <motion.div
            className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center rounded-3xl" // Overlay loading dengan backdrop blur lebih transparan
            variants={loadingOverlayVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="flex items-center bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4 rounded-xl shadow-xl" // Loading box dengan gradient warna
              variants={loadingContentVariants}
              initial="hidden"
              animate="visible"
            >
              <span className="text-white text-xl mr-4 font-semibold">
                Menambahkan Postingan...
              </span>{" "}
              {/* Teks loading lebih jelas */}
              <svg
                className="animate-spin h-6 w-6 text-white" // Spinner loading warna putih
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </motion.div>
          </motion.div>
        )}
        <motion.h2
          className="text-3xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse"
          style={{
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Buat Postingan Baru
        </motion.h2>
        <PostForm isEdit={false} mutateFn={mutate} />
      </motion.div>
    </motion.div>
  );
};

export default AddPost;
