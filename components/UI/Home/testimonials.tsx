"use client";
import { useState } from "react";
import Image from "next/image";
import { FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Jane Doe",
    role: "Small Business Owner",
    review:
      "Stockly has transformed the way I manage my inventory. The payment system is seamless, and I love the real-time analytics!",
    rating: 5,
    image: "/images/avatars/avatar1.png",
  },
  {
    name: "Michael Smith",
    role: "E-commerce Entrepreneur",
    review:
      "I switched to Stockly for better payment processing, and I’m glad I did! The virtual bank account feature is a game-changer.",
    rating: 5,
    image: "/images/avatars/avatar2.png",
  },
  {
    name: "Emily Johnson",
    role: "Retail Store Owner",
    review:
      "Managing my store has never been easier. Stockly's automation tools save me hours every week!",
    rating: 5,
    image: "/images/avatars/avatar3.png",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-16 container container relative">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          What Our Users Say
        </h2>
        <p className="text-text mt-4">Trusted by business owners worldwide.</p>
      </div>

      <div className="relative mt-10 flex justify-center items-center">
        {/** Left Button */}
        <button
          onClick={prevTestimonial}
          className="absolute left-0 md:-left-10 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-opacity-90 transition"
        >
          <FaArrowLeft className="w-5 h-5" />
        </button>

        {/** Testimonial Content with Animation */}
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-lg text-center"
            >
              {/** Avatar */}
              <div className="flex justify-center mb-4">
                <Image
                  src={testimonials[currentIndex].image}
                  width={70}
                  height={70}
                  alt={testimonials[currentIndex].name}
                  className="rounded-full border-2 border-primary"
                />
              </div>

              {/** Name & Role */}
              <h3 className="text-xl font-semibold text-primary">
                {testimonials[currentIndex].name}
              </h3>
              <p className="text-text text-sm">
                {testimonials[currentIndex].role}
              </p>

              {/** Star Ratings */}
              <div className="flex justify-center mt-2">
                {Array.from({ length: testimonials[currentIndex].rating }).map(
                  (_, idx) => (
                    <FaStar key={idx} className="text-yellow-500 w-5 h-5" />
                  )
                )}
              </div>

              {/** Review Text */}
              <p className="text-text mt-4">
                {testimonials[currentIndex].review}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/** Right Button */}
        <button
          onClick={nextTestimonial}
          className="absolute right-0 md:-right-10 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-opacity-90 transition"
        >
          <FaArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
