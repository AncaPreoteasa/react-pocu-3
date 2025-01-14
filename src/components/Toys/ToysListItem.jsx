import React, { useEffect, useState } from "react";

import { useAuthContext } from "../../features/Auth/AuthContext";
import Api from "../../features/Api";
import { useNavigate } from "react-router-dom";
import styles from "./ToysListItem.module.css";
import clsx from "clsx";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";

export function ToysListItem({ toy, onReadMore }) {
  const { user, accessToken, logout } = useAuthContext();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [removeFromCartDialogOpen, setRemoveFromCartDialogOpen] =
    useState(false);
  const navigate = useNavigate();

  function handleAddToCart() {
    Api(navigate, logout)
      .getCart(user, accessToken)
      ?.then(async function (cartData) {
        const cart = cartData[0];
        const cartItem = cart?.items?.find(
          (cartItem) => cartItem.toyId === toy.id
        );
        if (cartItem) {
          cartItem.quantity++;
        } else {
          cart?.items?.push({
            toyId: toy.id,
            quantity: 1,
          });
        }

        await Api(navigate, logout).patchCart(cart, accessToken);
        setDialogOpen(true);
      });
  }

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCloseRemoveFromCartDialog = () => {
    setRemoveFromCartDialogOpen(false);
  };

  function handleRemoveFromCart() {
    Api(navigate, logout)
      .getCart(user, accessToken)
      ?.then((cartData) => {
        if (cartData) {
          let cart = cartData[0];
          cart.items = cart.items.filter((item) => item.toyId !== toy.id);

          Api(navigate, logout).patchCart(cart, accessToken);
          setRemoveFromCartDialogOpen(true);
        }
      });
  }

  return (
    <li className={clsx({ [styles.outOfStock]: toy.amount === 0 })}>
      <p>{toy.name}</p>
      <span>{toy.description}</span>
      <span>{toy.price}﹩</span>
      <img className={styles.imgToysList} src={toy.img}></img>
      <div className={styles.btnContainer}>
        <button onClick={onReadMore} className={styles.iconButton}>
          <MenuBookIcon className={styles.icon} />
          Read More
        </button>
      </div>
      {toy.amount !== 0 && (
        <>
          <div className={styles.btnContainer}>
            <button
              className={`${styles.iconButton} ${styles.btn}`}
              onClick={handleAddToCart}
            >
              <ShoppingCartIcon className={styles.icon} />
              Add to cart
            </button>
            <button
              className={`${styles.iconButton} ${styles.btn}`}
              onClick={handleRemoveFromCart}
            >
              <RemoveShoppingCartIcon className={styles.icon} />
              Remove from cart
            </button>
          </div>
        </>
      )}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Item Added to Cart</DialogTitle>
        <DialogContent>
          <p>{toy.name} has been added to your cart! 🫶🏼</p>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog
        open={removeFromCartDialogOpen}
        onClose={handleCloseRemoveFromCartDialog}
      >
        <DialogTitle>Toy Removed from Cart</DialogTitle>
        <DialogContent>
          <p>{toy.name} has been removed from your cart.</p>
          <Button onClick={handleCloseRemoveFromCartDialog} color="primary">
            OK
          </Button>
        </DialogContent>
      </Dialog>
    </li>
  );
}
