import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { addOneProduct, removeOneProduct } from "../reducer/cartSlice";
import styles from "../css/AddToCart.module.css";

const AddToCart = (props) => {
  const cart = useSelector((state) => state.cartReducer.cart);
  const user = useSelector((state) => state.userReducer);
  const numberInCartSelector = createSelector(
    (state) => state,
    (items) => {
      if (Object.keys(items).length === 0) return 0;
      const inCart = items.filter((item) => item.id === props.id);
      if (inCart.length === 1) {
        return inCart[0].added;
      }
      return 0;
    }
  );
  const numberInCart = numberInCartSelector(cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addOne = () => {
    if (user.signedIn === false) {
      navigate("/signin");
      return;
    }
    if (numberInCart >= props.volume) return;
    dispatch(addOneProduct({ id: props.id }));
    // saveCart({ id: user.userId, cart: cart });
  };
  const removeOne = () => {
    if (user.signedIn === false) {
      navigate("/signin");
      return;
    }
    if (numberInCart < 0) return;
    dispatch(removeOneProduct({ id: props.id }));
    // saveCart({ id: user.userId, cart: cart });
  };
  return (
    <>
      {numberInCart > 0 ? (
        <div className={styles["add-btn-showed"]}>
          <button
            className={styles["minus-one-btn"]}
            onClick={() => removeOne()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              stroke="white"
              strokeWidth="1"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M2.40625 6.48047H11.5938C11.6667 6.48047 11.7031 6.51693 11.7031 6.58984V7.41016C11.7031 7.48307 11.6667 7.51953 11.5938 7.51953H2.40625C2.33333 7.51953 2.29688 7.48307 2.29688 7.41016V6.58984C2.29688 6.51693 2.33333 6.48047 2.40625 6.48047Z"
                fill="white"
              />
            </svg>
          </button>
          <span className={styles["add-btn-showed-text"]}>{numberInCart}</span>
          <button className={styles["add-one-btn"]} onClick={() => addOne()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              stroke="white"
              strokeWidth="1"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M6.58984 2.07812H7.41016C7.48307 2.07812 7.51953 2.11458 7.51953 2.1875V11.8125C7.51953 11.8854 7.48307 11.9219 7.41016 11.9219H6.58984C6.51693 11.9219 6.48047 11.8854 6.48047 11.8125V2.1875C6.48047 2.11458 6.51693 2.07812 6.58984 2.07812Z"
                fill="white"
              />
              <path
                d="M2.40625 6.48047H11.5938C11.6667 6.48047 11.7031 6.51693 11.7031 6.58984V7.41016C11.7031 7.48307 11.6667 7.51953 11.5938 7.51953H2.40625C2.33333 7.51953 2.29688 7.48307 2.29688 7.41016V6.58984C2.29688 6.51693 2.33333 6.48047 2.40625 6.48047Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      ) : (
        <button className={styles["add-btn-init"]} onClick={() => addOne()}>
          <span className={styles["add-btn-showed-text"]}>Add</span>
        </button>
      )}
    </>
  );
};

export default AddToCart;
