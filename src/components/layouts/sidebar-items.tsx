// @flow strict


import { Button } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { BsFillCaretRightFill } from 'react-icons/bs';
import { FaRegDotCircle } from 'react-icons/fa';
import { MdDashboard, MdExpandLess, MdExpandMore } from 'react-icons/md';
import { SiTemporal } from 'react-icons/si';
import logo from '/public/Logo.png';


export const dashboardLinks = [
  {
    title: 'Dashboard',
    icon: <MdDashboard />,
    path: '/admin/dashboard'
  },
  {
    title: 'Tours',
    icon: <BsFillCaretRightFill />,
    path: '/admin/tours'
  },
  {
    title: 'Hotels',
    icon: <BsFillCaretRightFill />,
    path: '/admin/hotels'
  },
  {
    title: 'Reviews',
    icon: <BsFillCaretRightFill />,
    path: '/admin/reviews'
  },
  {
    title: 'Transports',
    icon: <BsFillCaretRightFill />,
    path: '/admin/transports'
  },
]

function SidebarItems() {
  const router = useRouter();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="dashboard-layout">
      <Toolbar>
        <Link href='/'>
          <Image
            className='cursor-pointer hidden sm:block flex-grow w-32 '
            src={logo}
            alt=''
          />
        </Link>
      </Toolbar>
      <Divider />
      <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        component="nav"
      >
        <ListItemButton onClick={() =>
          router.push('/admin/dashboard')}
          selected={router.pathname === '/admin/dashboard'
          }>
          <ListItemIcon>
            <MdDashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton onClick={() =>
          router.push('/admin/tours')}
          selected={router.pathname === '/admin/tours'
          }>
          <ListItemIcon>
            <SiTemporal />
          </ListItemIcon>
          <ListItemText primary="Tours" />
          <Button onClick={handleClick} variant='text'>
            {open ? <MdExpandLess /> : <MdExpandMore />}
          </Button>
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 5 }}>
              <ListItemIcon>
                <FaRegDotCircle />
              </ListItemIcon>
              <ListItemText primary="Tour Types" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton onClick={() =>
          router.push('/admin/hotels')}
          selected={router.pathname === '/admin/hotels'
          }>
          <ListItemIcon>
            <SiTemporal />
          </ListItemIcon>
          <ListItemText primary="Hotels" />
        </ListItemButton>
        <ListItemButton onClick={() =>
          router.push('/admin/reviews')}
          selected={router.pathname === '/admin/reviews'
          }>
          <ListItemIcon>
            <SiTemporal />
          </ListItemIcon>
          <ListItemText primary="Reviews" />
        </ListItemButton>
        <ListItemButton onClick={() =>
          router.push('/admin/transports')}
          selected={router.pathname === '/admin/transports'
          }>
          <ListItemIcon>
            <SiTemporal />
          </ListItemIcon>
          <ListItemText primary="Transports" />
        </ListItemButton>
        <ListItemButton onClick={() =>
          router.push('/admin/accessories')}
          selected={router.pathname === '/admin/accessories'
          }>
          <ListItemIcon>
            <SiTemporal />
          </ListItemIcon>
          <ListItemText primary="Tour Accessories" />
        </ListItemButton>
        <ListItemButton onClick={() =>
          router.push('/admin/thing-todo')}
          selected={router.pathname === '/admin/thing-todo'
          }>
          <ListItemIcon>
            <SiTemporal />
          </ListItemIcon>
          <ListItemText primary="Thing Todo" />
        </ListItemButton>
        <ListItemButton onClick={() =>
          router.push('/admin/thing-to-see')}
          selected={router.pathname === '/admin/thing-to-see'
          }>
          <ListItemIcon>
            <SiTemporal />
          </ListItemIcon>
          <ListItemText primary="Thing To See" />
        </ListItemButton>
        <ListItemButton onClick={() =>
          router.push('/admin/food-and-drink')}
          selected={router.pathname === '/admin/food-and-drink'
          }>
          <ListItemIcon>
            <SiTemporal />
          </ListItemIcon>
          <ListItemText primary="Food and Drink" />
        </ListItemButton>
      </List>
    </div>
  );
};

export default SidebarItems;