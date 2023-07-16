import { ImageType, ReviewTypes } from ".";

export interface PriceWithoutDriverType {
  id: number;
  createdAt: string;
  updatedAt: string;
  destination: string;
  sedan_3seat: number;
  minivan_7seat: number;
  minibus_18seat: number;
  bus_35seat: number;
}

export interface CarWithOutType {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  price: number;
  freeCancellation: boolean;
  pickup: string;
  fuel: string;
  year: number;
  seatNo: number;
  thumbnail: string;
  shortDescription: string;
  description: string;
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
