import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSidebar } from "@/lib/providers/SideDrawersProvider";
import { useModal } from "@/lib/providers/ModalProvider";
import { FaCheckCircle, FaPlus } from "react-icons/fa";
import { queryClient } from "@/lib/providers";
import useOrderStore from "@/lib/store/order.store";
import SidebarComp from "@/components/Common/Sidebar";
import Button from "@/components/Common/Button";
import CreateProductPage from "../../Products/create-product";
import { getProducts } from "@/lib/services/products.service";
import ThreeDotsLoader from "@/components/Common/Loaders/dots.loader";
import Image from "next/image";
import { formatNaira } from "@/lib/utils";

interface Props {}

export const SelectedProductsUI = () => {
  const { hideSidebar } = useSidebar();
  const { showModal, hideModal } = useModal();

  const { data: products, isPending: loading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  const { selectedProducts, toggleProduct, checkExists } = useOrderStore();

  return (
    <SidebarComp onClose={hideSidebar} width={"40%"} className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="mt-4 font-bold text-lg mb-4">Select Products</p>

          <Button
            onClick={() =>
              showModal(
                <CreateProductPage
                  isModal
                  onSuccess={() => {
                    queryClient.invalidateQueries({
                      predicate: (q) => q.queryKey.includes("products"),
                    });
                    hideModal();
                  }}
                  modalClass="max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-2xl px-5"
                />
              )
            }
            icon={<FaPlus />}
          >
            Add product
          </Button>
        </div>

        {loading ? (
          <div className="py-20 flex items-center justify-center">
            <div className="size-16 animate-spin border-8 border-transparent border-t-accent rounded-full"></div>
          </div>
        ) : products ? (
          <div className="space-y-4">
            <p className="font-medium">
              Available Products{" "}
              <span className="text-xs text-gray-400">
                (click a product to select)
              </span>
            </p>

            <div className="grid grid-cols-2 gap-1 select-none">
              {products.map((product) => (
                <div
                  key={product._id}
                  className={`border cursor-pointer rounded-md duration-300 relative p-2 ${
                    checkExists(product._id)
                      ? "border-accent"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                  onClick={() => toggleProduct(product)}
                >
                  {checkExists(product._id) && (
                    <FaCheckCircle className="text-accent absolute top-2 right-2" />
                  )}

                  <div className="flex gap-2">
                    <div className="size-12 relative rounded-md overflow-hidden">
                      <Image
                        src={product.display_image}
                        alt=""
                        width={100}
                        height={100}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      />
                    </div>

                    <div className="text-sm">
                      <p>{product.name}</p>
                      <p>
                        {product.is_discounted ? (
                          <span>
                            {formatNaira(product.discountedPrice || 0)}{" "}
                            <span className="text-xs text-gray-400 line-through">
                              {formatNaira(product.price)}
                            </span>
                          </span>
                        ) : (
                          `${formatNaira(product.price)}`
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-16 flex items-center justify-center">
            <div className="text-center space-y-2">
              <p className="text-3xl font-bold">Oops!</p>

              <p className="text-gray-500 text-sm">No customers found.</p>

              <Button
                onClick={() =>
                  showModal(
                    <CreateProductPage
                      isModal
                      onSuccess={() => {
                        queryClient.invalidateQueries({
                          predicate: (q) => q.queryKey.includes("products"),
                        });
                        hideModal();
                      }}
                      modalClass="max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-2xl px-5"
                    />
                  )
                }
                className="mx-auto"
                variant="filled"
              >
                Add new customer
              </Button>
            </div>
          </div>
        )}
      </div>
    </SidebarComp>
  );
};
