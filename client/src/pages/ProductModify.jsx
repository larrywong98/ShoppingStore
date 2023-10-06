import { GrLinkPrevious } from "react-icons/gr";
import { BsFileEarmarkImage } from "react-icons/bs";
import { CaretUp, CaretDown } from "@carbon/icons-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toggleLoading } from "../reducer/globalSlice";
import isNumeric from "../utils/isNumeric";
import createProduct from "../services/createProduct";
import editProduct from "../services/editProduct";
import uploadImageFile from "../services/uploadImageFile";
import styles from "../css/ProductModify.module.css";
import deleteProduct from "../services/deleteProduct";

// Product create and edit page
const ProductModify = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [selected, setSelected] = useState(0);
  const [categories, setCategories] = useState([
    "category1",
    "tablet",
    "laptop",
    "mobile",
    "desktop",
    "accessory",
    "other",
  ]);
  const productIndex = useParams().productIndex;
  const products = useSelector((state) => state.productReducer.products);
  const loading = useSelector((state) => state.globalReducer.loading);
  const cart = useSelector((state) => state.cartReducer.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [previewUrl, setPreviewUrl] = useState("http://");
  const [firstLoad, setFirstLoad] = useState(true);

  // Populate form data
  useEffect(() => {
    dispatch(toggleLoading({ to: true }));
    if (props.operation === "edit") {
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
  }, []);

  // Submit new form information
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
      createProduct(formData, navigate);
    } else if (props.operation === "edit") {
      formData.append("id", products[productIndex].id);
      editProduct(formData, products[productIndex].id, navigate);
    }
  };

  // upload image file
  const handleUploadedFile = async (e) => {
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    const fileName = await uploadImageFile(formData, navigate);
    setPreviewUrl("http://127.0.0.1:4000/resources/" + fileName);
  };

  // Delete product
  const deleteOnClick = (e) => {
    e.preventDefault();
    deleteProduct(products[productIndex].id, navigate);
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
                    {previewUrl === "http://"
                      ? previewUrl
                      : "..." + previewUrl.slice(22, 45) + "..."}
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
              {previewUrl === "http://" ? (
                <p>
                  <BsFileEarmarkImage
                    className={styles["product-upload-image"]}
                  />
                  <span>Image Preview!</span>
                </p>
              ) : (
                <img src={previewUrl} alt="" />
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
                <div className={styles["product-btn-wrap"]}>
                  <button className={styles["add-product"]} type="submit">
                    Update Product
                  </button>
                  <button
                    className={styles["delete-product"]}
                    onClick={(e) => deleteOnClick(e)}
                  >
                    Delete Product
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
