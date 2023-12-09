import styles from "./ToysListItem.module.css";
import clsx from "clsx";
import StarRating from "./StarRating";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useAuthContext } from "../features/Auth/AuthContext";

export function ToysListItem({ toy, onReadMore }) {
  const { user, accessToken } = useAuthContext();
  function handleAddToCart() {
    fetch(`http://localhost:3000/carts?userId=${user.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((cartData) => {
        let cart = cartData[0];
        if (cart.items.length === 0) {
          cart.items.push({
            toyId: toy.id,
            quantity: 1,
          });
        } else {
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
        }
        fetch(`http://localhost:3000/carts?cartId=${cart.id}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(cart),
        });
      });
  }

  return (
    <li className={clsx({ [styles.outOfStock]: !toy.inStock })}>
      <span>{toy.description}</span>
      <p>{toy.name}</p>
      <span>{toy.price}﹩</span>
      <img className={styles.imgToysList} src={toy.img}></img>
      <button onClick={onReadMore}>
        Read More <MenuBookIcon />
      </button>
      <button onClick={handleAddToCart}>
        Add to cart <ShoppingCartIcon />
      </button>
      <button>
        Remove from cart <RemoveShoppingCartIcon />
      </button>
      <div className={styles.starRating}>
        <StarRating color={"green"} size={20} />
      </div>
    </li>
  );
}
