import Modal from '@/components/Common/Modal';
import { useModal } from '@/lib/providers/ModalProvider';
import { copyToClipboard } from '@/lib/utils';
import Image from 'next/image';
import React, { FC } from 'react';
import { BiShareAlt } from 'react-icons/bi';
import { IoCopyOutline } from 'react-icons/io5';
import { MdClose } from 'react-icons/md';
import { toast } from 'sonner';

interface Props {
  link: string;
  qrCode: string;
}

const PaymentLinkModal: FC<Props> = ({ link, qrCode }) => {
  const { hideModal } = useModal();

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
    <Modal
      isOpen
      onClose={hideModal}
      className="w-[90vw] max-w-[300px] bg-white p-4 rounded-md"
    >
      <header className="flex items-center justify-end">
        <MdClose size={20} onClick={hideModal} cursor={'pointer'} />
      </header>

      <div>
        <Image
          src={qrCode}
          alt="qr-code"
          width={500}
          height={500}
          className="w-full h-[250px]"
        />

        <div className="mt-2 p-2 rounded-full bg-gray-100">
          <p className="w-full text-ellipsis">{link?.slice(0, 30)}...</p>
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
    </Modal>
  );
};

export default PaymentLinkModal;
