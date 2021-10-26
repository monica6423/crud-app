import React, { ReactElement } from "react";
import Header from "./Header";
import "./Layout.scss";

interface LayoutProps {
  children?: ReactElement[] | ReactElement;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      <div className="container">
        <h2 className="title">List of participants</h2>
        {children}
      </div>
    </div>
  );
};

export default Layout;
