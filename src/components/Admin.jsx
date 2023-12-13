import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

import { EditableToy } from "./EditableToy";
import styles from "./Admin.module.css";

export function Admin() {
  const [toys, setToys] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((entry) => {
        console.log("Entry created:", entry);
        alert("Entry created successfully!");
      })
      .catch((error) => {
        console.error("Error creating entry:", error);
        alert("Error creating entry. Please check the console for details.");
      });
  };

  async function handleSubmitToy(updatedToy) {
    await fetch(`http://localhost:3000/toys/${updatedToy.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedToy),
    });
    getToys();
  }

  async function getToys() {
    await fetch("http://localhost:3000/toys")
      .then((res) => res.json())
      .then((data) => setToys(data));
  }

  useEffect(() => {
    getToys();
  }, []);

  async function handleDeleteToy(toy) {
    await fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "DELETE",
    });
    getToys();
  }

  return (
    <div className={styles.adminContainer}>
      <h1>Add your toy 👇🏼</h1>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.formContainer}
        >
          <div>
            <label>Name</label>
            <input type="text" name="name" {...register("name")} />
          </div>
          <div>
            <label>Price</label>
            <input type="number" name="price" {...register("price")} />
          </div>
          <div>
            <label>Amount</label>
            <input type="number" name="amount" {...register("amount")} />
          </div>
          <div>
            <label>Image</label>
            <input type="text" name="img" {...register("img")} />
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              name="description"
              {...register("description")}
            />
          </div>
          <div>
            <label>Category</label>
            <input type="text" name="category" {...register("category")} />
          </div>
          <div>
            <label>Weight</label>
            <input type="number" name="weight" {...register("weight")} />
          </div>
          <div>
            <label>Brand</label>
            <input type="text" name="brand" {...register("brand")} />
          </div>
          <div>
            <label></label>
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
      <ul className={styles.editableToysContainer}>
        {toys.map((toy) => (
          <EditableToy
            key={toy.id}
            toy={toy}
            onDeleteToy={() => handleDeleteToy(toy)}
            onSubmitEditedToy={(updatedToy) => handleSubmitToy(updatedToy)}
          />
        ))}
      </ul>
    </div>
  );
}
