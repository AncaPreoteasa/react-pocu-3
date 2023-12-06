import { NavLink } from "react-router-dom";
import clsx from "clsx";

import styles from "./Nav.module.css";
import { useAuthContext } from "../../features/Auth/AuthContext";

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
            <li>
              <BrandNavLink>
                <div>
                  <span>Cart</span>
                  <ShoppingCartIcon />
                  <FavoriteIcon style={{ color: "white" }} />
                </div>
              </BrandNavLink>
            </li>
            <li>
              <BrandNavLink to="profile">
                Profile <PersonIcon style={{ color: "white" }} />
              </BrandNavLink>
            </li>
          </>
        )}
        {user && (
          <li className={styles.pushRight}>
            Welcome, <BrandNavLink to="profile">{user.firstName}!</BrandNavLink>
            <a
              href="#"
              className={styles.navLink}
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
            >
              Logout
            </a>
          </li>
        )}
      </menu>
    </nav>
  );
}
