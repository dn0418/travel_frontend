import { Container } from "@mui/material";
import * as React from "react";
import Navbar from "./navbar";
import SideNavbar from "./side-navbar";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

export default function Header(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Container sx={{ display: "flex" }}>
      <Navbar handleDrawerToggle={handleDrawerToggle} />
      <SideNavbar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
        container={container}
      />
    </Container>
  );
}
