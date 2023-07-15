import { NavDataTypes } from "../../types";

interface NavTypes {
  en: NavDataTypes[],
  ru: NavDataTypes[],
  hy: NavDataTypes[],
}

export const navData: NavTypes = {
  en: [
    {
      id: 1,
      title: "Tours",
      route: "tours",
      children: [
        {
          id: 1,
          title: "Active Tours",
          route: "/tours?type=active_tours",
        },
        {
          id: 2,
          title: "Gastro Tours",
          route: "/tours?type=gastro_tours",
        },
        {
          id: 3,
          title: "Oneday Tours",
          route: "/tours?type=oneday_tours",
        },
        {
          id: 4,
          title: "Classic Tours",
          route: "/tours?type=classic_tours",
        },
        {
          id: 5,
          title: "Fixed date Tour",
          route: "/tours?type=fixed_date_tour",
        },
        {
          id: 6,
          title: "Themed Tours",
          route: "/tours?type=themed_tours",
        },
      ],
    },
    {
      id: 2,
      title: "Services",
      route: "services",
      children: [
        {
          id: 1,
          title: "Rent A Transport",
          route: "/services/transport",
        },
        {
          id: 2,
          title: "Hotels",
          route: "/services/hotels",
        },
        {
          id: 3,
          title: "Tour Accessories",
          route: "/services/tour-accessories",
        },
        {
          id: 4,
          title: "MICE",
          route: "/services/mice",
        },
      ],
    },
    {
      id: 3,
      title: "Armenia",
      route: "armenia",
      children: [
        {
          id: 1,
          title: "Things to See",
          route: "/armenia/thing-to-see",
        },
        {
          id: 2,
          title: "Things to Do",
          route: "/armenia/thing-to-do",
        },
        {
          id: 3,
          title: "Food and Drink",
          route: "/armenia/food-and-drink",
        },
        {
          id: 4,
          title: "Useful To Know",
          route: "/armenia/useful-to-know",
        },
        {
          id: 5,
          title: "Events",
          route: "/armenia/events",
        },
        {
          id: 6,
          title: "Brochure",
          route: "/armenia/brochure",
        },
        {
          id: 7,
          title: "Todo In Surrounding",
          route: "/armenia/todo-in-surrounding",
        },
        {
          id: 8,
          title: "Travel Blog",
          route: "/armenia/travel-blog",
        },
      ],
    },
    {
      id: 4,
      title: "About us",
      route: "about-us",
      children: [
        {
          id: 1,
          title: "Who are  you",
          route: "/about-us?tab=who-are-you",
        },
        {
          id: 2,
          title: "How to book a tour",
          route: "/about-us?tab=how-to-book-a-tour",
        },
        {
          id: 3,
          title: "Vacancy",
          route: "/about-us?tab=vacancy",
        },
        {
          id: 4,
          title: "Review",
          route: "/about-us?tab=review",
        },
      ],
    },
  ],
  ru: [
    {
      id: 1,
      title: "Туры",
      route: "tours",
      children: [
        {
          id: 1,
          title: "Активные туры",
          route: "/tours?type=active_tours",
        },
        {
          id: 2,
          title: "Гастро туры",
          route: "/tours?type=gastro_tours",
        },
        {
          id: 3,
          title: "Однодневные туры",
          route: "/tours?type=oneday_tours",
        },
        {
          id: 4,
          title: "Классические туры",
          route: "/tours?type=classic_tours",
        },
        {
          id: 5,
          title: "Туры на определенную дату",
          route: "/tours?type=fixed_date_tour",
        },
        {
          id: 6,
          title: "Тематические туры",
          route: "/tours?type=themed_tours",
        },
      ],
    },
    {
      id: 2,
      title: "Услуги",
      route: "services",
      children: [
        {
          id: 1,
          title: "Аренда транспорта",
          route: "/services/transport",
        },
        {
          id: 2,
          title: "Отели",
          route: "/services/hotels",
        },
        {
          id: 3,
          title: "Аксессуары для тура",
          route: "/services/tour-accessories",
        },
        {
          id: 4,
          title: "мыши",
          route: "/services/mice",
        },
      ],
    },
    {
      id: 3,
      title: "Армения",
      route: "armenia",
      children: [
        {
          id: 1,
          title: "Достопримечательности",
          route: "/armenia/thing-to-see",
        },
        {
          id: 2,
          title: "Что делать",
          route: "/armenia/thing-to-do",
        },
        {
          id: 3,
          title: "Еда и напитки",
          route: "/armenia/food-and-drink",
        },
        {
          id: 4,
          title: "Полезная информация",
          route: "/armenia/useful-to-know",
        },
        {
          id: 5,
          title: "События",
          route: "/armenia/events",
        },
        {
          id: 6,
          title: "Брошюра",
          route: "/armenia/brochure",
        },
        {
          id: 7,
          title: "Что делать в окрестностях",
          route: "/armenia/todo-in-surrounding",
        },
        {
          id: 8,
          title: "Путеводитель",
          route: "/armenia/travel-blog",
        },
      ],
    },
    {
      id: 4,
      title: "О нас",
      route: "about-us",
      children: [
        {
          id: 1,
          title: "Кто вы",
          route: "/about-us?tab=who-are-you",
        },
        {
          id: 2,
          title: "Как заказать тур",
          route: "/about-us?tab=how-to-book-a-tour",
        },
        {
          id: 3,
          title: "Вакансии",
          route: "/about-us?tab=vacancy",
        },
        {
          id: 4,
          title: "Отзывы",
          route: "/about-us?tab=review",
        },
      ],
    },
  ],
  hy: [
    {
      id: 1,
      title: "Տուրեր",
      route: "tours",
      children: [
        {
          id: 1,
          title: "Ակտիվ տուրեր",
          route: "/tours?type=active_tours",
        },
        {
          id: 2,
          title: "Գաստրոնոմիական տուրեր",
          route: "/tours?type=gastro_tours",
        },
        {
          id: 3,
          title: "Մեկօրյա տուրեր",
          route: "/tours?type=oneday_tours",
        },
        {
          id: 4,
          title: "Կլասսիկական տուրեր",
          route: "/tours?type=classic_tours",
        },
        {
          id: 5,
          title: "Օրականագործության տուր",
          route: "/tours?type=fixed_date_tour",
        },
        {
          id: 6,
          title: "Թեմատիկ տուրեր",
          route: "/tours?type=themed_tours",
        },
      ],
    },
    {
      id: 2,
      title: "Ծառայություններ",
      route: "services",
      children: [
        {
          id: 1,
          title: "Տրանսպորտի վարձավճար",
          route: "/services/transport",
        },
        {
          id: 2,
          title: "Հյուրանոցներ",
          route: "/services/hotels",
        },
        {
          id: 3,
          title: "Տուրի ապատականներ",
          route: "/services/tour-accessories",
        },
        {
          id: 4,
          title: "մկներ",
          route: "/services/mice",
        },
      ],
    },
    {
      id: 3,
      title: "Հայաստան",
      route: "armenia",
      children: [
        {
          id: 1,
          title: "Դիտարկվող բնակավայրեր",
          route: "/armenia/thing-to-see",
        },
        {
          id: 2,
          title: "Ի՞նչ անել",
          route: "/armenia/thing-to-do",
        },
        {
          id: 3,
          title: "Սննդասյուներ և խոհանոցներ",
          route: "/armenia/food-and-drink",
        },
        {
          id: 4,
          title: "Հատուկները իմանալու հնարավորություն",
          route: "/armenia/useful-to-know",
        },
        {
          id: 5,
          title: "Միջոցառումներ",
          route: "/armenia/events",
        },
        {
          id: 6,
          title: "Բրոշուր",
          route: "/armenia/brochure",
        },
        {
          id: 7,
          title: "Անցյալում ի՞նչ արեք",
          route: "/armenia/todo-in-surrounding",
        },
        {
          id: 8,
          title: "Ճամփորդական բլոգ",
          route: "/armenia/travel-blog",
        },
      ],
    },
    {
      id: 4,
      title: "Մեր մասին",
      route: "about-us",
      children: [
        {
          id: 1,
          title: "Դուք ո՞վ եք",
          route: "/about-us?tab=who-are-you",
        },
        {
          id: 2,
          title: "Ինչպես պատվիրել տուր",
          route: "/about-us?tab=how-to-book-a-tour",
        },
        {
          id: 3,
          title: "Աշխատավայրեր",
          route: "/about-us?tab=vacancy",
        },
        {
          id: 4,
          title: "Կրթական հարցեր",
          route: "/about-us?tab=review",
        },
      ],
    },
  ]
};
