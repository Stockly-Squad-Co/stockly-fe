import React, { FC, ReactNode } from 'react';

interface Props {
  title: string;
  chip: ReactNode;
}

const DetailsChip: FC<Props> = ({ title, chip }) => {
  return (
    <div className="bg-gray-50 text-[.75rem] px-2 py-1 flex items-center gap-2 rounded-lg cursor-pointer">
      <p>{title}:</p>
      {chip}
    </div>
  );
};

export default DetailsChip;
