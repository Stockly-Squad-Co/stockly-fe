'use client';
import Button from '@/components/Common/Button';
import BackButton from '@/components/Common/Button/back-button';
import PaymentLoader from '@/components/Common/Loaders/payment-loader';
import Modal from '@/components/Common/Modal';
import SidebarComp from '@/components/Common/Sidebar';
import Tabs from '@/components/Common/Tabs';
import { GeneratePaymentLink } from '@/lib/@types';
import { authApi } from '@/lib/configs/axios-instance';
import { queryClient } from '@/lib/providers';
import { useModal } from '@/lib/providers/ModalProvider';
import { useSidebar } from '@/lib/providers/SideDrawersProvider';
import { copyToClipboard, formatNaira } from '@/lib/utils';
import { differenceInMinutes } from 'date-fns';
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';
import { BiCopy, BiShareAlt } from 'react-icons/bi';
import { IoCopyOutline } from 'react-icons/io5';
import { MdClose } from 'react-icons/md';
import { toast } from 'sonner';

interface Props {
  data: GeneratePaymentLink;
  order_id: string;
}

const PaymentLinkSidebar: FC<Props> = ({ data, order_id }) => {
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
            header: 'Pay with card',
            widget: <PaymentLinkTab link={data?.link} qrCode={data?.qrCode} />,
          },
          {
            header: 'Pay with bank',
            widget: (
              <PayWithBankTab {...data.virtual_account} order_id={order_id} />
            ),
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

const PayWithBankTab: FC<
  GeneratePaymentLink['virtual_account'] & { order_id: string }
> = ({ order_id, ...virtual_account }) => {
  const { hideSidebar } = useSidebar();
  const [showAccountNumber, setShowAccountNumber] = useState(true);
  const [difference, setDifference] = useState(0);

  const payStatusCheck = async () => {
    const response = await authApi.get(`/order/${order_id}/pay-status-check`);

    const status: 'pending' | 'expired' | 'successful' =
      response?.data?.data?.status;

    switch (status) {
      case 'pending': {
        break;
      }
      case 'expired': {
        toast.error('Oops! this transaction has expired, try again.');
        hideSidebar();
        break;
      }
      case 'successful': {
        toast.success('Transaction Successful ✅');
        queryClient.invalidateQueries({
          predicate({ queryKey }) {
            return queryKey?.includes('orders') && queryKey.includes(order_id);
          },
        });
        hideSidebar();
        break;
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDifference(
        differenceInMinutes(virtual_account?.expires_at, new Date())
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      await payStatusCheck();
    }, 5000);

    return () => clearInterval(interval);
  });

  return (
    <div className="bg-gray-50 px-4 py-8 rounded-md">
      {showAccountNumber ? (
        <>
          <p className="mx-auto w-[80%] text-center text-[.8rem]">
            Please proceed to transfer the{' '}
            <b className="text-secondary">exact amount</b> below:
          </p>

          <div className="py-4 text-[.85rem] border-b flex items-center justify-between">
            <p>Amount</p>
            <div className="flex items-center gap-2 font-bold">
              {formatNaira(virtual_account?.expected_amount)}
              <BiCopy
                size={19}
                onClick={() =>
                  copyToClipboard(virtual_account?.expected_amount?.toString()!)
                }
                cursor={'pointer'}
              />
            </div>
          </div>

          <div className="py-4 text-[.85rem] border-b flex items-center justify-between">
            <p>Account Number</p>
            <div className="flex items-center gap-2 font-bold">
              <Image
                src={
                  'https://popup.squadco.com/static/media/GTBank-logo-main.f83a84f7.svg'
                }
                alt="bank-image"
                width={25}
                height={25}
                className="w-[25px] h-[25px]"
              />
              {virtual_account?.account_number}

              <BiCopy
                size={19}
                onClick={() =>
                  copyToClipboard(virtual_account?.account_number?.toString()!)
                }
                cursor={'pointer'}
              />
            </div>
          </div>

          <div className="py-4 text-[.85rem] flex items-center justify-between">
            <p>Account Name</p>

            <p className="font-bold">{virtual_account?.account_name}</p>
          </div>

          <p className="text-[.8rem] text-center mt-4">
            This account number expires in {difference} minutes
          </p>

          <Button
            variant="outline"
            size="medium"
            fullWidth
            className="mt-4"
            onClick={() => setShowAccountNumber(false)}
          >
            I have made the transfer
          </Button>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-y-8">
          <p className="text-[.9rem]">
            {"We're"} waiting to receive your transfer, please hold on
          </p>

          <PaymentLoader />

          <Button
            variant="outline"
            size="medium"
            fullWidth
            className="mx-auto"
            onClick={() => setShowAccountNumber(true)}
          >
            Show Account Number
          </Button>
        </div>
      )}
    </div>
  );
};

export default PaymentLinkSidebar;
