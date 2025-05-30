import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import logo from "../assets/logo-app.png";

const Login = () => {
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Successfully logged in!");
    } catch (error) {
      toast.error("Failed to login with Google");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-200 p-4">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center mb-6"
          >
            <img
              src={logo}
              alt="Sweat App Logo"
              className="w-24 h-24 mb-2 drop-shadow-lg animate-fade-in"
              style={{
                filter: "drop-shadow(0 4px 12px rgba(255, 140, 0, 0.15))",
              }}
            />
            <h1 className="text-3xl font-extrabold text-orange-500 mb-1">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to continue your journey</p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border border-orange-300 rounded-xl px-6 py-3 text-orange-700 hover:bg-orange-50 hover:border-orange-400 transition-all duration-200 shadow-sm font-semibold"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-6 h-6"
            />
            <span>Sign in with Google</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-center text-sm text-gray-500"
          >
            By signing in, you agree to our{" "}
            <span className="text-orange-500 font-medium">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-orange-500 font-medium">Privacy Policy</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
