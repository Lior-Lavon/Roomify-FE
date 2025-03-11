import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-9xl font-extrabold text-orange-600">404</h1>
      <h2 className="text-3xl font-bold mt-4">Oops! Page not found</h2>
      <p className="text-gray-600 mt-2 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved. Try going
        back to the homepage.
      </p>

      {/* SVG Illustration */}
      <div className="w-96 h-60 mt-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-full h-full text-gray-500"
        >
          <path
            fillRule="evenodd"
            d="M11.293 1.293a1 1 0 011.414 0l10 10a1 1 0 01-1.414 1.414L20 11.414V20a3 3 0 01-3 3H7a3 3 0 01-3-3v-8.586l-.293.293a1 1 0 01-1.414-1.414l10-10zM9 21v-5a1 1 0 112 0v5h4v-5a1 1 0 112 0v5h2a1 1 0 001-1v-9.586l-7-7-7 7V20a1 1 0 001 1h2z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-4 py-1 bg-orange-600 text-white text-lg rounded-lg shadow-md transition duration-300 cursor-pointer"
      >
        Home
      </button>
    </div>
  );
};

export default NotFound;
