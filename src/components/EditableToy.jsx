import { useState } from "react";
import { useForm } from "react-hook-form";

import styles from "./EditableToy.module.css";

export function EditableToy({ toy, onDeleteToy, onSubmitEditedToy }) {
  const [isEditing, setIsEditing] = useState(false);

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

  return isEditing ? (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            defaultValue={toy.name}
            {...register("name")}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            defaultValue={toy.price}
            {...register("price")}
          />
        </div>
        <div>
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            defaultValue={toy.amount}
            {...register("amount")}
          />
        </div>
        <div>
          <label>Image</label>
          <input
            type="text"
            name="img"
            defaultValue={toy.img}
            {...register("img")}
            className={styles.img}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            defaultValue={toy.description}
            {...register("description")}
          />
        </div>
        <div>
          <label>Category</label>
          <input
            type="text"
            name="category"
            defaultValue={toy.category}
            {...register("category")}
          />
        </div>
        <div>
          <label>Weight</label>
          <input
            type="number"
            name="weight"
            defaultValue={toy.weight}
            {...register("weight")}
          />
        </div>
        <div>
          <label>Brand</label>
          <input
            type="text"
            name="brand"
            defaultValue={toy.brand}
            {...register("brand")}
          />
        </div>
        <div>
          <label></label>
          <button type="submit">Submit</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      </form>
    </div>
  ) : (
    <>
      <li className={styles.editableToy}>
        <div>{toy.description}</div>
        <div>{toy.name}</div>
        <div>{toy.price}﹩</div>
        <img src={toy.img} className={styles.img}></img>
      </li>
      <button onClick={onDeleteToy}>Delete</button>
      <button onClick={makeToyEditable}>Edit</button>
    </>
  );
}
