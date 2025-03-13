"use client";

import { useModal } from "@/lib/providers/ModalProvider";
import Modal from "../../Common/Modal";
import { Product } from "@/lib/@types";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { opacityVariant } from "../../../lib/data/variants";
import { formatNaira } from "../../../lib/utils/helpers";
import { FaStar } from "react-icons/fa";
import { BiMinus, BiPlus } from "react-icons/bi";
import { BsCartDash, BsCartPlus } from "react-icons/bs";
import useCartStore from "../../../lib/store/cart.store";
import { IoMdClose } from "react-icons/io";

const ProductDetailsModal = (product: Product) => {
  const { hideModal } = useModal();
  const [currentIndex, setCurrentIndex] = useState(0);

  const [quantity, setQuantity] = useState(1);

  const {
    checkExists,
    toggleProduct,
    getCartItem,
    increaseQuantity,
    decreaseQuantity,
  } = useCartStore();

  const itemInCart = useMemo(
    () => getCartItem(product._id),
    [product._id, getCartItem]
  );

  useEffect(() => {
    if (itemInCart) {
      setQuantity(itemInCart.quantity!);
    } else {
      setQuantity(1);
    }
  }, [itemInCart]);

  return (
    <Modal
      onClose={hideModal}
      className="bg-white shadow-2xl rounded-xl p-5 md:w-[60vw] overflow-y-auto relative"
    >
      <button onClick={hideModal} className="absolute top-2 right-2 text-2xl">
        <IoMdClose />
      </button>

      <div className="w-full grid grid-cols-2 gap-6">
        <div className="space-y-2 sticky top-2">
          <div className="h-[20rem] border rounded-lg relative overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                {...opacityVariant}
                key={currentIndex}
                className="absolute top-0 left-0 w-full h-full object-cover"
              >
                <Image
                  src={product.images[currentIndex]}
                  alt="product"
                  width={500}
                  height={500}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {product.images && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, i) => (
                <div
                  key={i}
                  className={`h-[5rem] border rounded-lg cursor-pointer relative overflow-hidden duration-300 ${
                    currentIndex === i ? "ring" : ""
                  }`}
                  onClick={() => setCurrentIndex(i)}
                >
                  <Image
                    src={image}
                    alt="product"
                    width={500}
                    height={500}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-7">
          <div className="space-y-3">
            <p className="text-4xl font-medium">{product.name}</p>

            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1">
                <div className="text-yellow-400 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                <p className="text-sm text-gray-600">(5.0)</p>
              </div>

              <p className="text-secondary cursor-pointer font-medium">
                623 reviews
              </p>

              <p>1,236 sold</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex text-sm items-center gap-3">
              <p>Quantity:</p>

              <div className="flex items-center select-none">
                <button
                  className="size-6 border rounded flex items-center justify-center"
                  onClick={() =>
                    itemInCart
                      ? decreaseQuantity(product._id)
                      : setQuantity((prev) => (prev > 1 ? prev - 1 : prev))
                  }
                >
                  <BiMinus />
                </button>

                <button className="size-6 flex items-center justify-center">
                  <span>{itemInCart ? itemInCart.quantity : quantity}</span>
                </button>

                <button
                  className="size-6 border rounded flex items-center justify-center"
                  onClick={() =>
                    itemInCart
                      ? increaseQuantity(product._id)
                      : setQuantity((prev) => prev + 1)
                  }
                >
                  <BiPlus />
                </button>
              </div>
            </div>

            <div className="text-2xl">
              {product.is_discounted ? (
                <p className="">
                  {formatNaira(product.discountedPrice || 0)}{" "}
                  <span className="text-sm text-gray-400 line-through">
                    {formatNaira(product.price)}
                  </span>
                </p>
              ) : (
                <p>{formatNaira(product.price)}</p>
              )}
            </div>
          </div>

          <div className="space-y-2 text-gray-600 text-sm">
            <p className=" font-medium">DESCRIPTION</p>

            <p className="text-gray-500">
              Elevate your style with the Men’s Versace Signature Eau de Parfum,
              a bold and sophisticated fragrance crafted for the modern
              gentleman. This luxurious scent opens with fresh citrus notes of
              bergamot and neroli, balanced by the warmth of black pepper and
              cardamom.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              className="py-3 text-sm font-medium border justify-center border-primary duration-300 hover:bg-primary hover:text-white text-black rounded-full flex items-center gap-2"
              onClick={() => toggleProduct({ ...product, quantity })}
            >
              <span>
                {checkExists(product._id) ? "Remove from Cart" : "Add to Cart"}
              </span>
              {checkExists(product._id) ? <BsCartDash /> : <BsCartPlus />}
            </button>

            <button className="py-3 text-sm font-medium border border-primary duration-300 hover:bg-primary hover:text-white text-black rounded-full">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetailsModal;
