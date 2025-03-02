"use client";

import { SiNanostores } from "react-icons/si";

interface Props {
  type?: "full" | "small";
}

const LogoLoader = ({ type = "full" }: Props) => {
  return type === "full" ? (
    <div className="fixed flex items-center justify-center w-full h-full z-[1000]">
      <Logo />
    </div>
  ) : (
    <div>
      <Logo />
    </div>
  );
};

export const Logo = () => {
  return (
    <div className="text-primary flex items-center gap-1 text-2xl animate-pulse">
      <SiNanostores />
      <span className="font-bold">Stockly</span>
    </div>
  );
};

export default LogoLoader;
