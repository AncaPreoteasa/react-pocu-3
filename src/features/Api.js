import { toast } from "react-toastify";

export default function Api(navigate) {
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
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/login");
          return;
        }

        if (response.status !== 200) {
          throw new Error();
        }

        return response;
      })
      .catch((e) => {
        toast.error("Failed to update cart");
        throw e;
      });
  }

  function getCart(user, accessToken) {
    return fetch(`http://localhost:3000/carts?userId=${user.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/login");
          return;
        }

        if (response.status !== 200) {
          throw new Error();
        }

        return response.json();
      })
      .catch((e) => {
        toast.error("Failed to get cart");
      });
  }

  function postToy(toyData) {
    return fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toyData),
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/login");
          return;
        }

        if (response.status !== 200) {
          throw new Error();
        }

        return response.json();
      })
      .catch((e) => {
        toast.error("Failed to create toy");
      });
  }

  function putToy(updatedToy) {
    return fetch(`http://localhost:3000/toys/${updatedToy.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedToy),
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/login");
          return;
        }

        if (response.status !== 200) {
          throw new Error();
        }

        return response;
      })
      .catch((e) => {
        toast.error("Failed to update toy");
      });
  }

  function deleteToy(toy) {
    return fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/login");
          return;
        }

        if (response.status !== 200) {
          throw new Error();
        }

        return response;
      })
      .catch((e) => {
        toast.error("Failed to delete toy");
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
