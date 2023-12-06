import styles from "./ToysListItem.module.css";
import clsx from "clsx";
import StarRating from "./StarRating";

export function ToysListItem({ toy }) {
  return (
    <li className={clsx({ [styles.outOfStock]: !toy.inStock })}>
      <span>{toy.description}</span>
      <p>{toy.name}</p>
      <span>{toy.price}﹩</span>
      <img className={styles.imgToysList} src={toy.img}></img>
      <button>Read More</button>
      <button>Add to card</button>
      <button>Remove from card</button>
      <div className={styles.starRating}>
        <StarRating color={"green"} size={20} />
      </div>
    </li>
  );
}
