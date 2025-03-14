'use client';
import BackButton from '@/components/Common/Button/back-button';
import Modal from '@/components/Common/Modal';
import SidebarComp from '@/components/Common/Sidebar';
import Tabs from '@/components/Common/Tabs';
import { GeneratePaymentLink } from '@/lib/@types';
import { useModal } from '@/lib/providers/ModalProvider';
import { useSidebar } from '@/lib/providers/SideDrawersProvider';
import { copyToClipboard } from '@/lib/utils';
import Image from 'next/image';
import React, { FC, useState } from 'react';
import { BiShareAlt } from 'react-icons/bi';
import { IoCopyOutline } from 'react-icons/io5';
import { MdClose } from 'react-icons/md';
import { toast } from 'sonner';

interface Props {
  data: GeneratePaymentLink;
}

const PaymentLinkSidebar: FC<Props> = ({ data }) => {
  const [tab, setTab] = useState<'link' | 'bank_account'>('link');
  const { hideSidebar } = useSidebar();

  return (
    <SidebarComp onClose={hideSidebar} className="p-4">
      <BackButton onBack={hideSidebar} />

      <h1 className="mt-4 font-bold text-[1.5rem] mb-4">
        Complete Order Payment
      </h1>

      <Tabs
        tabs={[
          {
            header: 'Card',
            widget: <PaymentLinkTab link={data?.link} qrCode={data?.qrCode} />,
          },
        ]}
      />
    </SidebarComp>
  );
};

const PaymentLinkTab: FC<{ link: string; qrCode: string }> = ({
  link,
  qrCode,
}) => {
  const handleShare = async () => {
    if (!navigator.share) {
      toast.error('Web Share API is not supported in this browser.');
      return;
    }

    try {
      const base64Response = await fetch(qrCode);
      const blob = await base64Response.blob();
      const file = new File([blob], 'qrcode.png', { type: 'image/png' });

      if (!navigator.canShare || !navigator.canShare({ files: [file] })) {
        toast.error('Sharing images is not supported.');
        return;
      }

      await navigator.share({
        title: 'Check out this QR Code!',
        text: 'Scan this QR code.',
        files: [file],
      });

      console.log('QR Code shared successfully!');
    } catch (err: any) {
      toast.error(`Unable to share content`);
    }
  };

  return (
    <>
      <div>
        <div className="w-[300px] mx-auto">
          <Image
            src={qrCode}
            alt="qr-code"
            width={500}
            height={500}
            className="h-[250px] w-[250px]"
          />
        </div>

        <div className="mt-2 p-2 rounded-full bg-gray-100">
          <p className="w-full text-ellipsis">{link?.slice(0, 40)}...</p>
        </div>

        <div className="flex items-center justify-center mt-3 gap-3">
          <div
            className="bg-primary text-white rounded-full p-2 cursor-pointer"
            onClick={() => copyToClipboard(link)}
          >
            <IoCopyOutline />
          </div>

          <div
            className="bg-primary text-white rounded-full p-2 cursor-pointer"
            onClick={handleShare}
          >
            <BiShareAlt />
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentLinkSidebar;
