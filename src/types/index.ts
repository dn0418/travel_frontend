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
}

export interface HotelType {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  quality: string;
  roomsDetails: string;
  date: string;
  hotelDetails: string;
  locationImg: string;
  type: string;
  price: number;
  discountedPrice: number;
  thumbnail: string;
  activities: number;
  country: string;
  city: string;
  rating: number | null;
  reviewCount: string;
  images: { url: string }[];
  reviews: ReviewTypes[];
}
