import { toast } from "react-toastify";

export default function Api(navigate, logout) {
  function getToys() {
    return fetch("http://localhost:3000/toys")
      .then((response) => {
        if (response.status === 401) {
          toast.error("You must log in first");
          logout();
          navigate("/login");
          return;
        }

        if (response.status !== 200 && response.status !== 201) {
          throw new Error();
        }

        return response.json();
      })
      .catch((e) => {
        toast.error("Failed to get toys");
        throw e;
      });
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
          toast.error("You must log in first");
          logout();
          navigate("/login");
          return;
        }

        if (response.status !== 200 && response.status !== 201) {
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
    if (!user) {
      toast.error("Please log in first");
      navigate("/login");
      return;
    }
    return fetch(`http://localhost:3000/carts?userId=${user.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          toast.error("You must log in first");
          logout();
          navigate("/login");
          return;
        }

        if (response.status !== 200 && response.status !== 201) {
          throw new Error();
        }

        return response.json();
      })
      .catch((e) => {
        toast.error("Failed to get cart");
        throw e;
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
          toast.error("You must log in first");
          logout();
          navigate("/login");
          return;
        }

        if (response.status !== 200 && response.status !== 201) {
          throw new Error();
        }

        return response.json();
      })
      .catch((e) => {
        toast.error("Failed to create toy");
        throw e;
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
          toast.error("You must log in first");
          logout();
          navigate("/login");
          return;
        }

        if (response.status !== 200 && response.status !== 201) {
          throw new Error();
        }

        return response;
      })
      .catch((e) => {
        toast.error("Failed to update toy");
        throw e;
      });
  }

  function deleteToy(toy) {
    return fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 401) {
          toast.error("You must log in first");
          logout();
          navigate("/login");
          return;
        }

        if (response.status !== 200 && response.status !== 201) {
          throw new Error();
        }

        toast.success("You have successfully deleted your toy");
        return response;
      })
      .catch((e) => {
        toast.error("Failed to delete toy");
        throw e;
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
