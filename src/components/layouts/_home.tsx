import { Toolbar } from "@mui/material";
import Header from "../shared/header";

export default function HomeLayout({ children }: React.PropsWithChildren) {
  return (
    <div className='flex min-h-screen flex-col transition-colors duration-150'>
      <Header />
      <Toolbar />
      <div className='min-h-screen mt-5'>{children}</div>
      {/* <Footer /> */}
    </div>
  );
}
