import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { number, object, string } from "yup";
import { toast } from "react-toastify";

import { EditableToy } from "./EditableToy";
import styles from "./Admin.module.css";

const schema = object({
  name: string()
    .required("Please provide a name")
    .min(3, "The name needs to be at least 3 characters long"),
  price: number().required("Please provide a price"),
  img: string().required("Please provide an URL for the image"),
  description: string()
    .required("Please write a description")
    .min(5, "The description needs to be at least 5 characters long"),
  amount: number().typeError("Please enter a valid number for the amount."),
  brand: string().required("Please provide a brand"),
});

export function Admin() {
  const [toys, setToys] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

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
        setIsDialogOpen(true);
      })
      .catch((error) => {
        toast.error("Error adding toy. Please check the console for details.");
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
    setSubmitDialogOpen(true);
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

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleCloseSubmitDialog = () => {
    setSubmitDialogOpen(false);
  };

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
            {errors.name && (
              <p className="secondColumn fieldError">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label>Price</label>
            <input type="number" name="price" {...register("price")} />
            {errors.price && (
              <p className="secondColumn fieldError">{errors.price.message}</p>
            )}
          </div>
          <div>
            <label>Amount</label>
            <input type="number" name="amount" {...register("amount")} />
            {errors.amount && (
              <p className="secondColumn fieldError">{errors.amount.message}</p>
            )}
          </div>
          <div>
            <label>Image</label>
            <input type="text" name="img" {...register("img")} />
            {errors.img && (
              <p className="secondColumn fieldError">{errors.img.message}</p>
            )}
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              name="description"
              {...register("description")}
            />
            {errors.description && (
              <p className="secondColumn fieldError">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <label>Category</label>
            <select
              className={styles.categorySelect}
              name="category"
              {...register("category")}
            >
              <option value="girls">Girls</option>
              <option value="boys">Boys</option>
              <option value="unisex">Unisex</option>
              <option value="babies">Babies</option>
            </select>
          </div>
          <div>
            <label>Weight</label>
            <input
              type="text"
              name="weight"
              {...register("weight", {
                pattern: {
                  value: /^[0-9]+(\.[0-9]+)?$/,
                  message: "Please enter a valid number for the weight.",
                },
              })}
            />
            {errors.weight && (
              <p className={styles.error}>{errors.weight.message}</p>
            )}
          </div>
          <div>
            <label>Brand</label>
            <input type="text" name="brand" {...register("brand")} />
            {errors.brand && (
              <p className="secondColumn fieldError">{errors.brand.message}</p>
            )}
          </div>
          <div>
            <label></label>
            <button type="submit">Add toy</button>
          </div>
        </form>
        <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Toy Added</DialogTitle>
          <DialogContent>
            <p>Your toy has been added successfully! 🎉</p>
            <Button onClick={handleCloseDialog} color="primary">
              OK
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <ul className={styles.editableToysContainer}>
        {toys.map((toy) => (
          <EditableToy
            key={toy.id}
            toy={toy}
            onDeleteToy={() => handleDeleteToy(toy)}
            onSubmitEditedToy={(updatedToy) => handleSubmitToy(updatedToy)}
            submitDialogOpen={submitDialogOpen}
            setSubmitDialogOpen={setSubmitDialogOpen}
          />
        ))}
      </ul>
      <Dialog open={submitDialogOpen} onClose={handleCloseSubmitDialog}>
        <DialogTitle>Toy Submitted</DialogTitle>
        <DialogContent>
          <p>Your toy has been submitted 🤎</p>
          <Button onClick={handleCloseSubmitDialog} color="primary">
            OK
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
