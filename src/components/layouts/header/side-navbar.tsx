// @flow strict

import {
  Box,
  Button,
  Divider,
  Drawer,
  FormControl,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Popover,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useGlobalContext } from "../../../context/global-context";
import { NavDataTypes, NavLinkTypes } from "../../../types";
import logo from "/public/logo.jpg";

interface StateTypes {
  children: NavLinkTypes[] | undefined;
  anchor: HTMLElement;
}

function SideNavbar({
  mobileOpen,
  handleDrawerToggle,
  drawerWidth,
  container,
  headerItems
}: any) {
  const [anchorEl, setAnchorEl] = useState<StateTypes | null>(null);
  const router = useRouter();
  const { locale } = router;
  const { pathname, query, asPath } = router;
  const { currencyValue, handleGlobalCurrencyChange } = useGlobalContext();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>, id: number) => {
    const findSelectedChildren = headerItems.find((item: NavDataTypes) => item.id === id);

    setAnchorEl({
      children: findSelectedChildren?.children,
      anchor: event.currentTarget,
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeLanguage = (event: SelectChangeEvent<string>) => {
    router.push({ pathname, query }, asPath, { locale: event.target.value })
  }

  const handleChangeCurrency = (event: SelectChangeEvent<string>) => {
    handleGlobalCurrencyChange(event.target.value);
  }

  return (
    <Box component='nav'>
      <Drawer
        container={container}
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}>
        <Box>
          <Stack
            direction='row'
            justifyContent={"space-between"}
            p={2}
            alignItems='center'
            spacing={2}>
            <Image
              className='cursor-pointer max-h-full w-24 '
              src={logo}
              alt=''
            />
            <Button onClick={handleDrawerToggle} className='text-3xl'>
              <IoCloseSharp className='text-3xl text-slate-800' />
            </Button>
          </Stack>
          <Divider />

          <nav>
            <List>
              {headerItems.map((item: NavDataTypes) => (
                <ListItem key={item.id} disablePadding>
                  <ListItemButton onClick={(e) => handleClick(e, item.id)}>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
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
          </nav>
        </Box>
        <Box className='flex flex-col gap-5 w-full'>
          <FormControl>
            <Select
              value={locale}
              onChange={handleChangeLanguage}
              size='small'
              defaultValue=''
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value='en'>English</MenuItem>
              <MenuItem value='hy'>Armenian</MenuItem>
              <MenuItem value='ru'>Russian</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <Select
              value={currencyValue || 'dollar'}
              className='p-0'
              size='small'
              onChange={handleChangeCurrency}
              defaultValue=''
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value='usd'>$ USD</MenuItem>
              <MenuItem value='ruble'>₽ RUB</MenuItem>
              <MenuItem value='amd'>֏ AMD</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Drawer>
    </Box>
  );
}

export default SideNavbar;
