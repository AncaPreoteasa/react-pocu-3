import { useEffect, useState } from "react";

import styles from "./ToysList.module.css";

import { ToysListItem } from "./ToysListItem";
import { ReadMore } from "./ReadMore";
import { SearchBar } from "./SearchBar";
import { Loader } from "./Loader";
import Api from "../../features/Api";
import { useNavigate } from "react-router-dom";

export function ToysList() {
  const [toys, setToys] = useState([]);
  const [readMoreToy, setReadMoreToy] = useState(null);
  const [filteredToys, setFilteredToys] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleReadMore(toy) {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setReadMoreToy(toy);
  }

  function handleCloseReadMore() {
    setReadMoreToy(null);
  }

  useEffect(() => {
    async function getToys() {
      setIsLoading(true);

      const data = await new Api(navigate).getToys().then((data) => {
        setToys(data);
        setFilteredToys(data);
        setReadMoreToy(data[0]);
      });
      setIsLoading(false);
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
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.generalContainer}>
          <div className={styles.toysListContainer}>
            {filteredToys.length === 0 ? (
              <p className={styles.noToysFound}>
                No toys found 😞 Try searching for a different one 🧸
              </p>
            ) : (
              <ul className={styles.toysList}>
                {filteredToys.map((toy) => (
                  <ToysListItem
                    key={toy.id}
                    toy={toy}
                    onReadMore={() => handleReadMore(toy)}
                  />
                ))}
              </ul>
            )}
          </div>
          {readMoreToy && (
            <div className={styles.readMoreContainer}>
              <ReadMore toy={readMoreToy} onClose={handleCloseReadMore} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
