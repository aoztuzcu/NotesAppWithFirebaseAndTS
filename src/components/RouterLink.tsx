import React from "react";
import { NavLink } from "react-router-dom";
import cn from "classnames";

interface RouterLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const RouterLink: React.FC<RouterLinkProps> = ({ to, children, className }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(className, { active: isActive })}
    >
      {children}
    </NavLink>
  );
};

export default RouterLink;
