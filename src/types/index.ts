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

export interface CarType {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  thumbnail: string;
  model: string;
  carNo: string;
  startedDate: string;
  endDate: string;
  seatNo: number;
  isDriver: boolean;
  description: string;
  price: number;
  discountedPrice: number;
  carDriverId: number | null;
  carId: number | null;
  driverFirstName: string | null;
  driverLastName: string | null;
  driverLicenseNo: string | null;
  rating: number;
  totalReview: number;
  reviews: ReviewTypes[];
  year: number;
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
  type: {
    id: number;
    name: string;
    name_ru: string | null;
    name_hy: string | null;
  };
  reviews: ReviewTypes[];
  rating: number | null;
  images: ImageType[];
  pricing: {
    id: number,
    price: number,
    duration: string;
    duration_ru: string | null;
    duration_hy: string | null;
  }[];
}


export interface HotelType {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  thumbnail: string;
  googleMap: string;
  price: number;
  fromAirport: string;
  country: string;
  city: string;
  freeCancellation: boolean;
  checkInTime: string;
  checkOutTime: string;
  shortDescription: string;
  longDescription: string;
  type: {
    id: number;
    name: string;
  };
  images: ImageType[];
  reviews: ReviewTypes[];
  rating: number;
  pricingTable: {
    id: number;
    name: string;
    firstPart: number;
    lastPart: number;
  }[]
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

export interface DestinationTypes {
  id: number;
  name: string;
  country: string;
}