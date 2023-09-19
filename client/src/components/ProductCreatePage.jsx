import { GrLinkPrevious } from "react-icons/gr";
import { BsFileEarmarkImage } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductCreatePage = () => {
  const [uploadedFile, setUploadedFile] = useState();
  //dispatch product slice
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const submit = () => {};

  const handleUploadedFile = (e) => {
    setUploadedFile(e.target.files[0]);
    console.log(uploadedFile);
  };

  return (
    <div className="product-create-page">
      <form onSubmit={submit()}>
        <div className="product-create-page-header">
          <h1>Create Product</h1>
          <button>
            <GrLinkPrevious />
          </button>
        </div>
        <div className="product-create-content">
          <div className="product-create-name">
            <p>Product Name</p>
            <input />
          </div>
          <div className="product-create-desp">
            <p>Product Description</p>
            <input />
          </div>
          <div className="product-create-category-price">
            <div className="product-create-category">
              <p>Category</p>
              <input />
            </div>
            <div className="product-create-price">
              <p>Price</p>
              <input />
            </div>
          </div>
          <div className="product-create-quantity-link">
            <div className="product-create-quantity">
              <p>In Stock Quantity</p>
              <input />
            </div>
            <div className="product-create-link">
              <p>Add Image Link</p>
              <input />
            </div>
          </div>
          <div className="product-create-image-preview">
            <input
              type="file"
              className="product-create-image-preview-mask"
              onChange={(e) => handleUploadedFile(e)}
            />
            <p>
              <BsFileEarmarkImage className="product-upload-image" />
              <span>Image Preview!</span>
            </p>
          </div>
          <div>
            <button className="add-product" type="submit">
              Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductCreatePage;
