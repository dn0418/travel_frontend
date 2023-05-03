// @flow strict

import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import Image from "next/image";
import { FcBusinessman } from "react-icons/fc";
import { HiOutlineBell } from "react-icons/hi";
import { IoMdCart } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import logo from "/public/Logo.png";

function SideNavbar({
  mobileOpen,
  handleDrawerToggle,
  drawerWidth,
  container,
}: any) {
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
          display: { xs: "block", sm: "none" },
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
              className='cursor-pointer w-32 '
              src={logo}
              width={128}
              height={32}
              alt=''
            />
            <Button onClick={handleDrawerToggle} className='text-3xl'>
              <IoCloseSharp className='text-3xl text-slate-800' />
            </Button>
          </Stack>
          <Divider />

          <nav>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HiOutlineBell className='text-3xl' />
                  </ListItemIcon>
                  <ListItemText primary='Notifications' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <IoMdCart />
                  </ListItemIcon>
                  <ListItemText primary='Checkout' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <FcBusinessman />
                  </ListItemIcon>
                  <ListItemText primary='Profile' />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Box>
      </Drawer>
    </Box>
  );
}

export default SideNavbar;
