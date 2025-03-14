"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyReference } from "@/lib/services/store.service";
import { useEffect } from "react";
import { FaDoorClosed } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { SiStagetimer } from "react-icons/si";
import { IoMdCloseCircleOutline } from "react-icons/io";

const VerifyTransaction = () => {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");

  const router = useRouter();

  useEffect(() => {
    if (!reference) {
      router.push("/");
    }
  }, [reference]);

  const { data, isPending: loading } = useQuery({
    queryFn: () => verifyReference(`${reference}`),
    queryKey: ["verifyReference", reference],
  });

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      {loading ? (
        <div className="text-center space-y-4">
          <div className="flex items-center gap-2 justify-center">
            <div className="size-10 bg-accent rounded-full animate-bounce"></div>
            <div className="size-10 bg-accent rounded-full animate-bounce [animation-delay:150ms]"></div>
            <div className="size-10 bg-accent rounded-full animate-bounce [animation-delay:300ms]"></div>
          </div>

          <p>Verifying...</p>
        </div>
      ) : !data ? (
        <div>
          <FaDoorClosed className="mx-auto text-red-500" size={80} />
          <p>Invalid Reference or an error occurred.</p>
        </div>
      ) : data.status === "FAILED" ? (
        <div className="text-center space-y-4">
          <IoMdCloseCircleOutline
            className="mx-auto text-green-500"
            size={80}
          />

          <p className="text-2xl font-semibold">Transaction Failed</p>
          <p className="text-lg">
            Your transaction was not successful. Please try again.
          </p>
        </div>
      ) : data.status === "PENDING" ? (
        <div className="text-center space-y-4">
          <SiStagetimer className="mx-auto text-green-500" size={80} />

          <p className="text-2xl font-semibold">Transaction Pending</p>
          <p className="text-lg">
            Your transaction is still pending. Please wait...
          </p>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <FaRegCircleCheck className="mx-auto text-green-500" size={80} />
          <p className="text-2xl font-semibold">Transaction Successful</p>
          <p className="text-lg">
            Your transaction was successful. Thank you for shopping with us.
          </p>
        </div>
      )}
    </div>
  );
};

export default VerifyTransaction;
