'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { BiArrowBack } from 'react-icons/bi';

const BackButton = () => {
  const router = useRouter();

  return (
    <span className="w-[40px] h-[40px] bg-gray-100 rounded-md grid place-content-center">
      <BiArrowBack
        size={25}
        cursor={'pointer'}
        onClick={() => {
          router.back();
        }}
      />
    </span>
  );
};

export default BackButton;
