import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "../utils/AxiosInstance";
import { motion } from "framer-motion"; // Import Framer Motion

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

interface TodoList {
  todos: Todo[];
}

const fetchTodos = async () => {
  return await axios.get<TodoList>("/todos");
};

const TodoSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="w-full h-20 bg-gradient-to-r from-purple-300 to-pink-300 rounded-xl"></div>{" "}
      {/* Skeleton lebih berwarna */}
      <div className="w-2/3 h-6 bg-gradient-to-r from-blue-300 to-green-300 rounded"></div>
    </div>
  );
};

const Todos = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["Todos"],
    queryFn: fetchTodos
  });
  const navigate = useNavigate();

  const handleTodoClick = (todoId: number) => {
    navigate(`/todos/${todoId}/edit`);
  };

  const todoCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, type: "spring", stiffness: 70 }
    },
    hover: {
      scale: 1.03,
      backgroundColor: "rgba(255, 255, 255, 0.95)", // Efek hover lebih lembut
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.15)", // Bayangan hover lebih halus
      transition: { duration: 0.2 }
    }
  };

  const statusColors = {
    // Palet warna untuk status Todo
    completed: "text-green-500 bg-green-100",
    pending: "text-red-500 bg-red-100"
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-purple-100 to-pink-100">
        {" "}
        {/* Latar belakang loading lebih berwarna */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 animate-pulse">
            Memuat daftar tugas...
          </h2>{" "}
          {/* Teks loading lebih menonjol */}
          <TodoSkeleton />
          <TodoSkeleton />
          <TodoSkeleton />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-red-100 to-orange-100">
        {" "}
        {/* Latar belakang error lebih berwarna */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-700 mb-6 animate-bounce">
            Gagal memuat daftar tugas:
          </h2>{" "}
          {/* Teks error lebih menonjol */}
          <p className="text-red-700">
            {error instanceof Error
              ? error.message
              : "Kesalahan tidak diketahui"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-100 to-green-100">
      {" "}
      {/* Latar belakang utama lebih berwarna */}
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
          {" "}
          {/* Judul lebih besar dan beranimasi */}
          Daftar Tugas Anda
        </h1>
        <div className="space-y-6">
          {data?.data.todos.map((todo) => {
            const statusStyle = todo.completed
              ? statusColors.completed
              : statusColors.pending;
            return (
              <motion.div
                key={todo.id}
                className="flex items-center justify-between cursor-pointer bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-2 border-gray-100" // Kartu Todo lebih menonjol
                onClick={() => handleTodoClick(todo.id)}
                variants={todoCardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800 line-clamp-1">
                    {todo.todo}
                  </h2>{" "}
                  {/* Judul Todo lebih besar */}
                  <p
                    className={`mt-2 text-sm font-medium rounded-full py-1 px-2 w-fit ${statusStyle}`}
                  >
                    {" "}
                    {/* Status Todo lebih menonjol */}
                    {todo.completed ? "Selesai" : "Belum Selesai"}
                  </p>
                </div>
                <div className="ml-4">
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {" "}
                    {/* Ikon panah lebih jelas */}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <motion.button
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full p-4 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" // Tombol "Add Todo" lebih menonjol
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
    </div>
  );
};

export default Todos;
