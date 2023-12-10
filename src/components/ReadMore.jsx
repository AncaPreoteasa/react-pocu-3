import styles from "./ReadMore.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";

export function ReadMore({ toy, onClose }) {
  return (
    <>
      <div>
        <h1>{toy.description}</h1>
        <img className={styles.imgToy} src={toy.img}></img>
        <h2>Price : {toy.price}$</h2>
        <h2>Weight: {toy.weight} kg</h2>
        <h2>Brand : {toy.brand}</h2>
        <h2>{toy.amount !== 0 ? "In Stock" : "Not in Stock"}</h2>
        <h2>
          {toy.amount < 4 ? `We have ${toy.amount} left` : "Ready to order?"}
        </h2>
        <button onClick={onClose}>
          Close <CloseIcon />
        </button>
        {toy.amount !== 0 && (
          <button>
            Add to cart <ShoppingCartIcon />
          </button>
        )}
      </div>
    </>
  );
}
