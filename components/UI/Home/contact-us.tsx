"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import { AiOutlineMail, AiOutlinePhone, AiOutlineSend } from "react-icons/ai";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("Form submitted:", data);
    // Simulate form submission delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    reset();
  };

  return (
    <section className="container py-16 px-6 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold text-gray-800">Get in Touch</h2>
        <p className="text-gray-600 mt-2">
          We’d love to hear from you! Fill out the form or contact us directly.
        </p>
      </motion.div>

      <div className="mt-10 grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white shadow-lg rounded-lg p-6 space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-300"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-300"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Message
            </label>
            <textarea
              {...register("message", { required: "Message is required" })}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-300 h-32"
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-indigo-600 text-white py-2 rounded-md flex items-center justify-center gap-2"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Sending..."
            ) : (
              <>
                <AiOutlineSend size={20} /> Send Message
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Contact Details */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-4">
            <AiOutlineMail size={24} className="text-indigo-600" />
            <p className="text-gray-700">support@stockly.com</p>
          </div>
          <div className="flex items-center gap-4">
            <AiOutlinePhone size={24} className="text-indigo-600" />
            <p className="text-gray-700">+123 456 7890</p>
          </div>
          <div className="flex items-center gap-4">
            <FaFacebook size={24} className="text-blue-600 cursor-pointer" />
            <FaTwitter size={24} className="text-blue-400 cursor-pointer" />
            <FaInstagram size={24} className="text-pink-500 cursor-pointer" />
            <FaLinkedin size={24} className="text-blue-700 cursor-pointer" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;
