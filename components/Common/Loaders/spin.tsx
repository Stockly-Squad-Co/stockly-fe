"use client";

interface Props {
  type?: "full" | "small";
}

const SpinLoader = ({ type = "full" }: Props) => {
  return type === "full" ? (
    <div className="fixed flex items-center justify-center w-full h-full z-[1000]">
      <div className="animate-spin size-20 border-8 border-primary/5 border-t-primary rounded-full"></div>
    </div>
  ) : (
    <div>
      <div className="animate-spin size-20 border-8 border-primary/5 border-t-primary rounded-full"></div>
    </div>
  );
};

export default SpinLoader;
