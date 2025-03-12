'use client';
import { useRouter } from 'next/navigation';
import React, { FC, ReactNode } from 'react';
import { BiArrowBack } from 'react-icons/bi';

interface Props {
  onBack?(): void;
  title: string;
  maxWidth?: number;
  children: ReactNode;
}

const FormContainer: FC<Props> = ({
  onBack,
  title,
  maxWidth = 800,
  children,
}) => {
  const router = useRouter();

  return (
    <section
      className="space-y-6 mx-auto mb-32"
      style={{ maxWidth: maxWidth, width: '100vw' }}
    >
      <header className="flex items-center gap-4">
        <span className="w-[40px] h-[40px] bg-gray-100 rounded-md grid place-content-center">
          <BiArrowBack
            size={25}
            cursor={'pointer'}
            onClick={() => {
              router.back();
              onBack?.();
            }}
          />
        </span>

        <h2 className="text-[1.5rem] max-md:text-[1.1rem] font-bold">
          {title}
        </h2>
      </header>
      <div className="rounded-md border w-full">{children}</div>
    </section>
  );
};

export default FormContainer;
