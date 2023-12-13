import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DeleteDialog from "../features/DeleteDialog";

import styles from "./EditableToy.module.css";

export function EditableToy({ toy, onDeleteToy, onSubmitEditedToy }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    // Open the delete confirmation dialog
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
        </div>
        <div className={styles.editableToy}>
          <label>Price </label>
          <input
            type="number"
            name="price"
            defaultValue={toy.price}
            {...register("price")}
          />
        </div>
        <div className={styles.editableToy}>
          <label>Amount </label>
          <input
            type="number"
            name="amount"
            defaultValue={toy.amount}
            {...register("amount")}
          />
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
        </div>
        <div className={styles.editableToy}>
          <label>Description </label>
          <input
            type="text"
            name="description"
            defaultValue={toy.description}
            {...register("description")}
          />
        </div>
        <div className={styles.editableToy}>
          <label>Category </label>
          <input
            type="text"
            name="category"
            defaultValue={toy.category}
            {...register("category")}
          />
        </div>
        <div className={styles.editableToy}>
          <label>Weight </label>
          <input
            type="number"
            name="weight"
            defaultValue={toy.weight}
            {...register("weight")}
          />
        </div>
        <div className={styles.editableToy}>
          <label>Brand </label>
          <input
            type="text"
            name="brand"
            defaultValue={toy.brand}
            {...register("brand")}
          />
        </div>
        <div>
          <label></label>
          <button className={styles.btn} type="submit">
            Submit
          </button>
          <button className={styles.btn} onClick={handleCancelEdit}>
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
          <div>{toy.description}</div>
          <div>{toy.name}</div>
          <div>{toy.price}﹩</div>
          <img src={toy.img} className={styles.img}></img>
        </li>
        <button className={styles.btn} onClick={handleDeleteClick}>
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
