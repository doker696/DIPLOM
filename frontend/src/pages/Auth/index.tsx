import { useLocation } from "react-router-dom";
import RegistrPage from "./Registration";
import LoginPage from "./Login";
import { Col, Grid, Row } from "antd";

import styles from "./styles.module.css";

const AuthPage: React.FC = () => {
  const location = useLocation();
  console.log(location.pathname.includes("login"));

  return (
    <div className={styles.root}>
      {location.pathname.includes("login") ? <LoginPage /> : <RegistrPage />}
    </div>
  );
};

export default AuthPage;
    