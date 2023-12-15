import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { useAuthContext } from "../../features/Auth/AuthContext";
import clsx from "clsx";
import styles from "./Nav.module.css";

import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";

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
  const [showNav, setShowNav] = useState(false);

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  return (
    <nav className={styles.mainMenu}>
      <div className={styles.container}>
        <span className={styles.hamburgerIcon} onClick={toggleNav}>
          ☰
        </span>
        <menu
          className={`${styles.navLinks} ${
            showNav ? styles.showNavMobile : styles.hideNavMobile
          }`}
        >
          <span className={styles.iconWrapper}>
            <BrandNavLink to="/">
              <HomeIcon /> Home
            </BrandNavLink>
          </span>
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
              <span className={styles.iconWrapper}>
                <BrandNavLink to="profile">
                  {user.firstName}! <PersonIcon />
                </BrandNavLink>
              </span>
              <BrandNavLink to="admin">Admin</BrandNavLink>
              <span className={styles.iconWrapper}>
                <BrandNavLink to="cart">
                  Cart <ShoppingCartIcon />
                </BrandNavLink>
              </span>
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
      </div>
    </nav>
  );
}
