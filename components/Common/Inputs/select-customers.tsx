import { Collections, Customer } from '@/lib/@types';
import { getCollections } from '@/lib/services/products.service';
import { useQuery } from '@tanstack/react-query';
import React, { FC, useState } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import BackButton from '../Button/back-button';
import Image from 'next/image';
import { Variant, motion } from 'framer-motion';
import { getCustomers } from '@/lib/services/customer.service';

interface Props {
  selected_customers: Customer[];
  onSelectCustomer: (c: Customer) => void;
  onRemoveCustomer: (c: Customer) => void;
}

const sidebarVariant: Record<string, Variant> = {
  initial: {
    opacity: 0,
    translateX: '100vw',
  },
  animate: {
    opacity: 1,
    translateX: 0,
  },
};

const SelectCustomers: FC<Props> = ({
  selected_customers,
  onRemoveCustomer,
  onSelectCustomer,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: getCustomers,
  });

  return (
    <div className="space-y-2">
      <label className="block text-[.9rem]">Select Collections</label>
      <div
        onClick={() => setIsOpen(true)}
        className="rounded-md px-4 py-3 border flex items-center justify-between cursor-pointer"
      >
        {selected_customers.length > 0 ? (
          <h1>
            {selected_customers
              ?.map((s) => s.firstName + ' ' + s.lastName)
              ?.join(', ')}
          </h1>
        ) : (
          <h1>Select Collections</h1>
        )}

        <span>
          <BiChevronRight size={25} className="text-gray-500" />
        </span>
      </div>
      {isOpen && (
        <aside className="fixed top-0 left-0 w-screen h-screen bg-black/30 z-[300]">
          <motion.div
            variants={sidebarVariant}
            initial="initial"
            animate="animate"
            exit="initial"
            className="w-[450px] ml-auto h-screen bg-white p-8"
          >
            <BackButton onBack={() => setIsOpen(false)} />

            <h1 className="mt-4 font-bold text-[1.5rem] mb-4">
              Select Collections
            </h1>

            {customers?.data?.map((c, index) => {
              const is_selected = !!selected_customers.find(
                (s) => s._id === c._id
              );
              return (
                <div key={index} className="flex items-center gap-4 my-4">
                  <input
                    type="checkbox"
                    checked={is_selected}
                    className="size-4 cursor-pointer accent-accent"
                    onChange={() => {
                      if (is_selected) {
                        onRemoveCustomer(c);
                      } else {
                        onSelectCustomer(c);
                      }
                    }}
                  />
                  <div className="flex items-center gap-2">
                    {c.firstName} {c.lastName} - {`${c.email || c.phoneNumber}`}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </aside>
      )}
    </div>
  );
};

export default SelectCustomers;
