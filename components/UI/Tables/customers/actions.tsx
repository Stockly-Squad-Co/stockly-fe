import { Customer } from '@/lib/@types';
import React, { FC } from 'react';
import { BiEdit, BiTrash } from 'react-icons/bi';

interface Props {
  customer: Customer;
}

const Actions: FC<Props> = () => {
  return (
    <div className="flex items-center w-full justify-center gap-2">
      <BiEdit size={22} cursor={'pointer'} />
      <BiTrash size={22} cursor={'pointer'} />
    </div>
  );
};

export default Actions;
