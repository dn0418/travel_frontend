import { ImageType, ReviewTypes } from ".";

export interface TourType {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  price: number;
  dayLength: number;
  nightLength: number;
  bestTime: string;
  date: null;
  mainList: string;
  childList: string;
  shortDescription: string;
  longDescription: string;
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
  createdAt: Date;
  updatedAt: Date;
  name: string;
  country: string;
}

export interface TourService {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  text: string;
  type: Type;
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
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  time: string;
  distance: string;
  meals: string;
  hotel: string;
}
