import styles from "./Profile.module.css";
import { Email } from "@mui/icons-material";
import { useAuthContext } from "../features/Auth/AuthContext";
import { useForm } from "react-hook-form";
import "./Forms.css";

export function Profile() {
  const { user, updateUserProfile } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (userData) => {
    updateUserProfile(userData);
  };

  return (
    <>
      <h1>Your profile</h1>
      <form className="brandForm" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">
          <Email />
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          defaultValue={user.email}
          {...register("email")}
        ></input>
        <label htmlFor="password">Password</label>
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
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
