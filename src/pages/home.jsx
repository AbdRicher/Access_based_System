import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserHomePage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const response = await fetch("http://localhost:3000/type_details", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({})
        });

        if (response.ok) {
          const data = await response.json();
          setUserType(data.user.type); // Update state
          console.log("User Type:", data.user.type);
          


          if (data.user.type == "admin") {
            navigate("/admindashboard"); // Navigate immediately
          } else {
            console.log("User confirmed");
          }
        } else {
          console.log("Failed to fetch user type");
        }
      } catch (error) {
        console.error("Error fetching user type:", error);
      }
    };

    fetchUserType();
  }, [navigate]); // Ensure useEffect runs once

  // Logout function
  const handleLogout = async () => {
    await fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include",
    });
    navigate("/");
  };

  const handleAdmin = () => {
    navigate("/admindashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-indigo-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>

          {/* Show "Admin Dashboard" button only if userType is "admin" */}
          {userType === "admin" && (
            <button
              onClick={handleAdmin}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Admin Dashboard
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800">
            Hello, {userType === "admin" ? "Admin" : "User"}!
          </h2>
          <p className="mt-2 text-gray-600">This is your personal dashboard.</p>
        </div>
      </main>

      {/* Logout Button */}
      <footer className="bg-gray-200 py-4 flex justify-center">
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </footer>
    </div>
  );
};

export default UserHomePage;
