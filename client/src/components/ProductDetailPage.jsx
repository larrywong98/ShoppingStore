import { useEffect, useState } from "react";
import { GrLinkPrevious } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../reducer/productSlice";

const ProductDetailPage = (props) => {
  //dispatch product slice
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const products = useSelector((state) => state.productReducer.products);

  useEffect(() => {
    // dispatch(loadProducts());
    setLoading(false);
    console.log(products);
  }, []);
  return (
    <>
      {products.length === 0 ? (
        <></>
      ) : (
        <div className="product-detail-page">
          <div className="product-detail-page-header">
            <h1>Products Detail</h1>
            <button>
              <GrLinkPrevious />
            </button>
          </div>
          <div className="product-detail-content">
            <img
              src={products.filter((value) => value.id === "1")[0].imgPath}
              alt=""
            />
            <div className="product-detail">
              <h2>{products[0].category}</h2>
              <h1>{products[0].desp}</h1>
              <div className="product-detail-price-stock">
                <p>${products[0].price}</p>
                {products[0].volume === 0 ? <span>Out of Stock</span> : <></>}
              </div>
              <p className="product-detail-content-paragraph">
                {products[0].content}
              </p>
              <div className="product-detail-btn-group">
                <button className="add-cart-btn">Add To Cart</button>
                <button className="edit-product">Edit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailPage;
