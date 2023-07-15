// @flow strict

import { Container, List, ListItem, ListItemText } from "@mui/material";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter,
} from "react-icons/io5";
import { footerData } from "../../../utils/data/footer-data";
import logo from "/public/Logo.png";

function Footer() {
  const [footerItems, setFooterItems] = useState(footerData?.en);
  const { locale } = useRouter();

  useEffect(() => {
    if (locale && locale === 'hy') {
      setFooterItems(footerData.hy);
    } else if (locale && locale === 'ru') {
      setFooterItems(footerData.ru);
    } else {
      setFooterItems(footerData.en);
    }
  }, [locale]);

  return (
    <footer className=' inset-x-0 bottom-0 bg-black text-white py-6 sm:py-12'>
      <Container className='grid sm:grid-cols-5 gap-x-5'>
        <div className='sm:col-span-2'>
          <div className='bg-white w-fit px-8 py-3 rounded-lg'>
            <Image src={logo} alt='logo' />
          </div>
          <div className='ml-5'>
            <p className='mt-5'>
              {
                locale === 'ru' ? footerData.description.ru :
                  (locale === 'hy' ? footerData.description.hy : footerData.description.en)
              }
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
        {footerItems.map((item) => (
          <div key={item.id} className='m-0 p-0'>
            <p className='text-2xl m-0 p-0'>{item.title}</p>
            <List className='m-0 p-0'>
              {item?.children?.map((child) => (
                <ListItem className='pl-0' key={child.id}>
                  {child?.route ? (
                    <Link
                      className='no-underline text-white hover:text-[#EDA592]'
                      href='/'>
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
