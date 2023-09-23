import Header from "./Header";
import Footer from "./Footer";
import styles from "../css/App.module.css";
import { Outlet } from "react-router-dom";
const Welcome = () => {
  return (
    <>
      <div className={styles.App}>hhh</div>
      <Outlet />
    </>
  );
};

export default Welcome;
