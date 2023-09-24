import React, { useEffect, useState } from "react";
import styles from "../css/Product.module.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
const Product = (props) => {
  const [numberInCart, setNumberInCart] = useState(2);
  const navigate = useNavigate();
  const toDetailPage = (pageId, index) => {
    let realid = pageId * 10 + index;
    navigate(realid.toString());
  };
  return (
    <div className={styles["product-item"]}>
      <img
        style={{ width: "100%", height: "100%" }}
        src={props.imgPath}
        alt=""
        onClick={() => toDetailPage(props.pageId, props.index)}
      />
      <div className={styles["product-info"]}>
        <p>{props.desp}</p>
        <span>${props.price.toFixed(2)}</span>
      </div>

      <div className={styles["product-item-btn-group"]}>
        {numberInCart > 0 ? (
          <div className={styles["add-btn-showed"]}>
            <button
              className={styles["minus-one-btn"]}
              onClick={() => {
                setNumberInCart(numberInCart - 1);
              }}
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
            <span className={styles["add-btn-showed-text"]}>
              {numberInCart}
            </span>
            <button
              className={styles["add-one-btn"]}
              onClick={() => {
                setNumberInCart(numberInCart + 1);
              }}
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
          <button
            className={styles["add-btn-init"]}
            onClick={() => {
              setNumberInCart(numberInCart + 1);
            }}
          >
            <span className={styles["add-btn-showed-text"]}>Add</span>
          </button>
        )}

        <Link to={"edit/" + props.index} className={styles["edit-btn"]}>
          Edit
        </Link>
      </div>
    </div>
  );
};

export default Product;
