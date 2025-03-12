"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import DashboardSidebar from "./sidebar";
import DashboardNavbar from "./navbar";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  const { data: session } = useSession();

  const router = useRouter();

  if (session?.nextStep) {
    switch (session.nextStep) {
      case "store-profile":
        router.push("/setup");
        return null;
    }
  }

  return (
    <main className="min-h-screen w-screen relative">
      <DashboardNavbar />
      <div className="flex w-full">
        <DashboardSidebar />
        <div className="flex-[6] max-h-[calc(100vh-3.5rem)] overflow-y-auto">
          {children}
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
