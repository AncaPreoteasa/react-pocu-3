const toysList = [
  {
    name: "doll",
    price: 5,
    id: 1,
    amount: 10,
    img: "/vite.svg",
  },
  {
    name: "car",
    price: 7,
    id: 2,
    amount: 2,
    img: "/vite.svg",
  },
];

export function ToysList() {
  return (
    <div>
      <ul>
        {toysList.map((toy) => {
          return (
            <li>
              <p>{toy.name}</p>
              <span>{toy.price}</span>
              <img src={toy.img}></img>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
