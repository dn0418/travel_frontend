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




