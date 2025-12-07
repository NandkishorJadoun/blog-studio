import { Form, useActionData, Navigate, Link } from "react-router";
import styles from "../assets/css/SignupPage.module.css";

function SignUpPage() {
  const errors = useActionData();

  const user = Boolean(localStorage.getItem("token"));
  if (user) return <Navigate to={"/"} />;

  return (
    <main className={styles.main}>
      <Form className={styles.form} method="post" action="/signup">
        <p className={styles.formSection}>
          <label className={styles.label} htmlFor="first-name">
            First Name:
          </label>
          <input
            className={styles.input}
            type="text"
            name="firstName"
            id="first-name"
            required
          />
        </p>
        <p className={styles.formSection}>
          <label className={styles.label} htmlFor="last-name">
            Last Name:
          </label>
          <input
            className={styles.input}
            type="text"
            name="lastName"
            id="last-name"
            required
          />
        </p>
        <p className={styles.formSection}>
          <label className={styles.label} htmlFor="email">
            E-mail:
          </label>
          <input
            className={styles.input}
            type="email"
            name="email"
            id="email"
            required
          />
        </p>
        <p className={styles.formSection}>
          <label className={styles.label} htmlFor="password">
            Password:
          </label>
          <input
            className={styles.input}
            type="password"
            name="password"
            id="password"
            required
          />
        </p>
        <p className={styles.formSection}>
          <label className={styles.label} htmlFor="confirm-password">
            Confirm Password:
          </label>
          <input
            className={styles.input}
            type="password"
            name="confirmPassword"
            id="confirm-password"
            required
          />
        </p>
        <button className={styles.submitBtn}>Submit</button>
        {errors && (
          <ul className={styles.errList}>
            {errors.map((err) => (
              <li>{err.msg}</li>
            ))}
          </ul>
        )}
        <div class={styles.loginLink}>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </Form>
    </main>
  );
}

export default SignUpPage;
