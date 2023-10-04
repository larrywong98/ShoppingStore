import Header from "../components/Header";
import Footer from "../components/Footer";
import AuthForm from "../components/AuthForm";
import UpdatePassword from "../components/UpdatePassword";
import Products from "./Products";
import ProductDetail from "./ProductDetail";
import ProductModify from "./ProductModify";
import ProtectedRoute from "../components/ProtectedRoute";
import Success from "./Success";
import Error from "./Error";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import styles from "../css/App.module.css";
import ResetPassword from "../components/ResetPassword";

// routes
const App = () => {
  return (
    <Router>
      <div className={styles.App}>
        <Header />
        <Routes>
          <Route path="/">
            <Route index element={<Navigate to="/products" />} />
            <Route path="home" element={<Navigate to="/products" />} />
            <Route path="signup" element={<AuthForm authType="signup" />} />
            <Route
              path="signin"
              element={
                <ProtectedRoute>
                  <AuthForm authType="signin" />
                </ProtectedRoute>
              }
            />
            <Route path="forget" element={<UpdatePassword />} />
            <Route
              path="reset/:id"
              element={
                <ProtectedRoute>
                  <ResetPassword />
                </ProtectedRoute>
              }
            />
            <Route path="products">
              <Route index element={<Products />} />
              <Route
                path="get/:productIndex"
                element={
                  <ProtectedRoute>
                    <ProductDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="create"
                element={
                  <ProtectedRoute>
                    <ProductModify operation="create" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="edit/:productIndex"
                element={
                  <ProtectedRoute>
                    <ProductModify operation="edit" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="success" element={<Success />} />
            <Route path="error" element={<Error />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
