import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
