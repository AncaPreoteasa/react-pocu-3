import { useState, useEffect } from "react";

import { useAuthContext } from "../../features/Auth/AuthContext";
import { Loader } from "./Loader";
import Api from "../../features/Api";
import { useNavigate } from "react-router-dom";

import styles from "./Cart.module.css";

export function Cart() {
  const { user, accessToken } = useAuthContext();
  const [toys, setToys] = useState([]);
  const [cart, setCart] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function patchCart(cart) {
    await Api(navigate).patchCart(cart, accessToken);
  }

  useEffect(() => {
    async function getToys() {
      setIsLoading(true);

      const toysData = await new Api(navigate).getToys();
      setToys(toysData);
      await Api(navigate)
        .getCart(user, accessToken)
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
    await Api(navigate)
      .getCart(user, accessToken)
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
    Api(navigate)
      .getCart(user, accessToken)
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

  function calculateTotalPrice(cartItems) {
    let total = 0;
    if (cartItems && toys) {
      for (let cartItem of cartItems) {
        let toyId = cartItem.toyId;
        for (let toy of toys) {
          if (toy.id === toyId) {
            total += toy.price * cartItem.quantity;
          }
        }
      }
    }
    return total;
  }

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.cartContainer}>
          <h1>Your cart 🛒</h1>
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
                    <div className={styles.toyDetails}>
                      <div>
                        <strong>Name:</strong> {currentToy.name}
                      </div>
                      <div>
                        <strong>Description:</strong> {currentToy.description}
                      </div>
                      <div>
                        <strong>Price:</strong> {currentToy.price}﹩
                      </div>
                      <div>
                        <strong>Quantity:</strong> {cartItem.quantity}
                      </div>
                      <div className={styles.quantityButtons}></div>
                      <button
                        className={styles.quantityButton}
                        onClick={() => handleAddMore(currentToy.id)}
                      >
                        +
                      </button>
                      <button
                        className={styles.quantityButton}
                        onClick={() => handleRemoveOne(currentToy.id)}
                      >
                        -
                      </button>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}

            <div className={styles.totalPrice}>
              Total Price: {calculateTotalPrice(cart.items)}﹩
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
