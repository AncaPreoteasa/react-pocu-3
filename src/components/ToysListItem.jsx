import styles from "./ToysListItem.module.css";
import clsx from "clsx";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useAuthContext } from "../features/Auth/AuthContext";

export function ToysListItem({ toy, onReadMore }) {
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
    <li className={clsx({ [styles.outOfStock]: toy.amount === 0 })}>
      <span>{toy.description}</span>
      <p>{toy.name}</p>
      <span>{toy.price}﹩</span>
      <img className={styles.imgToysList} src={toy.img}></img>
      <button onClick={onReadMore}>
        Read More <MenuBookIcon />
      </button>
      {toy.amount !== 0 && (
        <>
          <button onClick={handleAddToCart}>
            Add to cart <ShoppingCartIcon />
          </button>
          <button onClick={handleRemoveFromCart}>
            Remove from cart <RemoveShoppingCartIcon />
          </button>
        </>
      )}
    </li>
  );
}
