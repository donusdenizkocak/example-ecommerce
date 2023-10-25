"use client"

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password})
    };
    fetch('http://localhost:3040/users/login', options)
      .then(response => response.json())
      .then(data => alert(data.firstName))
      .catch(error => console.error(error));
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <input type="text" className="mb-1 text-black" onChange={(e: any) => setEmail(e.target.value)} />
      <input type="password" className="mb-1 text-black" onChange={(e: any) => setPassword(e.target.value)}/>
      <button type="submit" onClick={handleLogin}>Login</button>
    </main>
  );
}
