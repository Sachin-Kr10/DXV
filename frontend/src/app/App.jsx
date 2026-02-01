import "../styles/App.css";
import { Routes, Route,useNavigate } from "react-router";
import ScrollToTop from "../components/ScrollToTop";

import Header from "../components/Header";
import Footer from "../components/Footer";
import FooterFeatures from "../components/FooterFeatures";

import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Payment from "../pages/Payment";
import Auth from "../features/auth/AuthModel";
import Admin from "../admin/Admin";
import AdminRoute from "../routes/AdminRoute";
import PrivateRoute from "../routes/PrivateRoute";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route
          path="/*"
          element={
            <>
              <Header />
              <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/product/:slug"} element={<ProductDetail />} />
                <Route path="/auth" element={<Auth onClose={() => navigate("/")}/>} />
                <Route path={"/cart"} element={<Cart />} />
                <Route
                  path={"/checkout"}
                  element={
                    <PrivateRoute>
                      <Checkout />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={"/payment"}
                  element={
                    <PrivateRoute>
                      <Payment />
                    </PrivateRoute>
                  }
                />
              </Routes>
              {/* <FooterFeatures /> */}
              {/* <Footer /> */}
            </>
          }
        />
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
