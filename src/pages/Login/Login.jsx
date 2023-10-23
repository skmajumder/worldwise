import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../../components/PageNav/PageNav";
import Button from "../../components/Button/Button";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, isAuthenticated } = useAuth();

  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const navigate = useNavigate();
  const lastVisitedLocation =
    localStorage.getItem("lastVisitedLocation") || "/app";

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.removeItem("lastVisitedLocation");
      navigate(lastVisitedLocation);
    }
  }, [isAuthenticated, navigate, lastVisitedLocation]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
