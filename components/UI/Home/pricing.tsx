import { pricingPlans } from "@/lib/data";
import Link from "next/link";
import { FiCheck } from "react-icons/fi";

const Pricing = () => {
  return (
    <section>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 319">
        <path
          fill="#202020"
          fillOpacity="1"
          d="M0,128L12.6,106.7C25.3,85,51,43,76,37.3C101.1,32,126,64,152,101.3C176.8,139,202,181,227,170.7C252.6,160,278,96,303,90.7C328.4,85,354,139,379,170.7C404.2,203,429,213,455,229.3C480,245,505,267,531,245.3C555.8,224,581,160,606,165.3C631.6,171,657,245,682,261.3C707.4,277,733,235,758,229.3C783.2,224,808,256,834,266.7C858.9,277,884,267,909,250.7C934.7,235,960,213,985,218.7C1010.5,224,1036,256,1061,250.7C1086.3,245,1112,203,1137,181.3C1162.1,160,1187,160,1213,160C1237.9,160,1263,160,1288,176C1313.7,192,1339,224,1364,245.3C1389.5,267,1415,277,1427,282.7L1440,288L1440,320L1427.4,320C1414.7,320,1389,320,1364,320C1338.9,320,1314,320,1288,320C1263.2,320,1238,320,1213,320C1187.4,320,1162,320,1137,320C1111.6,320,1086,320,1061,320C1035.8,320,1011,320,985,320C960,320,935,320,909,320C884.2,320,859,320,834,320C808.4,320,783,320,758,320C732.6,320,707,320,682,320C656.8,320,632,320,606,320C581.1,320,556,320,531,320C505.3,320,480,320,455,320C429.5,320,404,320,379,320C353.7,320,328,320,303,320C277.9,320,253,320,227,320C202.1,320,177,320,152,320C126.3,320,101,320,76,320C50.5,320,25,320,13,320L0,320Z"
        ></path>
      </svg>
      <div className="py-16 bg-[#202020] text-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold">Pricing Plans</h2>
            <p className=" mt-4">
              Choose a plan that fits your business needs.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`p-8 rounded-xl custom-shadow ${
                  plan.highlight
                    ? "bg-primary text-white scale-105"
                    : "bg-white/5 "
                } transition hover:shadow-lg space-y-8`}
              >
                <div className="space-y-3">
                  <h3 className="text-xl font-bold">{plan.title}</h3>
                  <p className="text-gray-300 text-sm">{plan.description}</p>
                </div>

                <div>
                  <p className="text-4xl font-semibold">{plan.price}</p>
                </div>

                <div className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <FiCheck
                          className={`flex-shrink-0 ${
                            plan.highlight ? "text-white" : "text-primary"
                          }`}
                          size={18}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/** CTA Button */}
                  <Link href={plan.highlight ? "/register" : "/contact"}>
                    <button
                      className={`mt-6 px-6 py-3 text-sm rounded-lg transition ${
                        plan.highlight
                          ? "bg-white/5 hover:bg-white/10"
                          : "bg-primary text-white hover:bg-accent hover:text-black"
                      }`}
                    >
                      {plan.buttonText}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 319">
        <path
          fill="#202020"
          fillOpacity="1"
          d="M0,128L12.6,112C25.3,96,51,64,76,64C101.1,64,126,96,152,112C176.8,128,202,128,227,112C252.6,96,278,64,303,96C328.4,128,354,224,379,272C404.2,320,429,320,455,277.3C480,235,505,149,531,133.3C555.8,117,581,171,606,197.3C631.6,224,657,224,682,186.7C707.4,149,733,75,758,48C783.2,21,808,43,834,74.7C858.9,107,884,149,909,160C934.7,171,960,149,985,128C1010.5,107,1036,85,1061,106.7C1086.3,128,1112,192,1137,224C1162.1,256,1187,256,1213,218.7C1237.9,181,1263,107,1288,106.7C1313.7,107,1339,181,1364,218.7C1389.5,256,1415,256,1427,256L1440,256L1440,0L1427.4,0C1414.7,0,1389,0,1364,0C1338.9,0,1314,0,1288,0C1263.2,0,1238,0,1213,0C1187.4,0,1162,0,1137,0C1111.6,0,1086,0,1061,0C1035.8,0,1011,0,985,0C960,0,935,0,909,0C884.2,0,859,0,834,0C808.4,0,783,0,758,0C732.6,0,707,0,682,0C656.8,0,632,0,606,0C581.1,0,556,0,531,0C505.3,0,480,0,455,0C429.5,0,404,0,379,0C353.7,0,328,0,303,0C277.9,0,253,0,227,0C202.1,0,177,0,152,0C126.3,0,101,0,76,0C50.5,0,25,0,13,0L0,0Z"
        ></path>
      </svg>
    </section>
  );
};

export default Pricing;
