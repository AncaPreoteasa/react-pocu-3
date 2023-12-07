import styles from "./ReadMore.module.css";
import StarRating from "./StarRating";

export function ReadMore({ toy, onClose }) {
  return (
    <>
      <div>
        <h1>{toy.description}</h1>
        <img className={styles.imgToy} src={toy.img}></img>
        <StarRating color={"green"} />
        <h2>Price : {toy.price}$</h2>
        <h2>Weight: {toy.weight} kg</h2>
        <h2>Brand : {toy.brand}</h2>
        <h2>{toy.inStock ? "In Stock" : "Not in Stock"}</h2>
        <h2>
          {toy.amount < 4 ? `We have ${toy.amount} left` : "Ready to order?"}
        </h2>
        <button onClick={onClose}>Close</button>
        <button>Add to card</button>
      </div>
    </>
  );
}
