"use client";

import {
  fetchCollections,
  fetchProducts,
  getStoreInfo,
} from "@/lib/services/store.service";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import StoreSkeleton from "./skeleton";
import { formatNaira } from "@/lib/utils/helpers";
import useCartStore from "@/lib/store/cart.store";

interface Props {
  slug: string;
}

const Store = ({ slug }: Props) => {
  const {
    data: store,
    isPending: loading,
    isError,
  } = useQuery({
    queryFn: () => getStoreInfo(slug),
    queryKey: ["store", slug],
  });

  const { data: collections, isPending: collectionsLoading } = useQuery({
    queryFn: () => fetchCollections(slug),
    queryKey: ["collections", slug],
  });

  const { data: products, isPending: productsLoading } = useQuery({
    queryFn: () => fetchProducts({ slug }),
    queryKey: ["products", slug],
  });

  const { addToCart, checkExists, removeFromCart } = useCartStore();

  if (loading) return <StoreSkeleton />;

  if (!store || isError)
    return (
      <div className="h-screen min-w-screen flex items-center justify-center text-center">
        <div>
          <p className="font-bold text-3xl">Oops!</p>
          <p>Store Not found.</p>
        </div>
      </div>
    );

  return (
    <main>
      <section className="h-[20rem] bg-accent/10 rounded-lg mt-20 flex items-center w-full container">
        <div className="flex items-center gap-8">
          <div className="size-44 rounded-full relative overflow-auto bg-accent/10">
            <Image
              src={store?.logo}
              alt="logo"
              width={500}
              height={500}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>

          <div>
            <h1 className="font-extrabold text-5xl">{store.name}</h1>
            <p className="text-gray-500">{store.slogan}</p>
          </div>
        </div>
      </section>

      {/* <section>
        <div className="container py-8 space-y-4">
          {collectionsLoading ? (
            <div className="flex items-center gap-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse py-4 flex-grow rounded-lg bg-gray-200"
                ></div>
              ))}
            </div>
          ) : (
            collections && (
              <div className="flex items-center gap-2">
                {collections.map((collection, i) => (
                  <div key={i} className="py-2 px-5 rounded-lg bg-gray-200">
                    {collection.name}
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </section> */}

      <section className="py-8 container relative">
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="font-bold text-xl">Collections </h3>
            <div className="flex-[1.5] flex-shrink-0">
              {collectionsLoading ? (
                <div className="grid grid-cols-4 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="animate-pulse py-8 flex-grow rounded-lg bg-gray-200"
                    ></div>
                  ))}
                </div>
              ) : (
                collections && (
                  <div className="grid grid-cols-4 gap-4">
                    {collections.map((collection, i) => (
                      <div
                        key={i}
                        className="py-10 relative overflow-hidden flex-shrink-0 min-w-fit text-center cursor-pointer px-5 rounded-lg bg-gray-100 text-sm hover:bg-gray-200 duration-300 select-none"
                      >
                        <Image
                          src={collection.image}
                          alt="collection"
                          width={500}
                          height={500}
                          className="absolute top-0 left-0 w-full h-full object-cover"
                        />

                        <div className="absolute top-0 left-0 w-full h-full bg-black/50 text-white flex items-center justify-center">
                          <p className="font-semibold">{collection.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-xl">Products</h3>

            {productsLoading ? (
              <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-md min-h-72 border bg-gray-100 animate-pulse"
                  ></div>
                ))}
              </div>
            ) : products ? (
              <div className="grid grid-cols-4 gap-4">
                {products.map((product, i) => (
                  <div
                    key={product._id}
                    className="rounded-md border p-3 border-gray-50"
                  >
                    <div className="relative overflow-hidden group duration-300 min-h-[15rem] rounded-md">
                      <Image
                        src={product.display_image}
                        alt="product"
                        width={500}
                        height={500}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      />
                    </div>

                    <div className="py-4">
                      <div className="flex space-y-2 justify-between gap-2 items-center">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-400 line-clamp-1">
                            A perfect balance of high-quality audio.
                          </p>
                        </div>

                        {product.is_discounted ? (
                          <div className="">
                            <p className="font-semibold text-sm">
                              {formatNaira(product.discountedPrice || 0)}
                            </p>
                            <p className="text-xs text-gray-500 line-through">
                              {formatNaira(product.price)}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-xs text-gray-500 line-through">
                              {formatNaira(product.price)}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      className="py-1.5 px-3 text-sm font-medium border border-primary duration-300 hover:bg-primary hover:text-white text-black rounded-full"
                      onClick={() =>
                        checkExists(product._id)
                          ? removeFromCart(product._id)
                          : addToCart(product)
                      }
                    >
                      {checkExists(product._id)
                        ? "Remove from cart"
                        : "Add to cart"}
                    </button>

                    {/* <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/10 to-black/90"></div> */}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16">
                <p>No products in store.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Store;
