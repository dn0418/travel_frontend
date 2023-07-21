import { ImageType, ReviewTypes } from ".";

export interface PriceWithoutDriverType {
  id: number;
  destination: string;
  destination_hy: string;
  destination_ru: string;
  sedan_3seat: number;
  minivan_7seat: number;
  minibus_18seat: number;
  bus_35seat: number;
}

export interface CarWithOutType {
  id: number;
  createdAt: string;
  updatedAt: string;
  isRu: boolean;
  isHy: boolean;
  name: string;
  name_ru: string;
  name_hy: string;
  price: number;
  freeCancellation: boolean;
  pickup: string;
  pickup_ru: string;
  pickup_hy: string;
  fuel: string;
  fuel_ru: string;
  fuel_hy: string;
  year: number;
  seatNo: number;
  thumbnail: string;
  shortDescription: string;
  shortDescription_ru: string;
  shortDescription_hy: string;
  description: string;
  description_ru: string;
  description_hy: string;
  reviews: ReviewTypes[];
  priceWithoutDriver: PriceWithoutDriverType[];
  totalReview: number;
  rating: number;
  images: ImageType[];
}


export interface CarWithDriverType {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  title_ru: string;
  title_hy: string;
  description: string;
  description_ru: string;
  description_hy: string;
  pricing: {
    id: number;
    duration: string;
    duration_ru: string;
    duration_hy: string;
    price: number;
  }[];
  images: ImageType[];
}

export interface AirportTransportType {
  id: number;
  createdAt: string;
  updatedAt: string;
  description: string;
  description_ru: string;
  description_hy: string;
  images: ImageType[];
}
