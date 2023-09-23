import { Button, Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import Image from "next/legacy/image";
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiFillCaretRight } from 'react-icons/ai';
import { BiLogInCircle } from 'react-icons/bi';
import { BsFillCaretRightFill } from 'react-icons/bs';
import { MdDashboard, MdExpandLess, MdExpandMore } from 'react-icons/md';
import logo from '/public/Logo.png';

interface SidebarItemTypes {
  title: string;
  icon?: React.ReactElement;
  path: string;
  subItems?: SidebarItemTypes[];
}

const sidebarItems: SidebarItemTypes[] = [
  {
    title: 'Dashboard',
    icon: <MdDashboard />,
    path: '/admin/dashboard',
  },
  {
    title: 'Tours',
    icon: <BsFillCaretRightFill />,
    path: '/admin/tours',
    subItems: [
      { title: 'New Tour', path: '/admin/tours/create' },
      { title: 'Locations', path: '/admin/tours/locations' },
    ],
  },
  {
    title: 'Hotels',
    icon: <BsFillCaretRightFill />,
    path: '/admin/hotels',
    subItems: [{ title: 'Hotel Types', path: '/admin/hotels/type' }],
  },
  {
    title: 'Reviews',
    icon: <BsFillCaretRightFill />,
    path: '/admin/reviews',
  },
  {
    title: 'Transports',
    icon: <BsFillCaretRightFill />,
    path: '/admin/transports',
  },
  {
    title: 'Accessories',
    icon: <BsFillCaretRightFill />,
    path: '/admin/accessories',
    subItems: [{ title: 'Accessories Types', path: '/admin/accessories/type' }]
  },
  {
    title: 'Thing Todo',
    icon: <BsFillCaretRightFill />,
    path: '/admin/thing-todo',
  },
  {
    title: 'Thing To See',
    icon: <BsFillCaretRightFill />,
    path: '/admin/thing-to-see',
  },
  {
    title: 'Food and Drink',
    icon: <BsFillCaretRightFill />,
    path: '/admin/food-and-drink',
  },
  {
    title: 'To Do in Surrounding',
    icon: <BsFillCaretRightFill />,
    path: '/admin/surrounding',
  },
  {
    title: 'Events',
    icon: <BsFillCaretRightFill />,
    path: '/admin/events',
  },
  {
    title: 'Blogs',
    icon: <BsFillCaretRightFill />,
    path: '/admin/blogs',
    subItems: [{ title: 'Rubrics', path: '/admin/blogs/rubrics' }],
  },
  {
    title: 'Mice',
    icon: <BsFillCaretRightFill />,
    path: '/admin/mice',
  },
  {
    title: 'Brochure',
    icon: <BsFillCaretRightFill />,
    path: '/admin/brochure',
  },
  {
    title: 'Call Back',
    icon: <BsFillCaretRightFill />,
    path: '/admin/callback',
  },
  {
    title: 'Ride Plans',
    icon: <BsFillCaretRightFill />,
    path: '/admin/ride-plan',
  },
  {
    title: 'Vacancy',
    icon: <BsFillCaretRightFill />,
    path: '/admin/vacancy',
  },
];

function SidebarItem({ title, icon, path, subItems }: SidebarItemTypes) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleItemClick = () => {
    if (subItems) {
      setOpen(!open);
    }
    router.push(path);
  };

  return (
    <>
      <ListItemButton onClick={handleItemClick} selected={router.pathname === path}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
        {subItems && (
          <Button onClick={() => setOpen(!open)} variant="text">
            {open ? <MdExpandLess /> : <MdExpandMore />}
          </Button>
        )}
      </ListItemButton>
      {subItems && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subItems.map((subItem) => (
              <ListItemButton
                key={subItem.title}
                onClick={() => router.push(subItem.path)}
                selected={router.pathname === subItem.path}
                sx={{ pl: 5 }}
              >
                <ListItemIcon>
                  <AiFillCaretRight />
                </ListItemIcon>
                <ListItemText primary={subItem.title} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

function SidebarItems() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('admin');
    router.reload();
  };

  return (
    <div className="dashboard-layout">
      <Toolbar>
        <Link href="/">
          <Image className="cursor-pointer hidden sm:block flex-grow w-32"
            src={logo} alt="" />
        </Link>
      </Toolbar>
      <Divider />
      <List sx={{ width: '100%', bgcolor: 'background.paper' }} component="nav">
        {sidebarItems.map((item) => (
          <SidebarItem key={item.title} {...item} />
        ))}
      </List>
      <Divider className='mt-8' />
      <div className="my-8 mx-6 flex justify-start">
        <Button onClick={handleLogout} variant="contained" color="inherit" className='px-8 py-2'>
          Logout
          <BiLogInCircle size={20} className='ml-2' />
        </Button>
      </div>
    </div>
  );
}

export default SidebarItems;
