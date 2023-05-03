// @flow strict

import { Container, List, ListItem, ListItemText } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter,
} from "react-icons/io5";
import logo from "/public/Logo.png";

const footerData = [
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
        route: "kitchan",
      },
      {
        id: 2,
        title: "Living Area",
        route: "living-area",
      },
      {
        id: 3,
        title: "Bathroom",
        route: "bathroom",
      },
      {
        id: 4,
        title: "Dinning Hall",
        route: "dinning-hall",
      },
      {
        id: 5,
        title: "Bedroom",
        route: "bedroom",
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

function Footer() {
  return (
    <footer className=' inset-x-0 bottom-0 bg-black text-white py-6 sm:py-12'>
      <Container className='grid sm:grid-cols-5 gap-x-5'>
        <div className='sm:col-span-2'>
          <div className='bg-white w-fit px-8 py-3 rounded-lg'>
            <Image src={logo} alt='logo' />
          </div>
          <div className='ml-5'>
            <p className='mt-5'>
              It is a long established fact that a reader will be distracted
              lookings.
            </p>
            <div className='flex items-center gap-8 mt-8'>
              <Link href='/'>
                <IoLogoFacebook className='text-white text-xl' />
              </Link>
              <Link href='/'>
                <IoLogoTwitter className='text-white text-xl' />
              </Link>
              <Link href='/'>
                <IoLogoLinkedin className='text-white text-xl' />
              </Link>
              <Link href='/'>
                <IoLogoInstagram className='text-white text-xl' />
              </Link>
            </div>
          </div>
        </div>
        {footerData.map((item) => (
          <div key={item.id} className='m-0 p-0'>
            <p className='text-2xl m-0 p-0'>{item.title}</p>
            <List className='m-0 p-0'>
              {item?.children?.map((child) => (
                <ListItem className='pl-0' key={child.id}>
                  {child?.route ? (
                    <Link className='no-underline text-white' href='/'>
                      <ListItemText primary={child.title} />
                    </Link>
                  ) : (
                    <ListItemText primary={child.title} />
                  )}
                </ListItem>
              ))}
            </List>
          </div>
        ))}
      </Container>
    </footer>
  );
}

export default Footer;
