import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="text-center">
        <div className="text-9xl font-extrabold text-blue-600">404</div>
        <h1 className="mt-4 text-3xl font-bold text-gray-800">
          Oops! Page Not Found
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Sorry, the page you’re looking for doesn’t exist.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            to="/dashboard"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-lg font-medium text-white shadow-md hover:bg-blue-700 focus:ring focus:ring-blue-300"
          >
            Dashboard
          </Link>
          <Link
            to="/"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-lg font-medium text-white shadow-md hover:bg-blue-700 focus:ring focus:ring-blue-300"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
