"use client";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const TargetModel = dynamic(() => import("./target-model"), { ssr: false });

const Hero = () => {
  return (
    <section className="2xl:py-28 py-28 grid grid-cols-2 gap-4 items-center container">
      <div className="max-w-3xl xl:max-w-4xl">
        <div>
          <div className="space-y-5">
            <h1 className="text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-extrabold text-primary leading-relaxed">
              Manage Your Store{" "}
              <span className="text-secondary">Effortlessly</span>
            </h1>
            <p className="text-lg text-text mt-4 max-w-xl mx-auto md:mx-0">
              Track inventory, process payments, and grow your business with an
              all-in-one platform.
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <span>Powered by</span>{" "}
              <Image src="/squad.png" alt="" width={60} height={20} />
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-center md:justify-start space-x-4">
          <Link href="/register">
            <button className="bg-accent text-black px-16 py-3 rounded-lg hover:bg-primary hover:text-white transition">
              Get Started
            </button>
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center">
        {/* <Image
          src={"/svgs/product_look.svg"}
          alt="hero"
          width={300}
          height={300}
          className="md:size-[500px] 2xl:size-[600px] ml-auto"
        /> */}
        <TargetModel />
      </div>

      {/* <Suspense>
        <div className="size-[1000px] border border-red-500">
          <TargetModel />
        </div>
      </Suspense> */}
    </section>
  );
};

export default Hero;
