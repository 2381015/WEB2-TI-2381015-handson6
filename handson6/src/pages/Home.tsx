import { motion } from "framer-motion";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3, // Lebih cepat sedikit
        duration: 0.8,
        staggerChildren: 0.3 // Stagger lebih cepat
      }
    }
  };

  const titleVariants = {
    hidden: { y: -80, opacity: 0 }, // Efek masuk dari atas lebih dramatis
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.2 } // Animasi lebih cepat
    }
  };

  const quoteVariants = {
    hidden: { opacity: 0, scale: 0.7 }, // Skala awal lebih kecil
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.6,
        type: "spring",
        stiffness: 80
      } // Animasi quote lebih bouncy
    }
  };

  const itemVariants = {
    hidden: { y: 80, opacity: 0 }, // Efek masuk dari bawah lebih dramatis
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" } // Animasi lebih cepat
    },
    hover: {
      y: -10, // Efek hover naik sedikit
      scale: 1.05,
      boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.2)", // Bayangan hover lebih kuat dan vertikal
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  const quotes = [
    {
      text: "Sukses bukanlah kunci kebahagiaan. Kebahagiaan adalah kunci kesuksesan. Jika Anda mencintai apa yang Anda lakukan, Anda akan berhasil.",
      author: "Albert Schweitzer"
    },
    {
      text: "Jangan pernah menyerah pada mimpi hanya karena waktu yang dibutuhkan untuk mewujudkannya. Waktu akan berlalu bagaimanapun juga.",
      author: "Earl Nightingale"
    },
    {
      text: "Mimpi tidak menjadi kenyataan melalui sihir; dibutuhkan keringat, tekad, dan kerja keras.",
      author: "Colin Powell"
    }
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-lime-50 to-cyan-50 flex flex-col justify-center items-center p-8" // Latar belakang gradien lebih segar
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative rounded-3xl bg-white/95 shadow-2xl p-10 md:p-16 max-w-5xl border border-gray-100 backdrop-blur-sm">
        {" "}
        {/* Container utama dengan backdrop blur dan border */}
        <motion.h1
          className="text-6xl font-extrabold text-gray-900 mb-6 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700" // Judul lebih besar dan intens
          style={{
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
          variants={titleVariants}
        >
          Selamat Datang!
        </motion.h1>
        <motion.blockquote
          className="text-2xl italic text-gray-700 mb-12 text-center max-w-4xl leading-relaxed" // Quote lebih besar dan leading lebih relaxed
          variants={quoteVariants}
        >
          "<i>{randomQuote.text}</i>" <br />
          <footer className="mt-3 text-lg text-gray-600 font-semibold">
            — {randomQuote.author}
          </footer>
        </motion.blockquote>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12" // Gap grid lebih besar dan responsif
          style={{ width: "100%" }}
          variants={containerVariants}
        >
          <motion.div
            className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300 border-2 border-blue-200 hover:border-blue-300" // Kartu item dengan gradien dan border lebih jelas
            variants={itemVariants}
            whileHover="hover"
          >
            <div className="p-4 rounded-full bg-blue-500 mb-5 shadow-md">
              {" "}
              {/* Container ikon lebih menonjol */}
              <svg
                className="h-14 w-14 text-white" // Ikon lebih besar dan warna putih
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 4.75 7.5 4.75a8.286 8.286 0 00-8.286 8.286c0 1.85.699 3.558 1.85 4.853a12.73 12.73 0 006.276 1.042.75.75 0 01.224 1.447l-.009.003h.024a.75.75 0 01.215 1.447zm11.734 0a12.71 12.71 0 00-6.276 1.042.75.75 0 01-.224 1.447l.009.003h-.024a.75.75 0 01-.215 1.447z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Web Programming 2
            </h3>
            <p className="text-gray-700 text-lg">Jeremy Panjaitan</p>{" "}
            {/* Teks deskripsi lebih besar */}
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300 border-2 border-green-200 hover:border-green-300" // Kartu item kedua dengan gradien hijau
            variants={itemVariants}
            whileHover="hover"
          >
            <div className="p-4 rounded-full bg-green-500 mb-5 shadow-md">
              {" "}
              {/* Container ikon hijau */}
              <svg
                className="h-14 w-14 text-white" // Ikon putih
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 13.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19.75 7.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10.25 7.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.625 16.375a1.5 1.5 0 01-3 0 1.5 1.5 0 013 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Daniel Chandra Putra Hutabarat
            </h3>
            <p className="text-gray-700 text-lg">Teknik Informatika</p>{" "}
            {/* Teks deskripsi lebih besar */}
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300 border-2 border-purple-200 hover:border-purple-300" // Kartu item ketiga dengan gradien ungu
            variants={itemVariants}
            whileHover="hover"
          >
            <div className="p-4 rounded-full bg-purple-500 mb-5 shadow-md">
              {" "}
              {/* Container ikon ungu */}
              <svg
                className="h-14 w-14 text-white" // Ikon putih
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Mid Project
            </h3>
            <p className="text-gray-700 text-lg">
              Universitas Advent Indonesia
            </p>{" "}
            {/* Teks deskripsi lebih besar */}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
