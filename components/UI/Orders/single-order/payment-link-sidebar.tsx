'use client';
import BackButton from '@/components/Common/Button/back-button';
import SidebarComp from '@/components/Common/Sidebar';
import { GeneratePaymentLink } from '@/lib/@types';
import { useSidebar } from '@/lib/providers/SideDrawersProvider';
import React, { FC, useState } from 'react';

interface Props {
  data: GeneratePaymentLink;
}

const PaymentLinkSidebar: FC<Props> = ({ data }) => {
  const [tab, setTab] = useState<'link' | 'bank_account'>('link');
  const { hideSidebar } = useSidebar();

  return (
    <SidebarComp onClose={hideSidebar}>
      <BackButton onBack={hideSidebar} />

      <h1 className="mt-4 font-bold text-[1.5rem] mb-4">
        Complete Order Payment
      </h1>
    </SidebarComp>
  );
};

export default PaymentLinkSidebar;
