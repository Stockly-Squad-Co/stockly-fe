'use client';

import BackButton from '@/components/Common/Button/back-button';
import Skeleton from '@/components/Layout/Skeleton';
import { getCollection } from '@/lib/services/products.service';
import { formatDate } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';
import ProductsTable from '../Tables/products';
import Tabs from '@/components/Common/Tabs';

const SingleCollectionPage = () => {
  const { id } = useParams();

  const { data: collection, isLoading } = useQuery({
    queryKey: ['collections', id],
    queryFn: () => getCollection(id as string),
  });

  if (isLoading) return <Skeleton />;

  return (
    <section className="p-4 md:p-6">
      <header className="flex items-center gap-2 mb-8">
        <BackButton />
        <h1 className="font-bold text-[1.5rem]">Collection</h1>
      </header>

      <section className="flex items-start gap-4 px-6">
        <article
          className={
            'rounded-lg shadow-md border bg-white flex-[4] w-full px-6 py-4'
          }
        >
          <header className="flex items-center gap-4">
            <Image
              width={500}
              height={500}
              className="w-[80px] h-[80px] rounded-full object-center object-cover"
              src={collection?.image!}
              alt="collection-logo"
            />

            <h1 className="text-[1.1rem] font-bold">{collection?.name}</h1>
          </header>
          <p className="text-[.9rem] text-gray-600 mt-2">
            {collection?.description}
          </p>
        </article>

        <article className="rounded-lg shadow-md border bg-white flex-[2] w-full">
          <header className="border-b py-4 px-6 flex items-center gap-4">
            <h1 className="text-[1.1rem] font-bold text-gray-600">
              Collection Information
            </h1>
          </header>

          <div className="py-4 px-6 border-b flex items-center justify-between text-[.9rem]">
            <p className="text-gray-600">Date Created</p>
            <p className="font-bold">{formatDate(collection?.createdAt!)}</p>
          </div>

          <div className="px-6 py-4 border-b flex items-center justify-between text-[.9rem]">
            <p className="text-gray-600">Total Products</p>
            <p className="font-bold">{collection?.allProducts?.length}</p>
          </div>

          <div className="px-6 py-4 border-b flex items-center justify-between text-[.9rem]">
            <p className="text-gray-600">Published Products</p>
            <p className="font-bold">{collection?.publishedProducts?.length}</p>
          </div>

          <div className="px-6 py-4 border-b flex items-center justify-between text-[.9rem]">
            <p className="text-gray-600">Unpublished Products</p>
            <p className="font-bold">
              {collection?.unpublishedProducts?.length}
            </p>
          </div>
        </article>
      </section>

      <article className={'rounded-md shadow-md border'}>
        <header className="border-b py-4 px-6 flex items-center gap-4">
          <h1 className="text-[1.1rem] font-bold text-gray-600">
            Products {`(${collection?.allProducts?.length})`}
          </h1>
        </header>

        <div className="py-4 px-6">
          <Tabs
            tabs={[
              {
                header: 'All',
                widget: (
                  <ProductsTable
                    data={collection?.allProducts}
                    loading={isLoading}
                  />
                ),
              },
              {
                header: 'Published',
                widget: (
                  <ProductsTable
                    data={collection?.publishedProducts}
                    loading={isLoading}
                  />
                ),
              },
              {
                header: 'Unpublished',
                widget: (
                  <ProductsTable
                    data={collection?.unpublishedProducts}
                    loading={isLoading}
                  />
                ),
              },
            ]}
          />
        </div>
      </article>
    </section>
  );
};

export default SingleCollectionPage;
