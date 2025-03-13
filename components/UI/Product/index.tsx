"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/lib/services/store.service";

interface Props {
  id: string;
}

const ProductDetails = ({ id }: Props) => {
  const { data: product, isPending: loading } = useQuery({
    queryFn: () => getProductById(id),
    queryKey: ["product", id],
  });

  return <main></main>;
};

export default ProductDetails;
