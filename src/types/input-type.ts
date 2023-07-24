export interface HotelInputType {
  [key: string]: any;
  isRu?: boolean;
  isHy?: boolean;
  name: string;
  name_ru: string;
  name_hy: string;
  thumbnail: string;
  googleMap: string;
  price: string;
  fromAirport: boolean;
  country: string;
  country_ru: string;
  country_hy: string;
  city: string;
  city_ru: string;
  city_hy: string;
  freeCancellation?: boolean;
  checkInTime?: string;
  checkOutTime?: string;
  shortDescription: string;
  shortDescription_ru: string;
  shortDescription_hy: string;
  longDescription: string;
  longDescription_ru: string;
  longDescription_hy: string;
  type: string;
}

export interface WithoutDriverInputType {
  [key: string]: any; // Add this line to indicate that a string can be used as an index
  name: string;
  name_ru: string;
  name_hy: string;
  price: string | number;
  freeCancellation: boolean;
  isRu: boolean;
  isHy: boolean;
  pickup: string;
  pickup_ru: string;
  pickup_hy: string;
  fuel: string;
  fuel_ru: string;
  fuel_hy: string;
  year: string | number;
  seatNo: string | number;
  thumbnail: string;
  shortDescription: string;
  shortDescription_ru: string;
  shortDescription_hy: string;
  description: string;
  description_ru: string;
  description_hy: string;
}