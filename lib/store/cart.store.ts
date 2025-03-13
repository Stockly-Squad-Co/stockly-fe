import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../@types";
import { toast } from "sonner";

interface CartStore {
  items: Product[];

  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  checkExists: (productId: string) => boolean;
}

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product: Product) =>
        set((state) => {
          const exists = state.items.find((item) => item._id === product._id);
          if (exists) return state;

          toast.success(product.name + " added to cart", { id: product._id });

          return { items: [...state.items, product] };
        }),

      removeFromCart: (productId: string) => {
        set((state) => {
          const exists = state.items.find((item) => item._id === productId);
          const newItems = state.items.filter((item) => item._id !== productId);

          toast.success(exists?.name + " removed from cart", {
            id: `remove-${productId}`,
          });
          return { items: newItems };
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getCartTotal: () => {
        return get().items.reduce((acc, item) => acc + item.price, 0);
      },

      checkExists: (productId: string) => {
        return get().items.some((item) => item._id === productId);
      },
    }),
    { name: "cart-store" }
  )
);

export default useCartStore;
