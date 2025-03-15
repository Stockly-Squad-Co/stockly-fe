'use client';
import BackButton from '@/components/Common/Button/back-button';
import Skeleton from '@/components/Layout/Skeleton';
import {
  generateOrderPaymentLink,
  getOrder,
  updateOrderShippingStatus,
} from '@/lib/services/order.service';
import { copyToClipboard, formatDate, formatNaira } from '@/lib/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';
import DetailsChip from './details-chip';
import OrderStatusChip from '@/components/Common/Status/order-status';
import OrderPaymentStatusChip from '@/components/Common/Status/order-payment-status';
import ShippingStatusChip from '@/components/Common/Status/shipping-status';
import { BiCopy, BiEnvelope, BiPhone } from 'react-icons/bi';
import { FaWhatsapp } from 'react-icons/fa6';
import Image from 'next/image';
import {
  OrderPaymentStatus,
  OrderStatus,
  SalesChannel,
  ShippingStatus,
} from '@/lib/enums';
import Button from '@/components/Common/Button';
import { useModal } from '@/lib/providers/ModalProvider';
import RecordPaymentModal from './record-payment-modal';
import { toast } from 'sonner';
import { cn } from '@/lib/utils/cn';
import ConfirmationModal from '@/components/Common/Modal/confirmation-modal';
import { queryClient } from '@/lib/providers';
import { useSidebar } from '@/lib/providers/SideDrawersProvider';
import PaymentLinkSidebar from './payment-link-sidebar';

