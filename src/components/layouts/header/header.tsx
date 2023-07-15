import { Container } from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";
import { useEffect } from "react";
import { navData } from "../../../utils/data/navbar-data";
import Navbar from "./navbar";
import SideNavbar from "./side-navbar";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

export default function Header(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [headerItems, setHeaderItems] = React.useState(navData.en);
  const { locale } = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    if (locale && locale === 'hy') {
      setHeaderItems(navData.hy);
    } else if (locale && locale === 'ru') {
      setHeaderItems(navData.ru);
    } else {
      setHeaderItems(navData.en);
    }
  }, [locale])


  return (
    <Container sx={{ display: "flex" }} className="header-layout">
      <Navbar
        headerItems={headerItems}
        handleDrawerToggle={handleDrawerToggle}
      />
      <SideNavbar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
        container={container}
        headerItems={headerItems}
      />
    </Container>
  );
}
