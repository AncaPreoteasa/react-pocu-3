import styles from "./ToysListItem.module.css";
import { ToysListItem } from "./ToysListItem";
import { useEffect, useState } from "react";

export function ToysList() {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/toys")
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []);

  return (
    <div>
      <ul className={styles.toysList}>
        {toys.map((toy) => (
          <ToysListItem key={toy.id} toy={toy} />
        ))}
      </ul>
    </div>
  );
}
