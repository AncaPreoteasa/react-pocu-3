import clsx from "clsx";
import styles from "./ToysList.module.css";

const toysList = [
  {
    name: "doll",
    price: 5,
    id: 1,
    amount: 10,
    img: "/doll.jpeg",
  },
  {
    name: "car",
    price: 7,
    id: 2,
    amount: 2,
    img: "/car.jpg",
  },
  {
    name: "teddy",
    price: 7,
    id: 3,
    amount: 10,
    img: "/teddy.jpg",
  },
  {
    name: "legos",
    price: 10,
    id: 4,
    amount: 12,
    img: "/legos.webp",
  },
  {
    name: "football",
    price: 2,
    id: 5,
    amount: 20,
    img: "/football.webp",
  },
];

export function ToysList() {
  return (
    <div>
      <ul className={styles.toysList}>
        {toysList.map((toy) => {
          return (
            <li key={toy.id}>
              <p>{toy.name}</p>
              <span>{toy.price}﹩</span>
              <img className={styles.imgToysList} src={toy.img}></img>
              <button>Read More</button>
              <button>Add to card</button>
              <button>Remove from card</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
