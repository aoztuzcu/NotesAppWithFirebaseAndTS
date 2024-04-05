import React from "react";
import AppBar from "@/components/AppBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main>
      <AppBar />
      <section id="content">{children}</section>
    </main>
  );
};

export default Layout;
