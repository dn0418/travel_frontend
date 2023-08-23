export interface HotelInputType {
  [key: string]: any;
  isRu?: boolean;
  isHy?: boolean;
  name: string;
  name_ru: string;
  name_hy: string;
  thumbnail: string;
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
  lat: number | null;
  lng: number | null;
}

export interface AccessoriesInputType {
  [key: string]: any;
  isRu: boolean;
  isHy: boolean;
  title: string;
  title_ru: string;
  title_hy: string;
  price: string;
  thumbnail: string;
  perPax: string;
  perPax_ru: string;
  perPax_hy: string;
  type: string;
  freeCancellation: boolean;
  rentFrom: string;
  rentFrom_ru: string;
  rentFrom_hy: string;
  available: string;
  available_ru: string;
  available_hy: string;
  shortDescription: string;
  shortDescription_ru: string;
  shortDescription_hy: string;
  longDescription: string;
  longDescription_ru: string;
  longDescription_hy: string;
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

export interface ThingToDoInputType {
  [key: string]: any;
  isRu: boolean;
  isHy: boolean;
  name: string;
  name_ru: string;
  name_hy: string;
  thumbnail: string;
  shortDescription: string;
  shortDescription_ru: string;
  shortDescription_hy: string;
  description: string;
  description_ru: string;
  description_hy: string;
  type: string;
  fromYerevan: string;
  fromYerevan_ru: string;
  fromYerevan_hy: string;
  date: string;
  neatestSettlement: string;
  neatestSettlement_ru: string;
  neatestSettlement_hy: string;
  available: string;
  available_ru: string;
  available_hy: string;
  entrance: string;
  entrance_ru: string;
  entrance_hy: string;
  lat: number | null;
  lng: number | null;
}

export interface SurroundingInputType {
  [key: string]: any;
  isRu: boolean;
  isHy: boolean;
  name: string;
  name_ru: string;
  name_hy: string;
  thumbnail: string;
  shortDescription: string;
  shortDescription_ru: string;
  shortDescription_hy: string;
  description: string;
  description_ru: string;
  description_hy: string;
  type: string;
  fromTbilisi: string;
  fromTbilisi_ru: string;
  fromTbilisi_hy: string;
  date: string;
  neatestSettlement: string;
  neatestSettlement_ru: string;
  neatestSettlement_hy: string;
  available: string;
  available_ru: string;
  available_hy: string;
  entrance: string;
  entrance_ru: string;
  entrance_hy: string;
  lat: number | null;
  lng: number | null;
}

export interface FoodAndDrinkInputType {
  [key: string]: any;
  isRu: boolean;
  isHy: boolean;
  name: string;
  name_ru: string;
  name_hy: string;
  thumbnail: string;
  shortDescription: string;
  shortDescription_ru: string;
  shortDescription_hy: string;
  description: string;
  description_ru: string;
  description_hy: string;
  type: string;
  fromYerevan: string;
  fromYerevan_ru: string;
  fromYerevan_hy: string;
  address: string;
  address_ru: string;
  address_hy: string;
  neatestSettlement: string;
  neatestSettlement_ru: string;
  neatestSettlement_hy: string;
  vegan: string;
  vegan_ru: string;
  vegan_hy: string;
  entrance: string;
  entrance_ru: string;
  entrance_hy: string;
  lat: number | null;
  lng: number | null;
}

export interface TourInputType {
  [key: string]: any;
  isRu: boolean;
  isHy: boolean;
  title: string;
  title_ru: string;
  title_hy: string;
  price: string;
  dayLength: string;
  nightLength: string;
  bestTime: string;
  bestTime_ru: string;
  bestTime_hy: string;
  isFixedDate: boolean;
  startDate: string | null;
  endDate: string | null;
  mainList: string;
  childList: string;
  shortDescription: string;
  shortDescription_ru: string;
  shortDescription_hy: string;
  longDescription: string;
  longDescription_ru: string;
  longDescription_hy: string;
  freeCancelation: boolean;
  activities: string;
  locationImg: string;
  thumbnail: string;
  destinationId: string;
}

export interface MiceInputType {
  [key: string]: any;
  isRu: boolean;
  isHy: boolean;
  name: string;
  name_ru: string;
  name_hy: string;
  thumbnail: string;
  shortDescription: string;
  shortDescription_ru: string;
  shortDescription_hy: string;
  description: string;
  description_ru: string;
  description_hy: string;
  comportable: string;
  comportable_ru: string;
  comportable_hy: string;
  activities: string;
  activities_ru: string;
  activities_hy: string;
  extra: string;
  extra_ru: string;
  extra_hy: string;
  access24: boolean;
  freeCancellation: boolean;
}