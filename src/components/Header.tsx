import React from "react";
import { FaSearch, FaSun, FaMoon } from "react-icons/fa";

interface headerProps {
    isDarkMode: boolean;
    surface: string;
    border: string;
    text: string;
    subText: string;
    searchWrap: string;
    searchTerm: string;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    toggleDarkMode: () => void;
}

const Header = ({
    isDarkMode,
    surface,
    border,
    text,
    subText,
    searchWrap,
    searchTerm,
    handleSearch,
    toggleDarkMode,
}: headerProps) => {

  return (
    <header
      className={`sticky top-0 z-10 ${surface} border-b ${border} px-6 py-4 shadow-sm backdrop-blur-sm`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* App Title */}
        <h1
          className={`text-2xl font-extrabold tracking-tight ${text} shrink-0`}
        >
          <span className="text-indigo-500">✓</span> Todo List
        </h1>

        {/* Search + Toggle */}
        <div className="flex items-center gap-3 flex-1 justify-end">
          {/* Search Field */}
          <div
            className={`flex items-center gap-2 border ${searchWrap} rounded-xl px-3 py-2 w-64 transition-colors duration-300`}
          >
            <FaSearch className={`shrink-0 text-sm ${subText}`} />
            <input
              type="search"
              placeholder="Search todos…"
              className={`bg-transparent outline-none text-sm w-full ${text}`}
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm border transition-all duration-200 active:scale-95 cursor-pointer
                        ${
                          isDarkMode
                            ? "bg-indigo-500 hover:bg-indigo-600 text-white border-indigo-500"
                            : "bg-gray-900 hover:bg-gray-800 text-white border-gray-900"
                        }`}
          >
            {isDarkMode ? <FaSun className="text-yellow-300" /> : <FaMoon />}
            {isDarkMode ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
