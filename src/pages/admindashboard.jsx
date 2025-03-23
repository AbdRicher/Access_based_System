import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Admindashboard = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        fetch("http://localhost:3000/type_details", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({})
      });
        const data = await response.json();

        if (data.user.type === "admin") {
          setIsAdmin(true);
        } else {
          navigate("/home"); // Redirect users to home if not admin
        }
      } catch (error) {
        navigate("/home");
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [navigate]); // Dependency added to prevent unnecessary re-renders

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    navigate("/");
  };

  // Navigate to user info page
  const handleUserInfo = () => {
    navigate("/home");
  };

  if (loading) return <h2 className="text-center mt-10 text-lg">Loading...</h2>;

  return isAdmin ? (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-indigo-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800">Hello, Admin!</h2>
          <p className="mt-2 text-gray-600">This is your admin dashboard.</p>
        </div>
      </main>

      {/* Buttons Section */}
      <div className="max-w-7xl mx-auto flex justify-center gap-4 mt-4">
       

        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Logout
        </button>
        <button
          onClick={handleUserInfo}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          User Info
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-gray-200 py-4 mt-8">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          &copy; 2025 Admin Dashboard. All rights reserved.
        </div>
      </footer>
    </div>
  ) : null;
};

export default Admindashboard;
