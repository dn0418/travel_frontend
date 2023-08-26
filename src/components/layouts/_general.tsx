import React from "react";
import Footer from "./footer/footer";
import Header from "./header/header";

type GeneralLayoutProps = {
  children: React.ReactNode;
  header?: boolean;
  footer?: boolean;
};

export default function GeneralLayout({
  children,
  header = true,
  footer = true,
}: GeneralLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col transition-colors duration-150">
      {header && <Header />}
      <div className="mt-16 sm:mt-24">{children}</div>
      {footer && <Footer />}
    </div>
  );
}
