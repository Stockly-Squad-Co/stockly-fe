"use client";

import LogoLoader from "@/components/Common/Loaders/logo.loader";
import { useSession } from "next-auth/react";
import React, { FC, ReactNode } from "react";

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { status } = useSession();

  if (status === "loading") return <LogoLoader />;

  return <div>{children}</div>;
};

export default AuthProvider;
