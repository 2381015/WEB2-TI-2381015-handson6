import { useMutation } from "@tanstack/react-query";
import axios from "../utils/AxiosInstance";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodosForm, { TodoData } from "../components/TodosForm";
import { motion } from "framer-motion"; // Import Framer Motion

// Function to send todo to backend
const addTodo = async (data: TodoData) => {
  return await axios.post("/todos/add", data);
};

const AddTodos = () => {
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: addTodo
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/todos", { replace: true });
    }
  }, [isSuccess, navigate]);

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6, // Sedikit lebih lambat untuk transisi yang lebih halus
        ease: "easeInOut"
      }
    }
  };

  const loadingOverlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4 } // Sedikit lebih lambat untuk transisi yang lebih halus
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

  const formContainerVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.3 },
      boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.15)" // Bayangan form container lebih halus saat hover
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 to-indigo-200" // Latar belakang gradien lebih lembut dan berwarna
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {isPending && (
        <motion.div
          className="absolute inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center"
          variants={loadingOverlayVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="flex items-center bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-4 rounded-xl shadow-xl" // Loading box dengan gradient warna
            variants={loadingContentVariants}
            initial="hidden"
            animate="visible"
          >
            <span className="text-white text-xl font-semibold">
              Menambahkan Tugas...
            </span>{" "}
            {/* Teks loading lebih jelas */}
            <svg
              className="animate-spin h-6 w-6 text-white ml-3" // Spinner loading warna putih
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

      <motion.div
        className="w-full max-w-md bg-white/95 p-8 rounded-3xl shadow-2xl border border-gray-200 backdrop-blur-sm" // Form container dengan backdrop blur dan border lembut
        variants={formContainerVariants}
        whileHover="hover"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-8 animate-pulse">
          {" "}
          {/* Judul dengan gradient text dan animasi */}
          Tambah Tugas Baru
        </h2>
        <TodosForm isEdit={false} mutateFn={mutate} />
      </motion.div>
    </motion.div>
  );
};

export default AddTodos;
