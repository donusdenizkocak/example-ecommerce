"use client";

import { useState } from "react";
import axios from "axios";
import { error } from "console";

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
    <main className="flex min-h-screen flex-col items-center p-24">
      <input
        type="text"
        className="mb-1 text-black"
        onChange={(e: any) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="mb-1 text-black"
        onChange={(e: any) => setPassword(e.target.value)}
      />
      <button type="submit" onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Login
      </button>
      <hr />
      <button type="button" onClick={handleMe} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Doğrula
      </button>
    </main>
  );
}
