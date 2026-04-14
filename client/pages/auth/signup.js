import { useState } from 'react';
import axios from 'axios';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/users/signup', {
        email,
        password,
      });
      console.log(response.data);
      setErrors([]);
    } catch (err) {
      setErrors(err.response?.data?.errors || [{ message: 'Something went wrong' }]);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {errors.length > 0 && (
        <div className="mb-4 p-4 border border-red-400 bg-red-50 rounded">
          <h4 className="font-semibold text-red-700 mb-2">
            Ooops....
          </h4>
          <ul className="list-disc list-inside text-red-600 text-sm">
            {errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      )}

      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Sign Up
      </button>
    </form>
  );
}
