import Header from "./Header";
import Footer from "./Footer";
import ProductPage from "./ProductPage";
import ProductDetailPage from "./ProductDetailPage";
import ProductCreatePage from "./ProductCreatePage";

import "../css/App.css";
import "../css/ProductCreatePage.css";
import "../css/ProductDetailPage.css";
import "../css/product.css";
import "../css/ProductPage.css";
import "../css/Footer.css";
import "../css/Header.css";

const App = () => {
  return (
    <div className="App">
      <Header />
      {/* <h1 style={{ height: "1000px" }}>body</h1> */}
      {/* <ProductPage /> */}
      {/* <ProductDetailPage /> */}
      <ProductCreatePage />
      <Footer />
    </div>
  );
};

export default App;
