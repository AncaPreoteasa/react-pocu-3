import { useAuthContext } from "../features/Auth/AuthContext";
import styles from "./ReadMore.module.css";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import CloseIcon from "@mui/icons-material/Close";

export function ReadMore({ toy, onClose }) {
  const { user, accessToken } = useAuthContext();

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
      });
  }

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
      });
  }

  return (
    <>
      <div className={styles.readMoreContainer}>
        <button className={styles.btnClose} onClick={onClose}>
          <CloseIcon />
        </button>
        <h2>{toy.description}</h2>
        <img className={styles.imgToy} src={toy.img}></img>
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
            <button className={styles.btn} onClick={handleAddToCart}>
              Add to cart <ShoppingCartIcon />
            </button>
            <button className={styles.btn} onClick={handleRemoveFromCart}>
              Remove from cart <RemoveShoppingCartIcon />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
