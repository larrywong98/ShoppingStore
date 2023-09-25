import { Link, useLocation } from "react-router-dom";
import styles from "../css/Status.module.css";
import { AnimatePresence, motion } from "framer-motion";

const AnimatedCheckIcon = ({ initial = true, isVisible }) => {
  return (
    <AnimatePresence initial={initial}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        width="100px"
        height="100px"
        color="#5048e5"
        viewBox="0 0 24 24"
        strokeWidth="3"
        stroke="currentColor"
        className="CheckIcon"
      >
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          exit={{ pathLength: 0 }}
          transition={{
            type: "tween",
            duration: 0.3,
            ease: isVisible ? "easeOut" : "easeIn",
          }}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
        />
      </svg>
    </AnimatePresence>
  );
};

const Success = () => {
  const location = useLocation();
  const { message } = location.state;
  return (
    <div className={styles["status-page"]}>
      <div className={styles["status-content"]}>
        <AnimatedCheckIcon />
        <p>{message}</p>

        <Link className={styles["go-home-btn"]} to="/products">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Success;
