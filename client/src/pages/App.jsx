import Header from "../components/Header";
import Footer from "../components/Footer";
import Welcome from "../components/Welcome";
import AuthForm from "../components/AuthForm";
import ProductsLayout from "../components/ProductsLayout";

import Products from "./Products";
import ProductDetail from "./ProductDetail";
import ProductModify from "./ProductModify";
import Error from "./Error";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import styles from "../css/App.module.css";

const App = () => {
  return (
    <Router>
      <div className={styles.App}>
        <Header />
        <Routes>
          <Route path="/">
            <Route index element={<Welcome />} />
            {/* <Route path="signup" element={<AuthForm value="signup" />} />
            <Route path="signin" element={<AuthForm value="signin" />} /> */}
            <Route path="products" element={<ProductsLayout />}>
              <Route index element={<Products />} />
              <Route path=":productId" element={<ProductDetail />} />
              <Route
                path="create"
                element={<ProductModify operation="create" />}
              />
              <Route
                path="edit/:productIndex"
                element={<ProductModify operation="edit" />}
              />
            </Route>
            <Route path="Error" element={<Error />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
