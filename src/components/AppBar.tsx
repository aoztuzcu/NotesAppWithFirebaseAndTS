import React from "react";
import RouterLink from "@/components/RouterLink";
import { ViewName } from "@/types/enums";

const AppBar: React.FC = () => {
  return (
    <nav className="app-bar">
      <RouterLink to="/" className="nav-link">
        /
      </RouterLink>
      <RouterLink to={ViewName.Create} className="nav-link">
        Create
      </RouterLink>
    </nav>
  );
};

export default AppBar;
