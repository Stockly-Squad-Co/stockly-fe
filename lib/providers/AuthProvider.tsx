"use client";

import SpinLoader from "@/components/Common/Loaders/spin";
import { useSession } from "next-auth/react";
import React, { FC, ReactNode } from "react";

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { status } = useSession();
  if (status === "loading") return <SpinLoader />;

  return <div>{children}</div>;
};

export default AuthProvider;
