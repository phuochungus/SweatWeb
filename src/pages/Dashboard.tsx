import { useState } from "react";
import { auth } from "../config/firebase";
import { signOut, deleteUser } from "firebase/auth";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardProps {
  user: {
    email: string | null;
    displayName: string | null;
  };
}

const Dashboard = ({ user }: DashboardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Successfully logged out!");
    } catch (error) {
      toast.error("Failed to logout");
      console.error(error);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error("No user found");
      }

      const response = await fetch(`https://api.sweat-app.tech/api/v1/users`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${await currentUser.getIdToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete account data");
      }

      await deleteUser(currentUser);
      toast.success("Account successfully deleted");
    } catch (error) {
      toast.error("Failed to delete account");
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 to-orange-200 py-12 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="w-20 h-20 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center shadow-sm"
              >
                <span className="text-3xl font-extrabold text-orange-500 select-none">
                  {user.displayName?.[0]?.toUpperCase() || "U"}
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-extrabold text-orange-500"
              >
                Welcome, {user.displayName || "User"}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-600 mt-2"
              >
                {user.email}
              </motion.p>
            </div>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="w-full bg-orange-500 text-white py-3 px-4 rounded-xl hover:bg-orange-600 transition-all duration-200 shadow-sm font-semibold"
              >
                Logout
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="w-full bg-red-500 text-white py-3 px-4 rounded-xl hover:bg-red-600 transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                <AnimatePresence mode="wait">
                  {isDeleting ? (
                    <motion.span
                      key="deleting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Deleting Account...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="delete"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Delete Account
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
