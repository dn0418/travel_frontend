import { FooterDataTypes } from "../../types";

export const footerData: {
  description: {
    en: string;
    ru: string;
    hy: string;
  },
  en: FooterDataTypes[],
  ru: FooterDataTypes[],
  hy: FooterDataTypes[],
} = {
  description: {
    en: 'It is a long established fact that a reader will be distracted lookings.',
    ru: 'Это давно установленный факт, что читатель будет отвлекаться на поиски.',
    hy: 'Վաղուց հաստատված փաստ է, որ ընթերցողի ուշադրությունը կշեղվի:',
  },
  en: [
    {
      id: 0,
      title: "Pages",
      children: [
        {
          id: 1,
          title: "Our team",
          route: "/about-us?tab=who_we_are",
        },
        {
          id: 2,
          title: "To book a tour",
          route: "/about-us?tab=how_to_book_a_tour",
        },
        {
          id: 3,
          title: "Vacancies",
          route: "/about-us?tab=vacancy",
        },
        {
          id: 4,
          title: "Travel blog",
          route: "/armenia/blogs",
        },
        {
          id: 5,
          title: "Contact us",
          route: "/contacts",
        },
      ],
    },
    {
      id: 2,
      title: "Services",
      children: [
        {
          id: 1,
          title: "Tours",
          route: "/tours",
        },
        {
          id: 2,
          title: "Rent a car",
          route: "/services/transport",
        },
        {
          id: 3,
          title: "Hotels",
          route: "/services/hotels",
        },
        {
          id: 4,
          title: "Things to see",
          route: "/armenia/thing-to-see",
        },
        {
          id: 5,
          title: "MICE",
          route: "/services/mice",
        },
      ],
    },
    {
      id: 3,
      title: "Contact",
      children: [
        {
          id: 1,
          title: "Fuchik 2 all, 3/35, Yerevan,0078",
          route: "",
        },
        {
          id: 2,
          title: "info@2expediGon.com",
          route: "",
        },
        {
          id: 3,
          title: "+37494 494 674",
          route: "",
        },
      ],
    },
  ],
  ru: [
    {
      id: 0,
      title: "Страницы",
      children: [
        {
          id: 1,
          title: "Наша команда",
          route: "/about-us?tab=who_we_are",
        },
        {
          id: 2,
          title: "Забронировать тур",
          route: "/about-us?tab=how_to_book_a_tour",
        },
        {
          id: 3,
          title: "Вакансии",
          route: "/about-us?tab=vacancy",
        },
        {
          id: 4,
          title: "Путешествия блог",
          route: "/armenia/blogs",
        },
        {
          id: 5,
          title: "Свяжитесь с нами",
          route: "/contacts",
        },
      ],
    },
    {
      id: 2,
      title: "Услуги",
      children: [
        {
          id: 1,
          title: "Туры",
          route: "/tours",
        },
        {
          id: 2,
          title: "Аренда автомобиля",
          route: "/services/transport",
        },
        {
          id: 3,
          title: "Отели",
          route: "/services/hotels",
        },
        {
          id: 4,
          title: "Достопримечательности",
          route: "/armenia/thing-to-see",
        },
        {
          id: 5,
          title: "MICE",
          route: "/services/mice",
        },
      ],
    },
    {
      id: 3,
      title: "Контакты",
      children: [
        {
          id: 1,
          title: "Фучик 2, 3/35, Ереван, 0078",
          route: "",
        },
        {
          id: 2,
          title: "info@2expediGon.com",
          route: "",
        },
        {
          id: 3,
          title: "+37494 494 674",
          route: "",
        },
      ],
    },
  ],
  hy: [
    {
      id: 0,
      title: "Էջեր",
      children: [
        {
          id: 1,
          title: "Մեր թիմ",
          route: "/about-us?tab=who_we_are",
        },
        {
          id: 2,
          title: "Գնել աշխատանք",
          route: "/about-us?tab=how_to_book_a_tour",
        },
        {
          id: 3,
          title: "Հավաստագրեր",
          route: "/about-us?tab=vacancy",
        },
        {
          id: 4,
          title: "Ճամփանիշների բլոգ",
          route: "/armenia/blogs",
        },
        {
          id: 5,
          title: "Կապ մեզ հետ",
          route: "/contacts",
        },
      ],
    },
    {
      id: 2,
      title: "Ծառայություններ",
      children: [
        {
          id: 1,
          title: "Տուրեր",
          route: "/tours",
        },
        {
          id: 2,
          title: "Ավտոմոբիլի վարձավճար",
          route: "/services/transport",
        },
        {
          id: 3,
          title: "Հյուրանոցներ",
          route: "/services/hotels",
        },
        {
          id: 4,
          title: "Դիտելու բաժիններ",
          route: "/armenia/thing-to-see",
        },
        {
          id: 5,
          title: "MICE",
          route: "/services/mice",
        },
      ],
    },
    {
      id: 3,
      title: "Կապը",
      children: [
        {
          id: 1,
          title: "Ֆուչիկ 2, 3/35, Երևան, 0078",
          route: "",
        },
        {
          id: 2,
          title: "info@2expediGon.com",
          route: "",
        },
        {
          id: 3,
          title: "+37494 494 674",
          route: "",
        },
      ],
    },
  ]
};
