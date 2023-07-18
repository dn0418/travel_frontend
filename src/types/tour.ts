import { ImageType, ReviewTypes } from ".";

export interface TourType {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  title_ru: string;
  title_hy: string;
  price: number;
  dayLength: number;
  nightLength: number;
  bestTime: string;
  bestTime_ru: string;
  bestTime_hy: string;
  date: string | null;
  mainList: string;
  mainList_ru: string;
  mainList_hy: string;
  childList: string;
  childList_ru: string;
  childList_hy: string;
  shortDescription: string;
  shortDescription_ru: string;
  shortDescription_hy: string;
  longDescription: string;
  longDescription_ru: string;
  longDescription_hy: string;
  freeCancelation: boolean;
  activities: number;
  thumbnail: string;
  locationImg: string;
  reviews: ReviewTypes[];
  destination: TourDestination;
  includesServices: TourService[];
  excludeServices: TourService[];
  images: ImageType[];
  routes: TourRoute[];
  individualPricing: IndividualPricing[];
  departuresPricing: DeparturesPricing[];
  reviewsRating: number | null;
  reviewsQuantity: any;
}

export interface DeparturesPricing {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  startDate: string;
  endDate: string;
  maxPerson: number;
  price: number;
}

export interface TourDestination {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  name_ru: string;
  name_hy: string;
  country: string;
  country_ru: string;
  country_hy: string;
}

export interface TourService {
  id: number;
  createdAt: string;
  updatedAt: string;
  text: string;
  text_ru: string;
  text_hy: string;
  type: string;
}

enum Type {
  Exclude = "exclude",
  Include = "include",
}

export interface IndividualPricing {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  pax2_3: number;
  pax4_6: number;
  pax7_18: number;
  pax20_more: number;
}

export interface TourRoute {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  title_ru: string;
  title_hy: string;
  description: string;
  description_ru: string;
  description_hy: string;
  time: string;
  time_ru: string;
  time_hy: string;
  distance: string;
  distance_ru: string;
  distance_hy: string;
  meals: string;
  meals_ru: string;
  meals_hy: string;
  hotel: string;
  hotel_ru: string;
  hotel_hy: string;
  type: Type;
}
