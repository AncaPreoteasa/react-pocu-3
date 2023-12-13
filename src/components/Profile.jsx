import styles from "./Profile.module.css";
import { useAuthContext } from "../features/Auth/AuthContext";
import { useForm } from "react-hook-form";

export function Profile() {
  const { user, updateUserProfile } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(profileSchema) });

  const onSubmit = (userData) => {
    updateUserProfile(userData);
  };

  return (
    <div className={styles.profileContainer}>
      <h1>Your profile</h1>
      <form className={styles.brandForm} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email ✉️</label>
        <input
          type="email"
          name="email"
          id="email"
          defaultValue={user.email}
          {...register("email")}
        ></input>
        <label htmlFor="password">Password 🗝️</label>
        <input
          type="password"
          name="password"
          id="password"
          defaultValue={user.password}
          {...register("password")}
        ></input>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          defaultValue={user.firstName}
          {...register("firstName")}
        ></input>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          defaultValue={user.lastName}
          {...register("lastName")}
        ></input>
        <button type="submit">Submit changes</button>
      </form>
    </div>
  );
}
