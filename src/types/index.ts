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