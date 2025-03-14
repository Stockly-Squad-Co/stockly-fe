import { format } from "date-fns";
import { toast } from "sonner";

export const copyToClipboard = async (
  content: string,
  msg = "Copied to clipboard"
) => {
  try {
    await navigator.clipboard.writeText(content);
    toast.success(msg);
  } catch (error: any) {
    toast.error(error || "Unable to copy to clipboard");
  }
};

export const formatDate = (date: Date | string) => {
  return format(new Date(date), "MMM dd, yyyy");
};

export const formatNaira = (price: number) => {
  return new Intl.NumberFormat("en-NG", {
    currency: "NGN",
    style: "currency",
  }).format(price);
};
