import React from "react";
import styles from "../css/Product.module.css";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import skStyle from "../css/Skeleton.module.css";
import AddToCart from "./AddToCart";

const Product = (props) => {
  const loading = useSelector((state) => state.globalReducer.loading);
  const user = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const toDetailPage = (pageId, index) => {
    let realid = pageId * 10 + index;
    navigate(realid.toString());
  };
  return (
    <>
      {loading ? (
        <div className={styles["product-item"]}>
          <div
            style={{ width: "100%", height: "100%" }}
            className={skStyle["loading-animation"]}
          ></div>
          <div className={styles["product-info"]}>
            <p
              className={skStyle["loading-animation"]}
              style={{ width: "70%", height: "20px" }}
            ></p>
            <p
              className={skStyle["loading-animation"]}
              style={{ width: "30%", height: "20px", marginTop: "8px" }}
            ></p>
          </div>

          <div className={styles["product-item-btn-group"]}>
            <div
              className={
                styles["add-btn-init"] + " " + skStyle["loading-animation"]
              }
            ></div>
            <div
              className={
                styles["edit-btn"] + " " + skStyle["loading-animation"]
              }
            ></div>
          </div>
        </div>
      ) : (
        <div className={styles["product-item"]}>
          <img
            style={{ width: "100%", height: "100%", cursor: "pointer" }}
            src={props.imgPath}
            alt=""
            onClick={() => toDetailPage(props.pageId, props.index)}
          />
          <div className={styles["product-info"]}>
            <p>{props.desp}</p>
            <span>${props.price.toFixed(2)}</span>
          </div>

          <div className={styles["product-item-btn-group"]}>
            <div className={styles["add-to-cart-btn"]}>
              <AddToCart id={props.id} volume={props.volume} />
            </div>
            {user.admin ? (
              <Link to={"edit/" + props.index} className={styles["edit-btn"]}>
                Edit
              </Link>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
