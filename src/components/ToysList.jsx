import { ToysListItem } from "./ToysListItem";
import { useEffect, useState } from "react";
import { ReadMore } from "./ReadMore";
import styles from "./ToysList.module.css";
import { SearchBar } from "./SearchBar";

export function ToysList() {
  const [toys, setToys] = useState([]);
  const [readMoreToy, setReadMoreToy] = useState(null);
  const [filteredToys, setFilteredToys] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  function handleReadMore(toy) {
    console.log(toy);
    setReadMoreToy(toy);
  }

  function handleCloseReadMore() {
    setReadMoreToy(null);
  }

  useEffect(() => {
    async function getToys() {
      const data = await fetch("http://localhost:3000/toys")
        .then((res) => res.json())
        .then((data) => {
          setToys(data);
          setFilteredToys(data);
        });
    }
    getToys();
  }, []);

  useEffect(() => {
    const filtered = toys.filter((toy) =>
      toy.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
    setFilteredToys(filtered);
  }, [searchQuery, toys]);

  return (
    <>
      <SearchBar setSearchQuery={setSearchQuery} />
      <div className={styles.container}>
        <div className={styles.toysListContainer}>
          <ul className={styles.toysList}>
            {filteredToys.map((toy) => (
              <ToysListItem
                key={toy.id}
                toy={toy}
                onReadMore={() => handleReadMore(toy)}
              />
            ))}
          </ul>
        </div>
        {readMoreToy && (
          <div className={styles.readMoreContainer}>
            <ReadMore toy={readMoreToy} onClose={handleCloseReadMore} />
          </div>
        )}
      </div>
    </>
  );
}
