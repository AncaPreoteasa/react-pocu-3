import React, { useState } from "react";

import { useAuthContext } from "../../features/Auth/AuthContext";
import styles from "./ReadMore.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import Api from "../../features/Api";

export function ReadMore({ toy, onClose }) {
  const { user, accessToken } = useAuthContext();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [removeFromCartDialogOpen, setRemoveFromCartDialogOpen] =
    useState(false);

  function handleAddToCart() {
    Api()
      .getCart(user, accessToken)
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

        Api().patchCart(cart, accessToken);
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
    Api()
      .getCart(user, accessToken)
      .then((cartData) => {
        let cart = cartData[0];
        cart.items = cart.items.filter((item) => item.toyId !== toy.id);

        Api().patchCart(cart, accessToken);
        setRemoveFromCartDialogOpen(true);
      });
  }

  return (
    <>
      <div className={styles.readMoreContainer}>
        <button
          className={`${styles.btn} ${styles.btnClose}`}
          onClick={onClose}
        >
          <CloseIcon />
        </button>
        <h2>{toy.name}</h2>
        <img className={styles.imgToy} src={toy.img}></img>
        <h3>{toy.description}</h3>
        <p>
          <strong>Price</strong> : {toy.price}$
        </p>
        <p>
          <strong>Weight</strong>: {toy.weight} kg
        </p>
        <p>
          <strong>Brand </strong> : {toy.brand}
        </p>
        <h4>{toy.amount !== 0 ? "In Stock" : "Not in Stock"}</h4>
        <h4>
          {toy.amount < 4 ? `We have ${toy.amount} left` : "Ready to order?"}
        </h4>
        {toy.amount !== 0 && (
          <div className={styles.btnContainer}>
            <button
              className={`${styles.iconButton} ${styles.btn}`}
              onClick={handleAddToCart}
            >
              <ShoppingCartIcon />
              Add to cart
            </button>
            <button
              className={`${styles.iconButton} ${styles.btn}`}
              onClick={handleRemoveFromCart}
            >
              <RemoveShoppingCartIcon />
              Remove from cart
            </button>
          </div>
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
      </div>
    </>
  );
}
