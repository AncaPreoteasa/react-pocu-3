// import styles from "./Profile.module.css"
import styles from "./Forms.module.css";

export function Profile() {
  return (
    <>
      <h1>Profile component</h1>
      <form className="brandForm">
        <label htmlFor="email"></label>{" "}
        <input type="email" name="email" id="email">
          Email
        </input>
        <label htmlFor="password"></label>{" "}
        <input type="password" name="password" id="password">
          Password
        </input>
        <label htmlFor="firstName"></label>{" "}
        <input type="text" name="firstName" id="firstName">
          First Name
        </input>
        <label htmlFor="lastName"></label>{" "}
        <input type="text" name="lastName" id="lastName">
          Last Name
        </input>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
