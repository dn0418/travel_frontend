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
}

export interface LocaleDataType {
  en: LocaleDataItems,
  ru: LocaleDataItems,
  hy: LocaleDataItems
}