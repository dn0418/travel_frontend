import { Toolbar } from "@mui/material";
import Footer from "../shared/footer";
import Header from "../shared/header";

export default function HomeLayout({ children }: React.PropsWithChildren) {
  return (
    <div className='flex min-h-screen flex-col transition-colors duration-150'>
      <Header />
      <Toolbar />
      <div className=''>{children}</div>
      <Footer />
    </div>
  );
}
