import styles from "./ToysListItem.module.css";
import { ToysListItem } from "./ToysListItem";
import { useEffect, useState } from "react";
import { ReadMore } from "./ReadMore";

export function ToysList() {
  const [toys, setToys] = useState([]);
  const [readMoreToy, setReadMoreToy] = useState(null);

  function handleReadMore(toy) {
    console.log(toy);
    setReadMoreToy(toy);
  }

  useEffect(() => {
    async function getToys() {
      const data = await fetch("http://localhost:3000/toys")
        .then((res) => res.json())
        .then((data) => setToys(data));
    }
    getToys();
  }, []);

  return (
    <>
      <div>
        <ul className={styles.toysList}>
          {toys.map((toy) => (
            <ToysListItem
              key={toy.id}
              toy={toy}
              onReadMore={() => handleReadMore(toy)}
            />
          ))}
        </ul>
      </div>
      {readMoreToy && <ReadMore toy={readMoreToy} />}
    </>
  );
}
