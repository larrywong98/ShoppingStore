import "../css/App.css";
import Header from "./Header";
import Footer from "./Footer";
import ProductPage from "./ProductPage";
import ProductDetailPage from "./ProductDetailPage";

const App = () => {
  return (
    <div className="App">
      <Header />
      {/* <h1 style={{ height: "1000px" }}>body</h1> */}
      <ProductPage />
      {/* <ProductDetailPage /> */}
      <Footer />
    </div>
  );
};

export default App;
