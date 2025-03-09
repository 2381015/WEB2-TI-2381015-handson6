import { useMutation } from "@tanstack/react-query";
import axios from "../utils/AxiosInstance";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecipeForm, { Recipe } from "../components/RecipeForm";
import { motion } from "framer-motion";

const addRecipe = async (data: Recipe) => {
  return await axios.post("/recipes/add", data);
};

const AddRecipes = () => {
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: addRecipe
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/recipes", { replace: true });
    }
  }, [isSuccess]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const formVariants = {
    hover: { scale: 1.02, transition: { duration: 0.3 } }
  };

  const loadingOverlayVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const loadingContentVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4, delay: 0.1, type: "spring", damping: 15 }
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-lime-100 to-blue-100" // Background gradient lebih cerah
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="relative bg-white/95 p-8 rounded-3xl shadow-2xl w-full max-w-lg border border-gray-200 backdrop-blur-sm" // Form container dengan backdrop blur dan border lembut
        variants={formVariants}
        whileHover="hover"
      >
        {isPending && (
          <motion.div
            className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center"
            variants={loadingOverlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.div
              className="flex items-center bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4 rounded-xl shadow-xl" // Loading box dengan gradient
              variants={loadingContentVariants}
              initial="initial"
              animate="animate"
            >
              <span className="text-white text-xl mr-4 font-semibold">
                Menambahkan Resep...
              </span>
              <svg
                className="animate-spin h-6 w-6 text-white"
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
          className="text-3xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 animate-pulse" // Judul dengan gradient text
          style={{
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Buat Resep Baru
        </motion.h2>
        <RecipeForm isEdit={false} mutateFn={mutate} />
      </motion.div>
    </motion.div>
  );
};

export default AddRecipes;
