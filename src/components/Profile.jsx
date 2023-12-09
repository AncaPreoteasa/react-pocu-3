// import styles from "./Profile.module.css"
import { Email } from "@mui/icons-material";
import styles from "./Forms.module.css";
import { useAuthContext } from "../features/Auth/AuthContext";

export function Profile() {
  const { user } = useAuthContext();

  return (
    <>
      <h1>Profile component</h1>
      <form className="brandForm" action="/upodaskdlakjl.php" method="post">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          // defaultValue={user.email}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          // defaultValue={user.password}
        ></input>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          // defaultValue={user.firstName}
        ></input>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          // defaultValue={user.lastName}
        ></input>
        <input type="submit"></input>
      </form>
    </>
  );
}
