// @flow strict

import { Container, List, ListItem, ListItemText } from "@mui/material";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsTelegram } from "react-icons/bs";
import { FaTripadvisor, FaVk } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import {
  IoLogoFacebook,
  IoLogoInstagram
} from "react-icons/io5";
import { footerData } from "../../../utils/data/footer-data";
import logo from "/public/footer_logo.png";

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
      <Container className='grid sm:grid-cols-5 gap-x-5 lg:gap-x-8'>
        <div className='sm:col-span-2'>
          <div className='w-32 rounded-lg'>
            <Image src={logo} alt='logo' />
          </div>
          <div className='my-8'>
            <div className='flex items-center gap-6 mt-8'>
              <Link target="_blank" href='https://www.facebook.com/toexpedition'>
                <IoLogoFacebook className='text-white text-2xl' />
              </Link>
              <Link target="_blank" href='https://www.instagram.com/2expedition.com_/'>
                <IoLogoInstagram className='text-white text-2xl' />
              </Link>
              <Link target="_blank" href='https://t.me/toexpedition'>
                <BsTelegram className='text-white text-2xl' />
              </Link>
              <Link target="_blank" href='https://www.tripadvisor.com/Attraction_Review-g293932-d23954458-Reviews-2expedition_Tour_Operator-Yerevan.html'>
                <FaTripadvisor className='text-white text-2xl' />
              </Link>
              <Link target="_blank" href='https://www.youtube.com/@2expedition816'>
                <IoLogoYoutube className='text-white text-2xl' />
              </Link>
              <Link target="_blank" href='https://vk.com/public214460114'>
                <FaVk className='text-white text-2xl' />
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
                      href={child.route}>
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
