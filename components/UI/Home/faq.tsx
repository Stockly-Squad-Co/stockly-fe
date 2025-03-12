"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { faqCategories } from "@/lib/data";

const FAQ: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("General");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFAQs = faqCategories[selectedCategory].filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-16 container container">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          Frequently Asked Questions
        </h2>
        <p className="text-text mt-4">
          Find answers to common questions about our platform.
        </p>
      </div>

      {/* Search Bar */}
      {/* <div className="flex items-center justify-center mt-6 relative max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Search FAQs..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="absolute right-4 text-gray-400" />
      </div> */}

      {/* Category Tabs */}
      <div className="flex justify-center mt-8 space-x-4">
        {Object.keys(faqCategories).map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setOpenIndex(null);
              setSearchTerm("");
            }}
            className={`px-5 py-2 text-sm font-medium rounded-full transition ${
              selectedCategory === category
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FAQ List */}
      <div className="mt-10 max-w-2xl mx-auto">
        {filteredFAQs.length > 0 ? (
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            {filteredFAQs.map((faq, index) => (
              <div key={index} className="mb-4 bg-white shadow-md rounded-xl">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-5 text-left text-primary font-medium hover:bg-gray-100 transition"
                >
                  <span>{faq.question}</span>
                  {openIndex === index ? (
                    <FaChevronUp className="w-5 h-5" />
                  ) : (
                    <FaChevronDown className="w-5 h-5" />
                  )}
                </button>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: openIndex === index ? "auto" : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden px-5"
                >
                  {openIndex === index && (
                    <p className="py-3 text-text">{faq.answer}</p>
                  )}
                </motion.div>
              </div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-500 mt-6">
            No FAQs found for this category.
          </p>
        )}
      </div>
    </section>
  );
};

export default FAQ;
