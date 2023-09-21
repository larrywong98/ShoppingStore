import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadProducts } from "../reducer/productSlice";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductPage from "./ProductPage";
import ProductDetailPage from "./ProductDetailPage";
import ProductCreatePage from "./ProductCreatePage";
import ErrorPage from "./ErrorPage";

import styles from "../css/App.module.css";

const App = () => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(loadProducts());
  // });
  return (
    <div className={styles.App}>
      <Header />
      <ProductPage />
      {/* <ProductDetailPage /> */}
      {/* <ProductCreatePage /> */}
      {/* <ErrorPage /> */}
      <Footer />
    </div>
  );
};

export default App;
