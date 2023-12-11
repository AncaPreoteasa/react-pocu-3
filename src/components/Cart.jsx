import { useState, useEffect } from "react";

import { useAuthContext } from "../features/Auth/AuthContext";
import { Loader } from "./Loader";

import styles from "./Cart.module.css";

export function Cart() {
  const { user, accessToken } = useAuthContext();
  const [toys, setToys] = useState([]);
  const [cart, setCart] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function patchCart(cart) {
    await fetch(`http://localhost:3000/carts/${cart.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(cart),
    });
  }

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

  async function handleAddMore(toyId) {
    await fetch(`http://localhost:3000/carts?userId=${user.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((cartData) => {
        const cart = cartData[0];
        const cartItem = cart.items.find(
          (cartItem) => cartItem.toyId === toyId
        );
        if (cartItem) {
          cartItem.quantity++;
        } else {
          cart.items.push({
            toyId,
            quantity: 1,
          });
        }

        patchCart(cart);
        setCart(cart);
      });
  }

  function handleRemoveOne(toyId) {
    fetch(`http://localhost:3000/carts?userId=${user.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((cartData) => {
        const cart = cartData[0];
        const cartItem = cart.items.find(
          (cartItem) => cartItem.toyId === toyId
        );

        if (cartItem) {
          if (cartItem.quantity > 1) {
            cartItem.quantity--;
          } else {
            cart.items = cart.items.filter((item) => item.toyId !== toyId);
          }

          patchCart(cart);
          setCart(cart);
        }
      });
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1>Your cart</h1>
          <div className={styles.allToysContainer}>
            {cart.items?.map((cartItem) => {
              let currentToy = getToyWithRightID(cartItem.toyId);
              if (currentToy) {
                return (
                  <div key={cartItem.toyId} className={styles.toyContainer}>
                    <img
                      className={styles.imgToysCart}
                      src={currentToy.img}
                    ></img>
                    <div>Description: {currentToy.description}</div>
                    <div>Name: {currentToy.name}</div>
                    <div>Price: {currentToy.price}﹩</div>
                    <div>Quantity: {cartItem.quantity}</div>
                    <button onClick={() => handleAddMore(currentToy.id)}>
                      +
                    </button>
                    <button onClick={() => handleRemoveOne(currentToy.id)}>
                      -
                    </button>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </>
      )}
    </>
  );
}
