import { format } from 'date-fns';
import { toast } from 'sonner';

export const copyToClipboard = async (
  content: string,
  msg = 'Copied to clipboard'
) => {
  try {
    await navigator.clipboard.writeText(content);
    toast.success(msg);
  } catch (error: any) {
    toast.error(error || 'Unable to copy to clipboard');
  }
};

export const formatDate = (date: Date) => {
  return format(date, 'MMM dd, yyyy');
};
