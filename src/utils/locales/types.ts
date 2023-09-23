export interface transportLocalizationType {
  pickup_text: string;
  fuel_text: string;
  year_text: string;
  seat_text: string;
  pricing_title: string;
  activities_text: string;
  yes_text: string;
  no_text: string;
  top_suggested_title: string;
  sedan_text: string;
  minivan_text: string;
  minibus_text: string;
  bus_text: string;
}

export interface LocaleDataItems {
  home_plan_title: string;
  tour_type_title: string;
  destination_title: string;
  mice_page_title: string;
  days_title: string;
  date_title: string;
  search_text: string;
  top_suggested_title: string;
  one_day: string;
  fixed_date: string;
  home_testimonial_title: string;
  home_payment_title: string;
  name_text: string;
  email_text: string;
  phone_number: string;
  address_text: string;
  next_text: string;
  prev_text: string;
  search_your_need: string;
  adult_text: string;
  child_text: string;
  duration_text: string;
  starting_city: string;
  next_city: string;
  add_next: string;
  ride_type: string;
  add_your_comment: string;
  cancel_text: string;
  submit_text: string;
  loading_text: string;
  free_cancelation: string;
  transportData: transportLocalizationType;
  send_request: string;
  reviews_title: string;
  add_reviews: string;
  star_text: string;
  people_text: string;
  start_from: string;
  from_yerevan_text: string;
  from_tbilisi_text: string;
  per_pax_text: string;
  rent_from_text: string;
  available_text: string;
  type_text: string;
  accessory_pricing_text: string;
  time_duration_text: string;
  price_text: string;
  from_airport_text: string;
  checkOut_text: string;
  checkIn_text: string;
  hotel_pricing: string;
  the_nearest_settlement_text: string;
  entrance_text: string;
  best_time_text: string;
  route_text: string;
  package_details_text: string;
  related_tours_text: string;
  vegan_menu: string;
  food_and_drink: string;
  no_text: string;
  yes_text: string;
  related_hotels_text: string;
  night_text: string;
  individual_tour_title: string;
  departure_tour_title: string;
  price_per_pax_title: string;
  firstName: string;
  lastName: string;
  startDate: string;
  endDate: string;
  telephone_text: string;
  additional_info_text: string;
  mice_type_text: string;
  iam_not_robot_text: string;
  agree_with_terms_text: string;
  tour_name_text: string;
  tour_modal_title: string;
  room_text: string;
  hotel_modal_title: string;
  quantity_text: string;
  tour_accessories_text: string;
  car_text: string;
  rent_text: string;
  see_more_text: string;
  read_more_text: string;
  not_found_text: string;
  mice_request_text: string;
  blog_title: string;
}

export interface LocaleDataType {
  en: LocaleDataItems;
  ru: LocaleDataItems;
  hy: LocaleDataItems;
}


export interface LocaleTourDataType {
  day_text: string;
  night_text: string;
}