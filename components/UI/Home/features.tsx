// import { features } from "@/lib/data";
// import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { FaOpencart } from "react-icons/fa";
import { FiBarChart, FiCreditCard } from "react-icons/fi";
import { IoMdArrowForward } from "react-icons/io";

const Features = () => {
  return (
    <section className="py-16 container bg-white space-y-12">
      <div className="bg-gray-100 flex items-center justify-center text-xl text-gray-400 h-[35rem]">
        SCREENSHOT
      </div>

      <div>
        <div className="flex 2xl:gap-20 gap-16">
          <div className="max-w-md">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary">
              Powerful Features for Your Business
            </h2>
            <p className="text-gray-500 mt-4">
              From inventory tracking to seamless payments, Stockly helps you
              manage and grow your store efficiently.
            </p>
          </div>

          <div className="flex-grow grid grid-cols-2 gap-4">
            <div className="rounded-3xl bg-[#f0f7ff] px-8 py-12 relative gap-4 overflow-hidden">
              {/* <div className="size-20 flex-shrink-0 bg-white rounded-full flex items-center justify-center">
                <FaOpencart className="text-primary size-10" />
              </div> */}

              <FaOpencart className="text-primary size-28 absolute -bottom-1 -right-2 -rotate-45" />

              <div className="space-y-3">
                <p className="font-bold text-3xl">Smart Inventory Management</p>
                <p className=" text-gray-800 max-w-lg">
                  Track stock levels, receive restock alerts, and manage your
                  products effortlessly.
                </p>

                <div>
                  <Link
                    href="/account/register"
                    className="text-secondary flex items-center gap-1 text-sm group"
                  >
                    <span>Get Started</span>
                    <IoMdArrowForward className="duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl bg-[#fbebee] px-12 py-12 text-center space-y-3">
                <div className="size-20 flex-shrink-0 bg-white rounded-full flex mx-auto items-center justify-center">
                  <FiCreditCard className="text-yellow-500 size-10" />
                </div>

                <div>
                  <p className="font-semibold text-lg">
                    Seamless Payment Processing
                  </p>
                  <p className="text-sm text-gray-500 max-w-lg">
                    Accept online payments securely and manage transactions with
                    virtual bank accounts.
                  </p>
                </div>
              </div>
              <div className="rounded-3xl bg-[#f2f2f2] px-12 py-12 text-center space-y-3">
                <div className="size-20 flex-shrink-0 bg-white rounded-full flex mx-auto items-center justify-center">
                  <FiBarChart className="text-yellow-500 size-10" />
                </div>

                <div>
                  <p className="font-semibold text-lg">
                    Advanced Business Insights
                  </p>
                  <p className="text-sm text-gray-500 max-w-lg">
                    Get real-time analytics on sales, revenue trends, and
                    customer behavior.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          Powerful Features for Your Business
        </h2>
        <p className="text-text mt-4">
          From inventory tracking to seamless payments, Stockly helps you manage
          and grow your store efficiently.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className={cn(
              `container p-6 rounded-2xl text-center transition `,
              `bg-[${feature.color}]`
            )}
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-primary">
              {feature.title}
            </h3>
            <p className="text-text mt-2">{feature.description}</p>
          </div>
        ))}
      </div> */}
    </section>
  );
};

export default Features;
