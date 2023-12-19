import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { number, object, string } from "yup";

import DeleteDialog from "../../features/DeleteDialog";
import styles from "./EditableToy.module.css";

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
  weight: number().optional(),
});

export function EditableToy({
  toy,
  onDeleteToy,
  onSubmitEditedToy,
  setSubmitDialogOpen = { setSubmitDialogOpen },
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function makeToyEditable() {
    setIsEditing(true);
  }

  function handleCancelEdit() {
    setIsEditing(false);
  }

  const onSubmit = (data) => {
    data.id = toy.id;
    onSubmitEditedToy(data);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    onDeleteToy();
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  return isEditing ? (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.editableToysContainer}
      >
        <div className={styles.editableToy}>
          <label>Name </label>
          <input
            type="text"
            name="name"
            defaultValue={toy.name}
            {...register("name")}
          />
          {errors.name && (
            <p className={styles.fieldError}>{errors.name.message}</p>
          )}
        </div>
        <div className={styles.editableToy}>
          <label>Price </label>
          <input
            type="number"
            name="price"
            defaultValue={toy.price}
            {...register("price")}
          />
          {errors.price && (
            <p className={styles.fieldError}>{errors.price.message}</p>
          )}
        </div>
        <div className={styles.editableToy}>
          <label>Amount </label>
          <input
            type="number"
            name="amount"
            defaultValue={toy.amount}
            {...register("amount")}
          />
          {errors.amount && (
            <p className={styles.fieldError}>{errors.amount.message}</p>
          )}
        </div>
        <div className={styles.editableToy}>
          <label>Image </label>
          <input
            type="text"
            name="img"
            defaultValue={toy.img}
            {...register("img")}
            className={styles.img}
          />
          {errors.img && (
            <p className={styles.fieldError}>{errors.img.message}</p>
          )}
        </div>
        <div className={styles.editableToy}>
          <label>Description </label>
          <input
            type="text"
            name="description"
            defaultValue={toy.description}
            {...register("description")}
          />
          {errors.description && (
            <p className={styles.fieldError}>{errors.description.message}</p>
          )}
        </div>
        <div className={styles.editableToy}>
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
        <div className={styles.editableToy}>
          <label>Weight </label>
          <input
            type="number"
            name="weight"
            {...register("weight")}
            defaultValue={toy.weight}
          />
          {errors.weight && (
            <p className={styles.error}>{errors.weight.message}</p>
          )}
        </div>
        <div className={styles.editableToy}>
          <label>Brand </label>
          <input
            type="text"
            name="brand"
            defaultValue={toy.brand}
            {...register("brand")}
          />
          {errors.brand && (
            <p className={styles.fieldError}>{errors.brand.message}</p>
          )}
        </div>
        <div>
          <label></label>
          <button className={styles.btn} type="submit">
            Submit
          </button>
          <button className={styles.cancelBtn} onClick={handleCancelEdit}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  ) : (
    <>
      <h2>Edit your toy 👇🏼</h2>
      <div className={styles.editableToy}>
        <li>
          <div>{toy.name}</div>
          <div>{toy.description}</div>
          <div>{toy.price}﹩</div>
          <img src={toy.img} className={styles.img}></img>
        </li>
        <button className={styles.deleteBtn} onClick={handleDeleteClick}>
          Delete
        </button>
        <button className={styles.btn} onClick={makeToyEditable}>
          Edit
        </button>
        <DeleteDialog
          open={isDeleteDialogOpen}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </>
  );
}
