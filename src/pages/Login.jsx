import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3efe6]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">☕ Coffee Login</h2>

        <form>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input type="email" className="w-full border rounded px-3 py-2" placeholder="you@example.com" />
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input type="password" className="w-full border rounded px-3 py-2" placeholder="••••••••" />
          </div>

          <button type="submit" className="w-full bg-brown-700 text-white py-2 rounded hover:bg-brown-800">
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account? <Link to="/register" className="text-brown-700 underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
