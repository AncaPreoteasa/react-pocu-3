import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Nav } from "./Nav/Nav";
import { NotFound } from "../features/NotFound/NotFound";
import { Auth } from "../features/Auth/Auth";
import { AuthContextProvider } from "../features/Auth/AuthContext";
import { ToysList } from "./Toys/ToysList";
import { Cart } from "./Toys/Cart";
import { Profile } from "./Toys/Profile";
import { Admin } from "./Toys/Admin";

import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";

export function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<ToysList />} />
          <Route path="admin" element={<Admin />} />
          <Route path="cart" element={<Cart />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Auth />} />
          <Route path="register" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </AuthContextProvider>
  );
}
