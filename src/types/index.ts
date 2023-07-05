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
}


export interface TourType {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  destination: string;
  price: number;
  discountedPrice: number;
  dayLength: number;
  nightLength: number;
  tourType: string;
  startedDate: string;
  endDate: string;
  activities: number;
  car: boolean;
  hiking: boolean;
  motorCycle: boolean;
  hotel: number;
  hotelDetails: string;
  locationImg: string;
  tourDetails: string;
  thumbnail: string;
  images: string[];
  includesServices: string[];
  excludeServices: string[];
  reviews: ReviewTypes[];
  reviewsRating?: number;
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
  title: string;
  thumbnail: string;
  price: number;
  perPax: string;
  freeCancellation: boolean;
  rentFrom: string;
  available: string;
  shortDescription: string;
  longDescription: string;
  type: {
    id: number;
    name: string;
  };
  reviews: ReviewTypes[];
  rating: number | null;
  images: { id: number, url: string }[];
  pricing: { id: number, price: number, duration: string }[];
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
  images: { url: string }[];
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
}