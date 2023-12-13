import styles from "./Profile.module.css";
import { useAuthContext } from "../features/Auth/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, ref, string } from "yup";
import { PasswordInput } from "./PasswordInput/PasswordInput";

const schema = object({
  email: string()
    .email("The email address is not valid")
    .required("Please provide an email address"),
  password: string()
    .required("Please type a password")
    .min(4, "The password needs to be at least 4 characters long"),
  retypePassword: string()
    .required("Please type your password again.")
    .oneOf([ref("password")], "The two passwords do not match"),
  firstName: string().required("Please tell us your first name"),
  lastName: string().required("Please tell us your last name"),
});

export function Profile() {
  const { user, updateUserProfile } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
          readOnly
          {...register("email")}
        ></input>
        {errors.email && (
          <p className="secondColumn fieldError">{errors.email.message}</p>
        )}

        <label htmlFor="password">Password 🗝️</label>
        <input
          type="password"
          name="password"
          id="password"
          {...register("password")}
        ></input>
        {errors.password && (
          <p className="secondColumn fieldError">{errors.password.message}</p>
        )}

        <label className={styles.label} htmlFor="retypePassword">
          Retype Password
        </label>
        <PasswordInput
          className={styles.input}
          name="retypePassword"
          {...register("retypePassword")}
        />
        {errors.retypePassword && (
          <p className="secondColumn fieldError">
            {errors.retypePassword.message}
          </p>
        )}

        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          defaultValue={user.firstName}
          {...register("firstName")}
        ></input>
        {errors.firstName && (
          <p className="secondColumn fieldError">{errors.firstName.message}</p>
        )}

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          defaultValue={user.lastName}
          {...register("lastName")}
        ></input>
        {errors.lastName && (
          <p className="secondColumn fieldError">{errors.lastName.message}</p>
        )}

        <button type="submit">Submit changes</button>
      </form>
    </div>
  );
}
