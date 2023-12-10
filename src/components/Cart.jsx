import { useAuthContext } from "../features/Auth/AuthContext";
import { useState, useEffect } from "react";

import { Loader } from "./Loader";

export function Cart() {
  const { user, accessToken } = useAuthContext();
  const [toys, setToys] = useState([]);
  const [cart, setCart] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getToys() {
      setIsLoading(true);
      await fetch("http://localhost:3000/toys")
        .then((res) => res.json())
        .then((toysData) => {
          setToys(toysData);
        });
      await fetch(`http://localhost:3000/carts?userId=${user.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((cartData) => {
          let cart = cartData[0];
          if (cart) {
            setCart(cartData[0]);
          } else {
            //TODO!!!
          }
        });
      setIsLoading(false);
    }
    getToys();
  }, []);

  function getToyWithRightID(id) {
    for (let i = 0; i < toys.length; i++) {
      if (id === toys[i].id) {
        return toys[i];
      }
    }
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <h1>
          {cart.items?.map((cartItem) => {
            let currentToy = getToyWithRightID(cartItem.toyId);
            if (currentToy) {
              return (
                <div key={cartItem.toyId}>
                  <span>{currentToy.description}</span>
                  <p>{currentToy.name}</p>
                  <span>{currentToy.price}﹩</span>
                  <div>{cartItem.quantity}</div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </h1>
      )}
    </>
  );
}
