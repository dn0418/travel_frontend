import Footer from "./footer/footer";
import Header from "./header/header";

export default function HomeLayout({ children }: React.PropsWithChildren) {
  return (
    <div className='flex min-h-screen flex-col transition-colors duration-150'>
      <Header />
      <div className='mt-16 sm:mt-24'>{children}</div>
      <Footer />
    </div>
  );
}
