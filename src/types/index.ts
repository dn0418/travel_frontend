export interface NavLinkTypes {
  id: number;
  title: string;
  route: string;
}

export interface NavDataTypes extends NavLinkTypes {
  children: NavLinkTypes[];
}

export interface FooterDataTypes {
  id: number;
  title: string;
  children: {
    id: number;
    title: string;
    route: string;
  }[];
}


export interface ReviewTypes {
  id: number;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  profilePhoto: string;
  rating: number;
  message: string;
  isActive: boolean;
}

export interface ImageType {
  id: number;
  createdAt: string;
  updatedAt: string;
  url: string;
}

export interface PaginationType {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CarDriverType {
  id: number;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  profilePhoto: string;
  licenseNo: string;
  licenseExpireDate: string;
}

export interface AddReviewPyloadType {
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  profilePhoto: string | null;
  rating: string;
  message: string;
  hotelId?: number;
  carId?: number;
  tourId?: number;
  accessoryId?: number;
  thingToSeeId?: number;
  thingToDoId?: number;
  foodAndDrinkId?: number;
  miceId?: number;
}

export interface ThingToSeeType {
  id: number;
  createdAt: string;
  updatedAt: string;
  isRu: boolean;
  isHy: boolean;
  name: string;
  name_ru: string;
  name_hy: string;
  thumbnail: string;
  lat: number;
  lng: number;
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
  reviews: ReviewTypes[]; // You can replace 'any' with a more specific type if possible
  images: ImageType[];
  rating: number;
}

export interface FoodAndDrinksType {
  id: number;
  createdAt: string;
  updatedAt: string;
  isRu: boolean;
  isHy: boolean;
  name: string;
  name_ru: string;
  name_hy: string;
  thumbnail: string;
  lat: number;
  lng: number;
  shortDescription: string;
  shortDescription_ru: string;
  shortDescription_hy: string;
  description: string;
  description_ru: string;
  description_hy: string;
  type: string;
  location: string;
  location_ru: string;
  location_hy: string;
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
  reviews: ReviewTypes[]; // You can replace 'any' with a more specific type if possible
  images: ImageType[];
  rating: number;
}

export interface CallbackType {
  id: number;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  phone: string | null;
  whatsapp: string | null;
  telegram: string | null;
  voice: string | null;
  country: string;
  timezone: string;
  note: string;
}


export interface RidePlanDestination {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  duration: string;
}

export interface RidePlanType {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  date: string;
  adult: number;
  child: number;
  rideType: string;
  note: string;
  destination: RidePlanDestination[];
}

