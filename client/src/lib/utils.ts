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

export const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    drinks: 'bg-blue-100 text-blue-700',
    culture: 'bg-purple-100 text-purple-700',
    music: 'bg-pink-100 text-pink-700',
    travel: 'bg-green-100 text-green-700',
    food: 'bg-yellow-100 text-yellow-700',
    film: 'bg-red-100 text-red-700',
  };

  return colors[category] || 'bg-gray-100 text-gray-700';
};

export const transformShortVenue = (venue: string) => {
  return venue.split(',')[0] ?? null;
};
