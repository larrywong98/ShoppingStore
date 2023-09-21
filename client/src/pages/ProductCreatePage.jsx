import { GrLinkPrevious } from "react-icons/gr";
import { BsFileEarmarkImage } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CaretUp, CaretDown } from "@carbon/icons-react";
import { loadProducts } from "../reducer/productSlice";

import styles from "../css/ProductCreatePage.module.css";
const ProductCreatePage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("http://");
  const [selected, setSelected] = useState(0);
  const [categories, setCategories] = useState([
    "category1",
    "category2",
    "category3",
    "mobile",
    "desktop",
  ]);

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState(categories[0]);
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();

  //dispatch product slice
  const dispatch = useDispatch();
  // const products = useSelector((state) => state.productReducer.products);

  useEffect(() => {
    // dispatch(loadProducts());
    // const newCategories = products.map((product) => product.category);
    // console.log(newCategories);
    // setCategories(newCategories);
  }, []);

  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeDescription = (e) => {
    setDescription(e.target.value);
  };
  const changeCategory = (index) => {
    setCategory(categories[index]);
  };
  const changeStock = (e) => {
    setQuantity(e.target.value);
  };
  const changePrice = (e) => {
    setPrice(e.target.value);
  };

  const submit = (e) => {
    console.log(e.target);
    let formData = new FormData();
    formData.append("imgPath", previewUrl);
    formData.append("desp", name);
    formData.append("content", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("volume", quantity);
    const url = "http://127.0.0.1:4000/product/create";
    const options = {
      method: "POST",
      body: formData,
    };
    fetch(url, options);
  };

  const handleUploadedFile = async (e) => {
    // console.log(e.target.files[0]);
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    // formData.append();

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
    // setUploadedFile(e.target.files[0]);
    setLoading(true);
  };

  return (
    <div className={styles["product-create-page"]}>
      <form onSubmit={(e) => submit(e)}>
        <div className={styles["product-create-page-header"]}>
          <h1>Create Product</h1>
          <button type="button">
            <GrLinkPrevious />
          </button>
        </div>
        <div className={styles["product-create-content"]}>
          <div className={styles["product-create-name"]}>
            <p>Product Name</p>
            <input name="name" onChange={(e) => changeName(e)} />
          </div>
          <div className={styles["product-create-desp"]}>
            <p>Product Description</p>
            <textarea
              name="desp"
              onChange={(e) => changeDescription(e)}
            ></textarea>
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
                    ? styles[
                        "category-dropdown-list show-category-dropdown-list"
                      ]
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
                          changeCategory(index);
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
              <input name="price" onChange={(e) => changePrice(e)} />
            </div>
          </div>
          <div className={styles["product-create-quantity-link"]}>
            <div className={styles["product-create-quantity"]}>
              <p>In Stock Quantity</p>
              <input name="quantity" onChange={(e) => changeStock(e)} />
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
    </div>
  );
};

export default ProductCreatePage;
