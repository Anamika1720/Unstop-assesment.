import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="flex flex-col items-center justify-center h-[538px] bg-gray-50 px-4 py-4">
      {/* Heading */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome to <p className="text-purple-600">Unstop</p>
        </h1>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6 w-full max-w-xs sm:max-w-sm md:max-w-md flex flex-col items-center text-center gap-4">
        <img
          src={user.image}
          alt={user.firstName}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full"
        />
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">{user.email}</p>
        <p className="text-gray-600 text-sm sm:text-base capitalize">
          {user.gender}
        </p>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-4 sm:mt-6 bg-purple-500 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-xl hover:bg-purple-600 transition w-full sm:w-auto cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
