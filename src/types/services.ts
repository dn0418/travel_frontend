import { ImageType, ReviewTypes } from ".";

export interface HotelDataType {
  id: number;
  createdAt: string;
  updatedAt: string;
  isRu: boolean;
  isHy: boolean;
  name: string;
  name_ru: string;
  name_hy: string;
  thumbnail: string;
  googleMap: string;
  price: number;
  fromAirport: boolean;
  country: string;
  country_ru: string;
  country_hy: string;
  city: string;
  city_ru: string;
  city_hy: string;
  freeCancellation: boolean;
  checkInTime: string;
  checkOutTime: string;
  shortDescription: string;
  shortDescription_ru: string;
  shortDescription_hy: string;
  longDescription: string;
  longDescription_ru: string;
  longDescription_hy: string;
  type: HotelTypes;
  images: ImageType[];
  reviews: ReviewTypes[];
  rating: number;
  pricingTable: HotelPricingTable[]
}

export interface HotelPricingTable {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  name_ru: string;
  name_hy: string;
  firstPart: number;
  lastPart: number;
}

export interface HotelTypes {
  id: number;
  name: string;
  name_ru: string;
  name_hy: string;
}

export interface TourAccessoryType {
  id: number;
  createdAt: string;
  updatedAt: string;
  isRu: boolean;
  isHy: boolean;
  title: string;
  title_ru: string | null;
  title_hy: string | null;
  thumbnail: string;
  price: number;
  perPax: string;
  perPax_ru: string | null;
  perPax_hy: string | null;
  freeCancellation: boolean;
  rentFrom: string;
  rentFrom_ru: string | null;
  rentFrom_hy: string | null;
  available: string;
  available_ru: string | null;
  available_hy: string | null;
  shortDescription: string;
  shortDescription_ru: string | null;
  shortDescription_hy: string | null;
  longDescription: string;
  longDescription_ru: string | null;
  longDescription_hy: string | null;
  type: AccessoryTypes;
  reviews: ReviewTypes[];
  rating: number | null;
  images: ImageType[];
  pricing: AccessoriesPricingType[];
}

export interface AccessoriesPricingType {
  id: number,
  price: number,
  duration: string;
  duration_ru: string | null;
  duration_hy: string | null;
}

export interface AccessoryTypes {
  id: number;
  name: string;
  name_ru: string;
  name_hy: string;
}