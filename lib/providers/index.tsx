"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NextTopLoader from "nextjs-toploader";
import { SessionProvider } from "next-auth/react";
import ModalProvider from "./ModalProvider";
import { Toaster } from "sonner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense } from "react";
import AuthProvider from "./AuthProvider";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface Props {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Suspense>
            <NextTopLoader showSpinner={false} color="#FACC15" />
          </Suspense>

          <ModalProvider>{children}</ModalProvider>

          <Toaster />

          {/* <SmoothScroll /> */}
          <ReactQueryDevtools client={queryClient} />
        </QueryClientProvider>
      </AuthProvider>
    </SessionProvider>
  );
};

export default Providers;
