import React, { FC, ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

const FormSection: FC<Props> = ({ title, children }) => {
  return (
    <section className="bg-white">
      <header className="p-3 bg-gray-50">
        <h1 className="text-[1.2rem] font-bold text-gray-600">{title}</h1>
      </header>

      <main className="p-4">{children}</main>
    </section>
  );
};

export default FormSection;
