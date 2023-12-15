import React, { useState } from "react";

import { useAuthContext } from "../../features/Auth/AuthContext";
import styles from "./ToysListItem.module.css";
import clsx from "clsx";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";

export function ToysListItem({ toy, onReadMore }) {
  const { user, accessToken, notificationCount } = useAuthContext();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [removeFromCartDialogOpen, setRemoveFromCartDialogOpen] =
    useState(false);

  function patchCart(cart) {
    fetch(`http://localhost:3000/carts/${cart.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(cart),
    });
  }

  function handleAddToCart() {
    fetch(`http://localhost:3000/carts?userId=${user.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((cartData) => {
        const cart = cartData[0];
        const cartItem = cart.items.find(
          (cartItem) => cartItem.toyId === toy.id
        );
        if (cartItem) {
          cartItem.quantity++;
        } else {
          cart.items.push({
            toyId: toy.id,
            quantity: 1,
          });
        }

        patchCart(cart);
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
    fetch(`http://localhost:3000/carts?userId=${user.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((cartData) => {
        let cart = cartData[0];
        cart.items = cart.items.filter((item) => item.toyId !== toy.id);

        patchCart(cart);
        setRemoveFromCartDialogOpen(true);
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
