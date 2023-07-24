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