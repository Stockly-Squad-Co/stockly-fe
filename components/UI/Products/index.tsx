"use client";
import { getCollections, getProducts } from "@/lib/services/products.service";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import ProductsHeader from "./header";
import Tabs from "@/components/Common/Tabs";
import ProductsTable from "../Tables/products";
import CollectionsTable from "../Tables/collections";

const ProductsPage = () => {
  const [currentTab, setCurrentTab] = useState<0 | 1>(0);

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  const { data: collections, isLoading: collectionsLoading } = useQuery({
    queryKey: ["collections"],
    queryFn: getCollections,
  });

  return (
    <section className="md:p-6 p-4">
      <>
        <ProductsHeader currentTab={currentTab} />

        <Tabs
          onChangeTab={(idx: typeof currentTab) => setCurrentTab(idx)}
          tabs={[
            {
              header: "Inventory",
              widget: (
                <ProductsTable loading={productsLoading} data={products} />
              ),
            },
            {
              header: "Collections",
              widget: (
                <CollectionsTable
                  loading={collectionsLoading}
                  data={collections}
                />
              ),
            },
          ]}
        />
      </>
    </section>
  );
};

export default ProductsPage;
