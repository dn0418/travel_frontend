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
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { NavLinkTypes } from "../../../types";
import { navData } from "../../../utils/data/navbar-data";
import logo from "/public/Logo.png";

interface StateTypes {
  children: NavLinkTypes[] | undefined;
  anchor: HTMLElement;
  id: number;
}

export default function Navbar({ handleDrawerToggle }: any) {
  const [anchorEl, setAnchorEl] = useState<StateTypes | null>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number,
  ) => {
    const findSelected = navData.find((item) => item.id === id);

    setAnchorEl({
      children: findSelected?.children,
      anchor: event.currentTarget,
      id,
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
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
                sx={{ mr: 2, display: { lg: "none" } }}>
                <HiMenu className='text-black' />
              </IconButton>
              <div className='flex items-center gap-5'>
                <Link href='/'>
                  <Image
                    className='cursor-pointer hidden sm:block flex-grow w-32 '
                    src={logo}
                    alt=''
                  />
                </Link>
              </div>
            </Box>

            <MenuList className='hidden lg:flex  items-center  gap-8'>
              {navData.map((item) => (
                <Button
                  key={item.id}
                  onClick={(e) => handleClick(e, item.id)}
                  className={classNames(
                    " rounded-none hover:pb-[3px] px-0  transition-all  duration-300  hover:bg-transparent bg-transparent min-w-fit hover:border-b-[3px] hover:text-[#EDA592] hover:border-solid border-[#EDA592]",
                    anchorEl?.id === item.id
                      ? "border-b-[3px] text-[#EDA592] border-solid border-[#EDA592]"
                      : "text-black",
                  )}>
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
              sx={{ marginTop: 1 }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}>
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

            <Box className='hidden lg:flex items-center justify-end gap-5'>
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
