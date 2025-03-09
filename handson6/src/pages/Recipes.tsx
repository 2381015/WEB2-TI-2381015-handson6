import { useQuery } from "@tanstack/react-query";
import axios from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instruction: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  serving: number;
  difficulty: string;
  cuisine: string;
  caloriesPerserving: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

interface RecipesList {
  recipes: Recipe[];
}

const difficultyColors = {
  easy: "bg-green-100 text-green-700 ring-green-500/50",
  medium: "bg-yellow-100 text-yellow-700 ring-yellow-500/50",
  hard: "bg-red-100 text-red-700 ring-red-500/50"
};

const cardBackgroundGradients = [
  "bg-gradient-to-br from-teal-50 to-lime-100",
  "bg-gradient-to-br from-blue-50 to-sky-100",
  "bg-gradient-to-br from-purple-50 to-pink-100",
  "bg-gradient-to-br from-orange-50 to-yellow-100",
  "bg-gradient-to-br from-green-50 to-emerald-100",
  "bg-gradient-to-br from-rose-50 to-fuchsia-100",
  "bg-gradient-to-br from-cyan-50 to-sky-100"
];

const RecipeCard: React.FC<Recipe> = (recipe: Recipe) => {
  const difficultyStyle =
    difficultyColors[
      recipe.difficulty.toLowerCase() as keyof typeof difficultyColors
    ] || "bg-gray-100 text-gray-700";
  const cardGradient =
    cardBackgroundGradients[recipe.id % cardBackgroundGradients.length]; // Variasi background cards

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ${cardGradient} ring-1 ring-gray-100`} // Kartu resep dengan variasi gradien dan border tipis
      whileHover={{ scale: 1.05 }}
    >
      <img
        alt={recipe.name}
        src={recipe.image}
        className="aspect-square w-full rounded-t-xl object-cover transition-transform duration-300 group-hover:scale-105 lg:aspect-auto lg:h-72"
      />

      <div className="p-5 flex flex-col justify-between h-56">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 hover:text-indigo-700 transition-colors duration-200 line-clamp-2">
            <a href="#">
              {" "}
              {/* Tambahkan href jika diperlukan */}
              <span aria-hidden="true" className="absolute inset-0" />
              {recipe.name}
            </a>
          </h3>
          <div className="flex items-center mt-3">
            <p className="text-sm text-gray-700 mr-1">{recipe.rating}</p>
            <svg
              className="w-5 h-5 text-yellow-500 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-.181h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm text-gray-600">
              ({recipe.reviewCount} ulasan)
            </span>
          </div>
        </div>
        <p
          className={`text-sm font-medium rounded-full py-1.5 px-3 w-fit ring-1 ring-opacity-50 ${difficultyStyle} ring-inset`} // Style badge kesulitan lebih menonjol
        >
          {recipe.difficulty}
        </p>
      </div>
    </motion.div>
  );
};

const fetchRecipesList = async () => {
  return await axios.get<RecipesList>("/recipes");
};

const RecipesSkeleton = () => {
  return (
    <div className="group relative animate-pulse rounded-xl shadow-md bg-white ring-1 ring-gray-100">
      {" "}
      {/* Skeleton konsisten dengan card */}
      {/* Image Placeholder */}
      <div className="aspect-square w-full rounded-t-xl bg-gray-200 lg:aspect-auto lg:h-72"></div>
      <div className="p-5">
        {/* Title Placeholder */}
        <div className="h-7 bg-gray-200 rounded mb-3 w-3/4"></div>
        {/* Description Placeholder */}
        <div className="h-5 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
  );
};

const Recipes = () => {
  const getRecipesList = useQuery({
    queryKey: ["recipeList"],
    queryFn: fetchRecipesList
  });
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.08 // Stagger lebih cepat untuk tampilan lebih dinamis
      }
    }
  };

  const cardVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.9 }, // Efek masuk lebih dramatis
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        type: "spring",
        damping: 10, // Damping lebih rendah untuk animasi lebih bouncy
        stiffness: 80 // Stiffness lebih rendah untuk animasi lebih bouncy
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-lime-50 to-blue-100 py-14" // Background lebih cerah dan segar
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-6">
        <div className="mb-12 flex justify-between items-center">
          {" "}
          {/* Margin bottom header lebih besar */}
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-700">
            {" "}
            {/* Judul lebih intens */}
            Temukan Resep Lezat
          </h1>
          <motion.button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full py-2.5 px-5 shadow-md transition-colors duration-300 ring-2 ring-indigo-300 hover:ring-indigo-400 focus:outline-none focus:ring-indigo-500" // Tombol "Add Recipe" lebih standout
            onClick={() => navigate("./add")}
            whileHover={{ scale: 1.1 }} // Skala hover tombol lebih besar
            whileTap={{ scale: 0.95 }}
          >
            Buat Resep Baru
          </motion.button>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {getRecipesList.isFetching ? (
            Array.from({ length: 12 }).map((_, index) => (
              <RecipesSkeleton key={index} />
            ))
          ) : getRecipesList.isError ? (
            <div className="text-red-700 col-span-full text-center font-semibold text-lg">
              Gagal memuat resep. Silakan coba lagi nanti.
            </div>
          ) : (
            getRecipesList.data?.data.recipes.map((recipe) => (
              <motion.div
                key={recipe.id}
                className="cursor-pointer"
                onClick={() => navigate(`/recipes/${recipe.id}`)}
                variants={cardVariants}
              >
                <RecipeCard {...recipe} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Recipes;
