"use client";

import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  return (
    <section className="container pb-28 pt-10">
      <div className="max-w-3xl mx-auto bg-gray-100 rounded-3xl p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Subscribe to our Newsletter
        </h2>
        <p className="text-gray-600 mt-2">
          Get the latest news and updates on our platform.
        </p>

        <div className="mt-6 flex items-center gap-4 bg-white rounded-md border">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
            className="w-full flex-grow p-3 duration-300 focus:ring focus:ring-indigo-300"
          />
          <button className="bg-accent text-black px-6 py-3 rounded-lg hover:bg-primary duration-200 hover:text-white">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
