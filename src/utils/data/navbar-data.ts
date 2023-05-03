import { NavDataTypes } from "../../types";

export const navData: NavDataTypes[] = [
  {
    id: 1,
    title: "Tours",
    route: "tours",
    children: [
      {
        id: 1,
        title: "Active Tours",
        route: "active-tours",
      },
      {
        id: 2,
        title: "Gastro Tours",
        route: "gastro-tours",
      },
      {
        id: 3,
        title: "Oneday Tours",
        route: "oneday-tours",
      },
      {
        id: 4,
        title: "Classic Tours",
        route: "classic-tours",
      },
      {
        id: 5,
        title: "Fixed date Tour",
        route: "fixed-date-tour",
      },
      {
        id: 6,
        title: "Themed Tours",
        route: "themed-tours",
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
        route: "rent-a-transport",
      },
      {
        id: 2,
        title: "Hotels",
        route: "hotels",
      },
      {
        id: 3,
        title: "Tour Accessories",
        route: "tour-accessories",
      },
      {
        id: 4,
        title: "MICE",
        route: "mice",
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
        route: "things-to-see",
      },
      {
        id: 2,
        title: "Things to Do",
        route: "things-to-do",
      },
      {
        id: 3,
        title: "Food and Drink",
        route: "food-and-drink",
      },
      {
        id: 4,
        title: "Useful To Know",
        route: "useful-to-know",
      },
      {
        id: 5,
        title: "Events",
        route: "events",
      },
      {
        id: 6,
        title: "Brochure",
        route: "brochure",
      },
      {
        id: 7,
        title: "Todo In Surrounding",
        route: "todo-in-surrounding",
      },
      {
        id: 8,
        title: "Travel Blog",
        route: "travel-blog",
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
        route: "who-are-you",
      },
      {
        id: 2,
        title: "How to book a tour",
        route: "how-to-book-a-tour",
      },
      {
        id: 3,
        title: "Vacancy",
        route: "vacancy",
      },
      {
        id: 4,
        title: "Review",
        route: "review",
      },
    ],
  },
];
