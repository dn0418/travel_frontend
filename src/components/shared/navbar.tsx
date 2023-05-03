import {
  Button,
  Container,
  FormControl,
  MenuItem,
  MenuList,
  Popover,
  Select,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { NavDataTypes, NavLinkTypes } from "../../types";
import logo from "/public/Logo.png";

const navData: NavDataTypes[] = [
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

export default function Navbar({ handleDrawerToggle }: any) {
  const [anchorEl, setAnchorEl] = useState<{
    children: NavLinkTypes[] | undefined;
    anchor: HTMLElement;
  } | null>(null);

  // const [open, setOpen] = useState(false);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number,
  ) => {
    const findSelectedChildren = navData.find((item) => item.id === id);

    setAnchorEl({
      children: findSelectedChildren?.children,
      anchor: event.currentTarget,
    });
    // setOpen(!open);
  };

  const handleClose = () => {
    setAnchorEl(null);
    // setOpen(false);
  };

  return (
    <>
      <AppBar component='nav' className='py-3 sm:py-5 h-16 sm:h-24 bg-white'>
        <Container>
          <Toolbar className='grid grid-cols-3 justify-between'>
            <Box className='flex items-center'>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                edge='start'
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}>
                <HiMenu className='text-black' />
              </IconButton>
              <div className='flex items-center gap-5'>
                <Link href='/'>
                  <Image
                    className='cursor-pointer hidden sm:block flex-grow w-32 '
                    src={logo}
                    width={64}
                    height={32}
                    alt=''
                  />
                </Link>
              </div>
            </Box>

            <MenuList className='hidden sm:flex  items-center  gap-8'>
              {navData.map((item) => (
                <Button
                  key={item.id}
                  onClick={(e) => handleClick(e, item.id)}
                  className='text-black rounded-none hover:pb-[3px] px-0  transition-all 
                  duration-300  hover:bg-transparent bg-transparent min-w-fit hover:border-b-[3px] hover:text-[#EDA592] hover:border-solid border-[#EDA592]'>
                  {item.title}
                </Button>
              ))}
            </MenuList>

            <Popover
              id='basic-menu'
              anchorEl={anchorEl?.anchor}
              open={Boolean(anchorEl?.anchor)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              className='-ml-5'>
              <Box sx={{ paddingY: 2 }}>
                {anchorEl?.children?.map((item: NavLinkTypes) => (
                  <Link
                    style={{ color: "black" }}
                    key={item.id}
                    href={item.route}>
                    <MenuItem
                      sx={{
                        paddingX: 5,
                        paddingY: 1,
                        ":hover": {
                          backgroundColor: "rgba(237, 165, 146, 0.2)",
                        },
                      }}>
                      {item.title}
                    </MenuItem>
                  </Link>
                ))}
              </Box>
            </Popover>

            <Box className='hidden sm:flex items-center justify-end gap-5'>
              <FormControl>
                <Select
                  value={""}
                  // onChange={handleChange}
                  size='small'
                  defaultValue=''
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}>
                  <MenuItem value=''>Eng</MenuItem>
                  <MenuItem value={10}>Bengali</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <Select
                  value={""}
                  className='p-0'
                  size='small'
                  // onChange={handleChange}
                  defaultValue=''
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}>
                  <MenuItem value=''>$ Dollar</MenuItem>
                  <MenuItem value={10}>Bengali</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
