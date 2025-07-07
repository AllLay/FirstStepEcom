"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AccountCenter() {
  const { user, token, logout, setUser } = useAuth();
  const router = useRouter();

  const [nameInput, setNameInput] = useState(user?.name || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  useEffect(() => {
    setNameInput(user?.name || "");
  }, [user]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleUsernameUpdate = async () => {
    setMessage("");
    setError("");

    if (!nameInput.trim()) {
      setError("Username cannot be empty.");
      return;
    }
    if (nameInput === user?.name) {
      setMessage("No changes detected.");
      return;
    }

    try {
      const res = await axios.patch(
        "http://localhost:5000/api/private/user",
        { name: nameInput },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      setUser(res.data);
      setMessage("Username updated successfully!");
    } catch (err: unknown) {
      if (err.response?.status === 409) {
        setError("That username is already taken.");
      } else {
        setError("Failed to update username.");
        console.error(err);
      }
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <main className="min-h-screen bg-gray-100 flex">
      <section className="w-64 bg-white p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-6">Account Menu</h2>
        <ul className="space-y-4 text-gray-700 font-medium">
          <li className="text-black font-semibold cursor-default">Profile</li>
          <li className="cursor-pointer text-red-600 hover:text-red-800" onClick={handleLogout}>Logout</li>
        </ul>
      </section>

      <section className="flex-1 p-10">
        <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
        <div className="space-y-4 text-gray-700 max-w-md">
          <div>
            <label className="block font-semibold">Username</label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>
          <button
            onClick={handleUsernameUpdate}
            className="bg-black text-white px-4 py-2 rounded hover:bg-opacity-90"
          >
            Save Changes
          </button>
          {message && <p className="text-green-600">{message}</p>}
          {error && <p className="text-red-600">{error}</p>}
        </div>
      </section>
    </main>
  );
}