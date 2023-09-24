import { useEffect, useState } from "react";
import { GrLinkPrevious } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadProducts } from "../reducer/productSlice";

import styles from "../css/ProductDetail.module.css";
import { useParams } from "react-router";
const ProductDetail = (props) => {
  //dispatch product slice
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const products = useSelector((state) => state.productReducer.products);
  const productId = useParams().productId;
  // const params = useParams();

  useEffect(() => {
    // dispatch(loadProducts());
    setLoading(false);
  }, []);
  return (
    <>
      <div className={styles["product-detail-page"]}>
        <div className={styles["product-detail-page-header"]}>
          <h1>Products Detail</h1>
          <Link to="/products" className={styles["back-icon"]}>
            <GrLinkPrevious />
          </Link>
        </div>
        <div className={styles["product-detail-content"]}>
          <img src={products[productId].imgPath} alt="" />
          <div className={styles["product-detail"]}>
            <h2>{products[productId].category}</h2>
            <h1>{products[productId].desp}</h1>
            <div className={styles["product-detail-price-stock"]}>
              <p>${products[productId].price}</p>
              {products[productId].volume === productId ? (
                <span>Out of Stock</span>
              ) : (
                <></>
              )}
            </div>
            <p className={styles["product-detail-content-paragraph"]}>
              {products[productId].content}
            </p>
            <div className={styles["product-detail-btn-group"]}>
              <button className={styles["add-cart-btn"]}>Add To Cart</button>
              <Link
                to={"/products/edit/" + productId}
                className={styles["edit-product"]}
              >
                Edit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
