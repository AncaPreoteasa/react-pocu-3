import { NavLink } from "react-router-dom";
import clsx from "clsx";

import styles from "./Nav.module.css";
import { useAuthContext } from "../../features/Auth/AuthContext";

import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";

import { Favorite } from "../Favorite";

function BrandNavLink({ children, ...props }) {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        clsx(styles.navLink, { [styles.active]: isActive })
      }
    >
      {children}
    </NavLink>
  );
  // React.createElement(NavLink, {...props, className: ({ isActive }) => isActive && styles.active}, children);
}

export function Nav() {
  const { user, logout } = useAuthContext();
  return (
    <nav className={styles.mainMenu}>
      <menu>
        <li>
          <BrandNavLink to="/">
            <HomeIcon /> Home
          </BrandNavLink>
        </li>
        {user === null && (
          <>
            <li className={styles.pushRight}>
              <BrandNavLink to="login">Login</BrandNavLink>
            </li>
            <li>
              <BrandNavLink to="register">Register</BrandNavLink>
            </li>
          </>
        )}
        {user && (
          <nav className={styles.pushRight}>
            Welcome,{" "}
            <BrandNavLink to="profile">
              {user.firstName}! <PersonIcon />
            </BrandNavLink>
            <BrandNavLink to="admin">Admin</BrandNavLink>
            <BrandNavLink to="cart">
              <span>Cart</span>
              <ShoppingCartIcon />
            </BrandNavLink>
            <BrandNavLink to="favorite">
              <FavoriteIcon style={{ color: "white" }} />
            </BrandNavLink>
            <BrandNavLink
              to="/"
              className={styles.navLink}
              onClick={() => logout()}
            >
              Logout
            </BrandNavLink>
          </nav>
        )}
      </menu>
    </nav>
  );
}