const SingleOrderPage = () => {
  const { showModal } = useModal();
  const { showSidebar } = useSidebar();
  const { id } = useParams();

  const { data: order, isLoading } = useQuery({
    queryKey: ['orders', id],
    queryFn: () => getOrder(id as string),
  });

  const customer = order?.customer ?? order?.metaCustomer;
  const fullShippingAddress =
    order?.salesChannel === SalesChannel.Ussd
      ? order?.shipping_address?.street_address
      : `${order?.shipping_address?.street_address ?? ' '}, ${
          order?.shipping_address?.city
        }, ${order?.shipping_address?.state?.name}, Nigeria, ${
          order?.shipping_address?.zip_code
        }`;

  const { isPending: generatingPaymentLink, mutateAsync: generatePaymentLink } =
    useMutation({
      mutationKey: ['orders', id, 'payment-link'],
      mutationFn: () => generateOrderPaymentLink(order?._id!),
      onSuccess(data) {
        toast.success('Payment link generated successfully');
        showSidebar(<PaymentLinkSidebar data={data} order_id={order?._id!} />);
      },
      onError(error) {
        toast.error(error.message);
      },
    });

  const {
    isPending: updatingShippingStatus,
    mutateAsync: updateShippingStatus,
  } = useMutation({
    mutationKey: ['orders', id, 'shipping-status'],
    mutationFn: (status: ShippingStatus) =>
      updateOrderShippingStatus(order?._id!, status),
    onSuccess() {
      toast.success('Shipping Status updated successfully');
      queryClient.invalidateQueries({
        predicate(query) {
          return (
            query.queryKey.includes('orders') &&
            query.queryKey.includes(order?._id)
          );
        },
      });
    },
  });

  if (isLoading) return <Skeleton />;

  return (
    <section className="p-4 md:p-6">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="font-bold text-[1.2rem]">Order Details</h1>
        </div>
      </header>

      <div className="flex gap-6">
        <div className="flex-[4]">
          <div className="rounded-md w-full border shadow-md">
            <header className="border-b py-4 px-6 flex items-center gap-4">
              <div className="flex-1">
                <h1 className="text-[1.1rem] font-bold text-gray-600">
                  Order #{order?.sku}
                </h1>

                <div className="flex items-center mt-2 gap-2">
                  <DetailsChip
                    title="Order"
                    chip={<OrderStatusChip status={order?.orderStatus!} />}
                  />

                  <DetailsChip
                    title="Payment"
                    chip={
                      <OrderPaymentStatusChip status={order?.paymentStatus!} />
                    }
                  />

                  {order?.shippingStatus && (
                    <DetailsChip
                      title="Shipping"
                      chip={
                        <ShippingStatusChip status={order?.shippingStatus} />
                      }
                    />
                  )}
                </div>
              </div>

              <div className="min-w-fit">
                <p className="font-bold text-gray-600 text-[.9rem]">Date</p>
                <p className="font-bold text-black text-[1.1rem]">
                  {formatDate(order?.orderDate!)}
                </p>
              </div>
            </header>

            <div className="grid grid-cols-2 gap-4 p-6 text-[.9rem]">
              <div className="space-y-2">
                <h2 className="font-semibold text-gray-600">Channel</h2>
                <h1 className="font-bold text-black">{order?.salesChannel}</h1>
              </div>

              <div className="space-y-2">
                <h2 className="font-semibold text-gray-600">Customer</h2>
                <h1 className="font-bold text-black capitalize">
                  {customer?.firstName} {customer?.lastName}
                </h1>
              </div>

              <div className="space-y-3">
                <h2 className="font-semibold text-gray-600">Contact Details</h2>
                <div className="space-y-3">
                  {customer?.email && (
                    <div className="flex items-center gap-2">
                      <span className="w-[30px] h-[30px] bg-gray-100 text-gray-800 p-2 shadow-sm grid place-content-center rounded-lg">
                        <BiEnvelope size={20} />
                      </span>
                      <a
                        href={`mailto:${customer?.email}`}
                        className="text-[.85rem]"
                      >
                        {customer?.email}
                      </a>
                    </div>
                  )}

                  {customer?.phoneNumber && (
                    <div className="flex items-center gap-2">
                      <span className="w-[30px] h-[30px] bg-gray-100 text-gray-800 p-2 shadow-sm grid place-content-center rounded-lg">
                        <BiPhone size={20} />
                      </span>
                      <a
                        href={`tel:${customer?.phoneNumber}`}
                        className="text-[.85rem]"
                      >
                        {customer?.phoneNumber}
                      </a>
                    </div>
                  )}
                  {customer?.phoneNumber && (
                    <div className="flex items-center gap-2">
                      <span className="w-[30px] h-[30px] bg-gray-100 text-gray-800 p-2 shadow-sm grid place-content-center rounded-lg">
                        <FaWhatsapp />
                      </span>
                      <a
                        href={`https://wa.me/${customer?.phoneNumber}`}
                        className="text-[.85rem] text-green-700"
                      >
                        Send a message
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-md w-full border shadow-md p-6 mt-6">
            <p className="text-[.9rem] font-bold">
              Products {`(${order?.cart.length})`}
            </p>

            <div className="space-y-4 mt-6">
              {order?.cart?.map((c, index) => {
                return (
                  <article
                    key={index}
                    className="flex items-center w-full justify-between gap-6"
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={c.product?.display_image}
                        alt={'product image'}
                        width={100}
                        height={100}
                        className="w-[100px] h-[100px] rounded-md object-cover object-center"
                      />
                      <div>
                        <h2 className="text-[.9rem] font-bold">
                          {c.product?.name}
                        </h2>

                        <p className="mt-2 text-gray-600 font-light">
                          {c.quantity} x {formatNaira(c.product_price)}
                        </p>
                      </div>
                    </div>

                    <p className="font-bold text-[.9rem]">
                      {formatNaira(c.product_price * c.quantity)}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>

          {order?.transaction && (
            <div className="rounded-md w-full border shadow-md mt-6">
              <header className="border-b py-4 px-6 flex items-center gap-4">
                <h1 className="text-[1.1rem] font-bold text-gray-600">
                  Transactions
                </h1>
              </header>

              <div className="p-6 flex items-center justify-between">
                <div>
                  <h1 className="uppercase text-[1.1rem] font-bold text-gray-600">
                    {order?.transaction?.transaction_type}
                  </h1>
                  <p className="text-[.8rem]">
                    {formatDate(order?.transaction?.createdAt)}
                  </p>
                </div>
                <p className="text-gray-600 font-bold">
                  {formatNaira(order?.transaction?.amount)}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="flex-[3]">
          <div className="rounded-md w-full border shadow-md">
            <header className="border-b py-4 px-6 flex items-center gap-4">
              <h1 className="text-[1.1rem] font-bold text-gray-600">
                Payment Summary
              </h1>
            </header>

            <div className="px-6 py-4 border-b flex items-center justify-between text-[.9rem]">
              <p className="text-gray-600">Sub Total</p>
              <p className="font-bold">{formatNaira(order?.subtotal!)}</p>
            </div>

            <div className="px-6 py-4 border-b flex items-center justify-between text-[.9rem]">
              <p className="text-gray-600">Discount</p>
              <p className="font-bold">{formatNaira(order?.discountAmount!)}</p>
            </div>

            <div className="px-6 py-4 border-b flex items-center justify-between text-[.9rem]">
              <p className="text-gray-600">Shipping Fee</p>
              <p className="font-bold">{formatNaira(order?.shippingFee!)}</p>
            </div>

            <div className="px-6 py-4 border-b flex items-center justify-between text-[1rem]">
              <p className="text-gray-600 font-bold">Total Amount</p>
              <p className="font-bold">{formatNaira(order?.totalAmount!)}</p>
            </div>
          </div>

          <div className="rounded-md w-full border shadow-md mt-6 p-6">
            <div className="flex items-center gap-4">
              <h1 className="text-[1.1rem] font-bold text-gray-600">
                Payment Status
              </h1>
              <p>
                <OrderPaymentStatusChip status={order?.paymentStatus!} />
              </p>
            </div>
            {order?.paymentStatus != OrderPaymentStatus.PAID &&
            order?.orderStatus != OrderStatus.CANCELLED ? (
              <div className="flex items-center mt-6 gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  fullWidth
                  onClick={() =>
                    showModal(<RecordPaymentModal order={order!} />)
                  }
                >
                  Record Payment
                </Button>
                <Button
                  onClick={() => generatePaymentLink()}
                  loading={generatingPaymentLink}
                  variant="filled"
                  className="flex-1"
                  fullWidth
                >
                  Generate Payment Link
                </Button>
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className="rounded-md w-full border shadow-md mt-6 p-6">
            <h1 className="text-[1.1rem] font-bold text-gray-600">Shipping</h1>

            <div className="space-y-1 mt-4">
              <p className="text-[.9rem] font-semibold text-gray-500 flex items-center gap-2">
                Address
                <BiCopy
                  cursor={'pointer'}
                  onClick={() => copyToClipboard(fullShippingAddress)}
                />
              </p>

              <h2 className="text-[.8rem] font-light mt-1">
                {fullShippingAddress}
              </h2>
            </div>

            {order?.salesChannel != SalesChannel.Ussd && (
              <div className="space-y-1 mt-4">
                <p className="text-[.9rem] font-semibold flex items-center gap-2">
                  Postal Code: {order?.shipping_address?.zip_code}
                </p>
              </div>
            )}

            <div className="space-y-1 mt-4">
              <p className="text-[.9rem] font-semibold flex items-center gap-2">
                Select shipping status:
              </p>

              <div className="flex items-center gap-2 flex-wrap">
                {Object.values(ShippingStatus).map((s) => (
                  <div
                    onClick={() => {
                      if (updatingShippingStatus) return;
                      if (s !== order?.shippingStatus) {
                        showModal(
                          <ConfirmationModal
                            title="Update Shipping Status"
                            subtitle="Please know that the user will be notified of this status update and required to review"
                            onYes={() => updateShippingStatus(s)}
                          />
                        );
                      }
                    }}
                    className={cn(
                      'rounded-lg border capitalize min-w-fit max-w-fit flex-1 text-[.85rem] p-2 cursor-pointer',
                      s === order?.shippingStatus &&
                        'bg-blue-50 text-blue-700 border-blue-700',
                      updatingShippingStatus && 'animate-pulse'
                    )}
                    key={s}
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleOrderPage;
