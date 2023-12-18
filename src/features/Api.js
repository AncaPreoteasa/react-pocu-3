import { toast } from "react-toastify";
import { useAuthContext } from "./Auth/AuthContext";

export default function Api() {
  function getToys() {
    return fetch("http://localhost:3000/toys").then((res) => res.json());
  }

  function patchCart(cart, accessToken) {
    return fetch(`http://localhost:3000/carts/${cart.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(cart),
    });
  }

  function getCart(user, accessToken) {
    return fetch(`http://localhost:3000/carts?userId=${user.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json());
  }

  function postToy(toyData) {
    return fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toyData),
    }).then((response) => response.json());
  }

  function putToy(updatedToy) {
    return fetch(`http://localhost:3000/toys/${updatedToy.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedToy),
    });
  }

  function deleteToy(toy) {
    return fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "DELETE",
    });
  }
  return {
    getToys,
    patchCart,
    getCart,
    postToy,
    putToy,
    deleteToy,
  };
}
