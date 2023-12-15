import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, ref, string } from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PasswordInput } from "../../components/PasswordInput/PasswordInput";
import { useAuthContext } from "./AuthContext";

import styles from "./Auth.module.css";

const commonSchema = {
  email: string()
    .email("The email address is not valid")
    .required("Please provide an email address"),
  password: string()
    .required("Please type a password")
    .min(4, "The password needs to be at least 4 characters long"),
};

const loginSchema = object(commonSchema);

const registerSchema = object({
  ...commonSchema,
  retypePassword: string()
    .required("Please type your password again.")
    .oneOf([ref("password")], "The two passwords do not match"),
  firstName: string().required("Please tell us your first name"),
  lastName: string().required("Please tell us your last name"),
});

export function Auth() {
  const { pathname, state } = useLocation();
  const navigate = useNavigate();
  let isRegister = false;
  if (pathname === "/register") {
    isRegister = true;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(isRegister ? registerSchema : loginSchema),
  });

  const { login } = useAuthContext();

  async function onSubmit(values) {
    // const dataForServer = {...values};
    // delete dataForServer.retypePassword;
    const { retypePassword, ...dataForServer } = values;

    const data = await fetch(
      `http://localhost:3000/${isRegister ? "register" : "login"}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(dataForServer),
      }
    ).then(async (res) => {
      const data = res.json();
      // if (res.status >= 400 && res.status < 500) {
      //   const message = await data;
      //   toast.error(message);
      // }
      return data;
    });

    if (isRegister) {
      console.log("data ", data.user.id);
      await fetch(`http://localhost:3000/carts`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${data.accessToken}`,
        },
        body: JSON.stringify({
          userId: data.user.id,
          items: [],
        }),
      });
    }

    if (!data.accessToken) {
      toast.error(data);
      return;
    }

    toast.success("You have logged in successfully.");
    login(data);

    const path = state?.from ?? "/";
    navigate(path);
  }

  return (
    <>
      <h1 className={styles.title}>{isRegister ? "Register" : "Login"}</h1>
      <form
        className={styles.brandForm}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          className={styles.input}
          type="email"
          id="email"
          {...register("email")}
        />
        {errors.email && (
          <p className={styles.fieldError}>{errors.email.message}</p>
        )}

        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <PasswordInput
          className={styles.input}
          name="password"
          {...register("password")}
        />
        {errors.password && (
          <p className={styles.fieldError}>{errors.password.message}</p>
        )}

        {isRegister && (
          <>
            <label className={styles.label} htmlFor="retypePassword">
              Retype Password
            </label>
            <PasswordInput
              className={styles.input}
              name="retypePassword"
              {...register("retypePassword")}
            />
            {errors.retypePassword && (
              <p className={styles.fieldError}>
                {errors.retypePassword.message}
              </p>
            )}

            <label className={styles.label} htmlFor="firstName">
              First Name
            </label>
            <input
              className={styles.input}
              type="text"
              id="firstName"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className={styles.fieldError}>{errors.firstName.message}</p>
            )}

            <label className={styles.label} htmlFor="lastName">
              Last Name
            </label>
            <input
              className={styles.input}
              type="text"
              id="lastName"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className={styles.fieldError}>{errors.lastName.message}</p>
            )}
          </>
        )}

        <button type="submit" className={styles.btn}>
          {isRegister ? "Register" : "Login"}
        </button>
      </form>
    </>
  );
}
