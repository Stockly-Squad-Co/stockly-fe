import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="2xl:py-28 py-20 grid grid-cols-2 gap-4 items-center container">
      <div className="max-w-3xl xl:max-w-4xl">
        <div className="space-y-5">
          <h1 className="text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-extrabold text-primary leading-relaxed">
            Manage Your Store{" "}
            <span className="text-secondary">Effortlessly</span>
          </h1>
          <p className="text-lg text-text mt-4 max-w-xl mx-auto md:mx-0">
            Track inventory, process payments, and grow your business with an
            all-in-one platform.
          </p>
        </div>

        <div className="mt-6 flex justify-center md:justify-start space-x-4">
          <Link href="/account/register">
            <button className="bg-primary text-white px-16 py-3 rounded-lg hover:bg-blue-800 transition">
              Get Started
            </button>
          </Link>
        </div>
      </div>

      <div className="md:size-[600px] flex items-center justify-center">
        <Image
          src={"/svgs/product_look.svg"}
          alt="hero"
          width={300}
          height={300}
          className="md:size-[500px] 2xl:size-[600px]"
        />
      </div>
    </section>
  );
};

export default Hero;
