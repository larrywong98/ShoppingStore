import { useEffect, useState } from "react";
import { GrLinkPrevious } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";

const ProductDetailPage = (props) => {
  //dispatch product slice
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products);

  useEffect(() => {
    console.log(products);
    console.log(products.find((value) => value === "1"));
  }, []);

  return (
    <div className="product-detail-page">
      <div className="product-detail-page-header">
        <h1>Products Detail</h1>
        <button>
          <GrLinkPrevious />
        </button>
      </div>
      <div className="product-detail-content">
        <img src={products.filter((value) => value.id === "1")} alt="" />
        <div className="product-detail">
          <h2>product.category</h2>
          <h1>product.desp</h1>
          <div className="product-detail-price-stock">
            <p>$299</p>
            product.price product.stock===0?<span>Out of Stock</span>:<></>
          </div>
          <p className="product-detail-content-paragraph"> product.content</p>
          <div className="product-detail-btn-group">
            <button className="add-cart-btn">Add To Cart</button>
            <button className="edit-product">Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
