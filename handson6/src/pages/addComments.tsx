import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/AxiosInstance";
import { motion } from "framer-motion";

interface CommentInput {
  body: string;
  postId: number;
  userId: number;
}

const addComment = async (data: CommentInput) => {
  return await axios.post("/comments/add", data);
};

const AddComment = () => {
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState(1);
  const [postId, setPostId] = useState(1);
  const navigate = useNavigate();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: addComment
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (comment.trim() === "") return;
    mutate({ body: comment, userId, postId });
  };

  if (isSuccess) {
    navigate("/comments", { replace: true });
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.6, // Sedikit lebih lambat untuk kesan lebih halus
        type: "spring",
        stiffness: 100, // Sedikit kurang kaku
        damping: 15 // Sedikit lebih banyak damping
      }
    }
  };

  const formVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.3 },
      boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)" // Bayangan lebih halus saat hover form
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)", // Bayangan lebih tebal untuk tombol
      transition: { duration: 0.3 }
    },
    disabled: {
      cursor: "not-allowed",
      opacity: 0.7 // Opacity saat disabled
    }
  };

  const inputVariants = {
    focus: {
      boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.15)", // Bayangan fokus lebih jelas
      scale: 1.01, // Efek skala halus saat fokus
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-br from-purple-200 via-pink-200 to-orange-200" // Warna latar belakang lebih lembut dan cerah
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white/95 p-8 rounded-3xl shadow-2xl w-full max-w-lg border border-gray-200 backdrop-blur-md" // Form dengan backdrop blur dan border lebih lembut
        variants={formVariants}
        whileHover="hover"
      >
        <motion.h2
          className="text-3xl font-extrabold text-center text-gray-900 mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse" // Judul lebih menonjol dengan gradien lebih intens
          style={{
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
          initial={{ opacity: 0, y: -30 }} // Animasi masuk judul sedikit diubah
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: 0.2 }
          }} // Delay agar sinkron dengan container
        >
          Tambahkan Komentar Baru
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 mb-8">
          {" "}
          {/* Margin bawah diperbesar */}
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="userId"
            >
              ID Pengguna
            </label>
            <motion.input
              type="number"
              id="userId"
              value={userId}
              onChange={(e: any) => setUserId(Number(e.target.value))}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all text-gray-800" // Input lebih berwarna dengan ring fokus ungu
              variants={inputVariants}
              whileFocus="focus"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="postId"
            >
              ID Postingan
            </label>
            <motion.input
              type="number"
              id="postId"
              value={postId}
              onChange={(e: any) => setPostId(Number(e.target.value))}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all text-gray-800" // Input lebih berwarna dengan ring fokus ungu
              variants={inputVariants}
              whileFocus="focus"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="comment"
            >
              Komentar Anda
            </label>
            <motion.textarea
              id="comment"
              value={comment}
              onChange={(e: any) => setComment(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all resize-none text-gray-800" // Textarea lebih berwarna dengan ring fokus ungu
              variants={inputVariants}
              whileFocus="focus"
            />
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={isPending}
          className="w-full py-4 font-semibold rounded-xl shadow-md transition-all duration-200 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed" // Tombol gradien lebih cerah dan warna disabled lebih jelas
          variants={buttonVariants}
          whileHover="hover"
          style={isPending ? { cursor: "not-allowed" } : {}}
        >
          {isPending ? "Menambahkan..." : "Tambah Komentar"}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default AddComment;
