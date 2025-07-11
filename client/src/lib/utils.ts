import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getVenue = (fullLocationAddress?: string) => {
  if (!fullLocationAddress) return '';
  return fullLocationAddress.split(',')[0];
};

export const getAddress = (fullLocationAddress?: string) => {
  if (!fullLocationAddress) return '';
  return fullLocationAddress.split(',').slice(1).join(',').trim();
};

export const formatDate = (date: string) => {
  const eventDate = new Date(date);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  if (format(eventDate, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')) {
    return 'Today';
  }
  if (format(eventDate, 'yyyy-MM-dd') === format(tomorrow, 'yyyy-MM-dd')) {
    return 'Tomorrow';
  }
  return format(eventDate, 'EEE, d MMM, yyyy');
};
