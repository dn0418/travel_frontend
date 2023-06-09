import { FooterDataTypes } from "../../types";

export const footerData: FooterDataTypes[] = [
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
        title: "Kitchan",
        route: "",
      },
      {
        id: 2,
        title: "Living Area",
        route: "",
      },
      {
        id: 3,
        title: "Bathroom",
        route: "",
      },
      {
        id: 4,
        title: "Dinning Hall",
        route: "",
      },
      {
        id: 5,
        title: "Bedroom",
        route: "",
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
];
