"use client"

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const handleLogin = () => {
    axios
      .post("http://localhost:3040/users/login", { email, password })
      .then((response: any) => {
        console.log(response.data);
        setToken(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMe = () => {
    axios.defaults.baseURL = 'http://localhost:3040/';
    axios.defaults.headers.common['Authorization'] = token;
    axios
      .get("users/me")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-white">
      <input
        type="text"
        className="mb-1 text-black border border-gray-600 px-3 py-1"
        onChange={(e: any) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        type="password"
        className="mb-1 text-black border border-gray-600 px-3 py-1"
        onChange={(e: any) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button type="submit" onClick={handleLogin} className="text-black">
        Login
      </button>
      <hr />
      <button type="button" onClick={handleMe} className="text-black">
        Doğrula
      </button>
    </main>
  )
}
