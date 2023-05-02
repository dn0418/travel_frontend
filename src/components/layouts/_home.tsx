export default function HomeLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col transition-colors duration-150">
      {/* <Header /> */}
      <div className="min-h-screen">{children}</div>
      {/* <Footer /> */}
    </div>
  );
}
