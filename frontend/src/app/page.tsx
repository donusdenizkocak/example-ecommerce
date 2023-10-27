"use client";

import { use, useEffect, useState } from "react";
import axios from "axios";
import { List } from "postcss/lib/list";
import { log } from "console";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [user, setUser] = useState<any>({});
  const [products, setProducts] = useState<any>([]);

  const handleLogin = () => {
    axios
      .post("http://localhost:3040/users/login", { email, password })
      .then((response: any) => {
        setToken(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (token !== "") me();
  }, [token]);

  useEffect(() => {
    axios
      .get("http://localhost:3040/products")
      .then((response: any) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const me = () => {
    axios.defaults.baseURL = "http://localhost:3040/";
    axios.defaults.headers.common["Authorization"] = token;
    axios
      .get("users/me")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddProduct = (k: any) => {
    if (k.quantity) {
      axios.defaults.baseURL = "http://localhost:3040/";
      axios
        .post("add-movement", { product_id: k.id, quantity: k.quantity })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
<<<<<<< HEAD
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
=======
    <main className="flex min-h-screen flex-col items-center p-5 bg-white">
      {token === "" ? (
        <>
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
        </>
      ) : (
        <>
          <div className="text-black">
            {user.firstName} {user.lastName} {user.phone} {user.email}
          </div>
        </>
      )}
      <hr className="my-2 border border-red-900 w-full" />
      <div className="text-black">
        {products.map((k: any, index: number) => {
          return (
            <div key={index}>
              {k.title} {k.price}
              <input
                type="number"
                placeholder="quantity"
                onChange={(e: any) => (k.quantity = e.target.value)}
                className="text-black border border-gray-600"
              />
              <button onClick={() => handleAddProduct(k)}>ekle</button>
            </div>
          );
        })}
      </div>
>>>>>>> 34952ed2c0a7e750ec97d41694ecd4a187659b5b
    </main>
  );
}
