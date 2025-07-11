export type Event = {
  id?: string;
  title: string;
  date: string;
  description: string;
  category: string;
  isCancelled?: boolean;
  city: string;
  venue: string;
  latitude?: number;
  longitude?: number;
  attendees?: AttendeeProfile[];
  isGoing?: boolean;
  isHost?: boolean;
  hostId?: string;
  hostDisplayName?: string;
};

export type AttendeeProfile = {
  id: string;
  displayName: string;
  bio?: string;
  imageUrl?: string;
};

export type LocationIQSuggestion = {
  place_id: string;
  osm_id: string;
  osm_type: string;
  licence: string;
  lat: string;
  lon: string;
  boundingbox: string[];
  class: string;
  type: string;
  display_name: string;
  display_place: string;
  display_address: string;
  address: LocationIQAddress;
};

export type LocationIQAddress = {
  name: string;
  house_number: string;
  road: string;
  town?: string;
  village?: string;
  suburb: string;
  city?: string;
  county: string;
  postcode: string;
  country: string;
  country_code: string;
  neighbourhood?: string;
  state?: string;
};

export type CurrentUser = {
  id: string;
  email: string;
  displayName: string;
  imageUrl?: string;
};
