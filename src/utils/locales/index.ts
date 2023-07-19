export const localizationData: LocaleDataType = {
  en: {
    home_plan_title: 'Make Your Own Ride Plan With Us',
    tour_type_title: 'Type of tour',
    destination_title: 'Destination',
    days_title: 'Days',
    date_title: 'Date',
    search_text: 'Search',
    top_suggested_title: 'Top Suggestion',
    one_day: 'One Day',
    fixed_date: 'Fixed Date',
    home_testimonial_title: 'What Travelers Think About Us',
    home_payment_title: 'We Accept Online Payment!',
    name_text: 'Name',
    email_text: 'Email',
    phone_number: 'Phone Number',
    address_text: 'Address',
    next_text: 'Next',
    prev_text: 'Prev',
    search_your_need: 'Search your Need',
    adult_text: 'Adult',
    child_text: 'Child',
    duration_text: 'Duration',
    starting_city: 'Starting city',
    next_city: 'Next city',
    add_next: 'Add Next',
    ride_type: 'Ride type',
    add_your_comment: 'Add your comment',
    cancel_text: 'Cancel',
    submit_text: 'Submit',
    loading_text: 'Loading...',
  },
  ru: {
    home_plan_title: 'Создайте свой собственный план поездки с нами',
    tour_type_title: 'Тип тура',
    destination_title: 'Место назначения',
    days_title: 'Дни',
    date_title: 'Дата',
    search_text: 'Поиск',
    top_suggested_title: 'Топовое предложение',
    one_day: 'Один день',
    fixed_date: 'Фиксированная дата',
    home_testimonial_title: 'Что думают путешественники о нас',
    home_payment_title: 'Мы принимаем онлайн-оплату!',
    name_text: 'Имя',
    email_text: 'Email',
    phone_number: 'Номер телефона',
    address_text: 'Адрес',
    next_text: 'Далее',
    prev_text: 'Назад',
    search_your_need: 'Ищите то, что вам нужно',
    adult_text: 'Взрослый',
    child_text: 'Ребенок',
    duration_text: 'Продолжительность',
    starting_city: 'Город отправления',
    next_city: 'Следующий город',
    add_next: 'Добавить следующий',
    ride_type: 'Тип поездки',
    add_your_comment: 'Добавьте свой комментарий',
    cancel_text: 'Отмена',
    submit_text: 'Отправить',
    loading_text: 'Загрузка...',
  },
  hy: {
    home_plan_title: 'Ստեղծեք ձեր սեփական ճամպայքարը մեզ հետ',
    tour_type_title: 'Տեսաքարտի տեսաքարտ',
    destination_title: 'Նպատակ',
    days_title: 'Օրեր',
    date_title: 'Ամսաթիվ',
    search_text: 'Որոնում',
    top_suggested_title: 'Թոփ առաջարկ',
    one_day: 'Մեկ օր',
    fixed_date: 'Հասանելի ամսաթիվ',
    home_testimonial_title: 'Ի՞նչ մտածում են ճամպայքարիները մեր մասին',
    home_payment_title: 'Դուք կարող եք վճարել օնլայնով։',
    name_text: 'Անուն',
    email_text: 'Էլ. փոստ',
    phone_number: 'Հեռախոսահամար',
    address_text: 'Հասցե',
    next_text: 'Հաջորդը',
    prev_text: 'Նախորդը',
    search_your_need: 'Որոնեք ձեր պահանջը',
    adult_text: 'Մեծահասական',
    child_text: 'Երեխա',
    duration_text: 'Տևողություն',
    starting_city: 'Սկիզբնական քաղաք',
    next_city: 'Հաջորդ քաղաք',
    add_next: 'Ավելացրեք հաջորդը',
    ride_type: 'Տեսաքարտի տեսաքարտ',
    add_your_comment: 'Ավելացրեք ձեր մեկնաբառը',
    cancel_text: 'Չեղարկել',
    submit_text: 'Ուղարկել',
    loading_text: 'Բեռնում...',
  },
};

interface LocaleDataItems {
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
}

interface LocaleDataType {
  en: LocaleDataItems,
  ru: LocaleDataItems,
  hy: LocaleDataItems
}