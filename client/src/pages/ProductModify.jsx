import { GrLinkPrevious } from "react-icons/gr";
import { BsFileEarmarkImage } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { createSelector } from "@reduxjs/toolkit";
import requestData from "../services/requestData";
import { CaretUp, CaretDown } from "@carbon/icons-react";

import styles from "../css/ProductModify.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { current } from "@reduxjs/toolkit";
import loadProducts from "../services/loadProducts";
import { toggleLoading } from "../reducer/globalSlice";
import isNumeric from "../utils/isNumeric";

const ProductModify = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState(0);
  const [categories, setCategories] = useState([
    "category1",
    "category2",
    "category3",
    "mobile",
    "desktop",
  ]);
  const productIndex = useParams().productIndex;
  const products = useSelector((state) => state.productReducer.products);
  const loading = useSelector((state) => state.globalReducer.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [previewUrl, setPreviewUrl] = useState("http://");
  const [firstLoad, setFirstLoad] = useState(true);

  // dispatch product slice
  // const dispatch = useDispatch();

  useEffect(() => {
    if (products.length === 0) {
      dispatch(loadProducts());
      return;
    }
    if (props.operation === "edit") {
      if (!isNumeric(productIndex) || productIndex >= products.length) {
        navigate("/error");
      }
      let currentProduct = products[productIndex];
      setName(currentProduct?.desp);
      setDescription(currentProduct?.content);
      setCategory(currentProduct?.category);
      setPrice(currentProduct?.price);
      setQuantity(currentProduct?.volume);
      setSelected(
        categories.findIndex(
          (category) => category === currentProduct?.category
        )
      );
      setPreviewUrl(currentProduct?.imgPath);
    }
    dispatch(toggleLoading({ to: false }));
  }, [products]);

  // const setName(e.target.value) = (e) => {
  //   setName(e.target.value);
  // };
  // const  setDescription(e.target.value) = (e) => {
  //   setDescription(e.target.value);
  // };
  // const  setCategory(categories[index]) = (index) => {
  //   setCategory(categories[index]);
  // };
  // const setQuantity(e.target.value) = (e) => {
  //   setQuantity(e.target.value);
  // };
  // const setPrice(e.target.value) = (e) => {
  //   setPrice(e.target.value);
  // };

  const submit = async (e) => {
    e.preventDefault();
    if (
      previewUrl === "http://" ||
      name === "" ||
      description === "" ||
      category === "" ||
      price === "" ||
      quantity === ""
    ) {
      setFirstLoad(false);
      return;
    }
    var formData = new FormData();
    formData.append("imgPath", previewUrl);
    formData.append("desp", name);
    formData.append("content", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("volume", quantity);

    if (props.operation === "create") {
      let response = await requestData({
        url: "http://127.0.0.1:4000/product/create",
        method: "POST",
        data: formData,
      });
      if (response.status === "ok") {
        navigate("/success", { state: { message: "Create successfully !!!" } });
      } else {
        navigate("/error");
      }
    } else if (props.operation === "edit") {
      formData.append("id", products[productIndex].id);
      let response = await requestData({
        url: "http://127.0.0.1:4000/product/edit/" + products[productIndex].id,
        method: "PUT",
        data: formData,
      });
      if (response.status === "ok") {
        navigate("/success", { state: { message: "Edit successfully !!!" } });
      } else {
        navigate("/error");
      }
    }
  };

  const handleUploadedFile = async (e) => {
    let formData = new FormData();
    formData.append("file", e.target.files[0]);

    const url = "http://127.0.0.1:4000/uploadImage";
    const options = {
      method: "POST",
      body: formData,
      // "Content-Type": "multipart/form-data",
    };
    const response = await fetch(url, options);
    const resJson = await response.json();
    const fileName = resJson.name;
    setPreviewUrl("http://127.0.0.1:4000/resources/" + fileName);
  };

  return (
    <div className={styles["product-create-page"]}>
      {props.operation === "create" ? (
        <form onSubmit={(e) => submit(e)}>
          <div className={styles["product-create-page-header"]}>
            <h1>Create Product</h1>
            <Link to="/products" className={styles["back-icon"]}>
              <GrLinkPrevious />
            </Link>
          </div>
          <div className={styles["product-create-content"]}>
            <div className={styles["product-create-name"]}>
              <p>Product Name</p>
              <input name="name" onChange={(e) => setName(e.target.value)} />
              {name === "" && firstLoad === false ? (
                <p className={styles["empty-warning"]}>Empty product name</p>
              ) : (
                <></>
              )}
            </div>
            <div className={styles["product-create-desp"]}>
              <p>Product Description</p>
              <textarea
                name="desp"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              {description === "" && firstLoad === false ? (
                <p className={styles["empty-warning"]}>
                  Empty product description
                </p>
              ) : (
                <></>
              )}
            </div>
            <div className={styles["product-create-category-price"]}>
              <div className={styles["product-create-category"]}>
                <p>Category</p>
                <button
                  type="button"
                  className={styles["category-dropdown"]}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span>{categories[selected]}</span>
                  {dropdownOpen ? (
                    <CaretUp className={styles["category-toggle-mark"]} />
                  ) : (
                    <CaretDown className={styles["category-toggle-mark"]} />
                  )}
                </button>
                <div
                  className={
                    dropdownOpen
                      ? styles["category-dropdown-list"] +
                        " " +
                        styles["show-category-dropdown-list"]
                      : styles["category-dropdown-list"]
                  }
                >
                  <ul>
                    {categories.map((value, index) => (
                      <li key={index}>
                        <button
                          type="button"
                          onClick={() => {
                            setSelected(index);
                            setCategory(categories[index]);
                            setDropdownOpen(!dropdownOpen);
                          }}
                        >
                          {value}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={styles["product-create-price"]}>
                <p>Price</p>
                <input
                  name="price"
                  onChange={(e) => setPrice(e.target.value)}
                />
                {price === "" && firstLoad === false ? (
                  <p className={styles["empty-warning"]}>Empty price</p>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className={styles["product-create-quantity-link"]}>
              <div className={styles["product-create-quantity"]}>
                <p>In Stock Quantity</p>
                <input
                  name="quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                />
                {quantity === "" && firstLoad === false ? (
                  <p className={styles["empty-warning"]}>
                    Empty stock quantity
                  </p>
                ) : (
                  <></>
                )}
              </div>
              <div className={styles["product-create-link"]}>
                <p>Add Image Link</p>
                <div className={styles["product-create-upload-link"]}>
                  <p>
                    {loading
                      ? "..." + previewUrl.slice(22, 45) + "..."
                      : previewUrl}
                  </p>
                  <span>
                    <input
                      type="file"
                      name="file"
                      className={styles["product-create-upload-mask"]}
                      onChange={(e) => handleUploadedFile(e)}
                    />
                    Upload
                  </span>
                </div>
                {previewUrl === "http://" && firstLoad === false ? (
                  <p className={styles["empty-warning"]}>Empty Image Link</p>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className={styles["product-create-image-preview"]}>
              {loading ? (
                <img src={previewUrl} alt="" />
              ) : (
                <p>
                  <BsFileEarmarkImage
                    className={styles["product-upload-image"]}
                  />
                  <span>Image Preview!</span>
                </p>
              )}
            </div>
            <div className={styles["add-product-wrap"]}>
              <button className={styles["add-product"]} type="submit">
                Add Product
              </button>
            </div>
          </div>
        </form>
      ) : (
        <>
          {loading ? (
            <></>
          ) : (
            <form onSubmit={(e) => submit(e)}>
              <div className={styles["product-create-page-header"]}>
                <h1>Edit Product</h1>
                <Link to="/products" className={styles["back-icon"]}>
                  <GrLinkPrevious />
                </Link>
              </div>
              <div className={styles["product-create-content"]}>
                <div className={styles["product-create-name"]}>
                  <p>Product Name</p>
                  <input
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {name === "" && firstLoad === false ? (
                    <p className={styles["empty-warning"]}>
                      Empty product name
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
                <div className={styles["product-create-desp"]}>
                  <p>Product Description</p>
                  <textarea
                    name="desp"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  {description === "" && firstLoad === false ? (
                    <p className={styles["empty-warning"]}>
                      Empty product description
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
                <div className={styles["product-create-category-price"]}>
                  <div className={styles["product-create-category"]}>
                    <p>Category</p>
                    <button
                      type="button"
                      className={styles["category-dropdown"]}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <span>{categories[selected]}</span>
                      {dropdownOpen ? (
                        <CaretUp className={styles["category-toggle-mark"]} />
                      ) : (
                        <CaretDown className={styles["category-toggle-mark"]} />
                      )}
                    </button>
                    <div
                      className={
                        dropdownOpen
                          ? styles["category-dropdown-list"] +
                            " " +
                            styles["show-category-dropdown-list"]
                          : styles["category-dropdown-list"]
                      }
                    >
                      <ul>
                        {categories.map((value, index) => (
                          <li key={index}>
                            <button
                              type="button"
                              onClick={() => {
                                setSelected(index);
                                setCategory(categories[index]);
                                setDropdownOpen(!dropdownOpen);
                              }}
                            >
                              {value}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className={styles["product-create-price"]}>
                    <p>Price</p>
                    <input
                      name="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    {price === "" && firstLoad === false ? (
                      <p className={styles["empty-warning"]}>Empty price</p>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className={styles["product-create-quantity-link"]}>
                  <div className={styles["product-create-quantity"]}>
                    <p>In Stock Quantity</p>
                    <input
                      name="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                    {quantity === "" && firstLoad === false ? (
                      <p className={styles["empty-warning"]}>
                        Empty stock quantity
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className={styles["product-create-link"]}>
                    <p>Add Image Link</p>
                    <div className={styles["product-create-upload-link"]}>
                      <p>{"..." + previewUrl.slice(22, 45) + "..."}</p>
                      <span>
                        <input
                          type="file"
                          name="file"
                          className={styles["product-create-upload-mask"]}
                          onChange={(e) => handleUploadedFile(e)}
                        />
                        Upload
                      </span>
                    </div>
                    {previewUrl === "http://" && firstLoad === false ? (
                      <p className={styles["empty-warning"]}>
                        Empty Image Link
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className={styles["product-create-image-preview"]}>
                  <img src={previewUrl} alt="" />
                </div>
                <div className={styles["add-product-wrap"]}>
                  <button className={styles["add-product"]} type="submit">
                    Edit Product
                  </button>
                </div>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default ProductModify;
