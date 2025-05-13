import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3efe6]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">☕ Create an Account</h2>

        <form>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
            <input type="text" className="w-full border rounded px-3 py-2" placeholder="John Doe" />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input type="email" className="w-full border rounded px-3 py-2" placeholder="you@example.com" />
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input type="password" className="w-full border rounded px-3 py-2" placeholder="••••••••" />
          </div>

          <button type="submit" className="w-full bg-brown-700 text-white py-2 rounded hover:bg-brown-800">
            Register
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account? <Link to="/login" className="text-brown-700 underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
