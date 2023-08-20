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
      id: 1,
      title: "Pages",
      children: [
        {
          id: 1,
          title: "About Us",
          route: "about-us",
        },
        {
          id: 2,
          title: "Our Projects",
          route: "our-projects",
        },
        {
          id: 3,
          title: "Our Team",
          route: "our-team",
        },
        {
          id: 4,
          title: "Contact Us",
          route: "contact-us",
        },
        {
          id: 5,
          title: "Services",
          route: "services",
        },
      ],
    },
    {
      id: 2,
      title: "Services",
      children: [
        {
          id: 1,
          title: "Kitchen",
          route: "/",
        },
        {
          id: 2,
          title: "Living Area",
          route: "/",
        },
        {
          id: 3,
          title: "Bathroom",
          route: "/",
        },
        {
          id: 4,
          title: "Dinning Hall",
          route: "/",
        },
        {
          id: 5,
          title: "Bedroom",
          route: "/",
        },
      ],
    },
    {
      id: 3,
      title: "Contact",
      children: [
        {
          id: 1,
          title: "55 East Birchwood Ave. Brooklyn, New York 11201",
          route: "",
        },
        {
          id: 2,
          title: "contact@interno.com",
          route: "",
        },
        {
          id: 3,
          title: "(123) 456 - 7890",
          route: "",
        },
      ],
    },
  ],
  ru: [
    {
      id: 1,
      title: "Страницы",
      children: [
        {
          id: 1,
          title: "О нас",
          route: "about-us",
        },
        {
          id: 2,
          title: "Наши проекты",
          route: "our-projects",
        },
        {
          id: 3,
          title: "Наша команда",
          route: "our-team",
        },
        {
          id: 4,
          title: "Свяжитесь с нами",
          route: "contact-us",
        },
        {
          id: 5,
          title: "Услуги",
          route: "services",
        },
      ],
    },
    {
      id: 2,
      title: "Услуги",
      children: [
        {
          id: 1,
          title: "Кухня",
          route: "/",
        },
        {
          id: 2,
          title: "Жилая зона",
          route: "/",
        },
        {
          id: 3,
          title: "Ванная комната",
          route: "/",
        },
        {
          id: 4,
          title: "Столовая",
          route: "/",
        },
        {
          id: 5,
          title: "Спальня",
          route: "/",
        },
      ],
    },
    {
      id: 3,
      title: "Контакты",
      children: [
        {
          id: 1,
          title: "55 East Birchwood Ave. Бруклин, Нью-Йорк 11201",
          route: "",
        },
        {
          id: 2,
          title: "contact@interno.com",
          route: "",
        },
        {
          id: 3,
          title: "(123) 456 - 7890",
          route: "",
        },
      ],
    },
  ],
  hy: [
    {
      id: 1,
      title: "Էջեր",
      children: [
        {
          id: 1,
          title: "Մեր մասին",
          route: "about-us",
        },
        {
          id: 2,
          title: "Մեր նախագծերը",
          route: "our-projects",
        },
        {
          id: 3,
          title: "Մեր թիմը",
          route: "our-team",
        },
        {
          id: 4,
          title: "Կապ մեզ հետ",
          route: "contact-us",
        },
        {
          id: 5,
          title: "Ծառայություններ",
          route: "services",
        },
      ],
    },
    {
      id: 2,
      title: "Ծառայություններ",
      children: [
        {
          id: 1,
          title: "Սրճարան",
          route: "/",
        },
        {
          id: 2,
          title: "Բնակարանավայր",
          route: "/",
        },
        {
          id: 3,
          title: "Լոգարան",
          route: "/",
        },
        {
          id: 4,
          title: "Սեղանավայր",
          route: "/",
        },
        {
          id: 5,
          title: "Ննջասեղան",
          route: "/",
        },
      ],
    },
    {
      id: 3,
      title: "Կապ",
      children: [
        {
          id: 1,
          title: "Բրուքլին, Նյու Յորք, Էստ Բիրչվուդ Ավե. 11201",
          route: "",
        },
        {
          id: 2,
          title: "contact@interno.com",
          route: "",
        },
        {
          id: 3,
          title: "(123) 456 - 7890",
          route: "",
        },
      ],
    },
  ]
};
