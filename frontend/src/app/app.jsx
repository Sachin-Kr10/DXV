import "../styles/App.css";
import { Routes, Route,useNavigate } from "react-router";
import ScrollToTop from "../components/scrolltotop";

import Header from "../components/header";
import Footer from "../components/footer";
import FooterFeatures from "../components/footerfeatures";

import Home from "../pages/home";
import ProductDetail from "../pages/productdetail";
import Cart from "../pages/cart";
import Checkout from "../pages/checkout";
import Payment from "../pages/payment";
import Auth from "../features/auth/authmodel";
import Admin from "../admin/admin";
import AdminRoute from "../routes/adminroute";
import PrivateRoute from "../routes/privateroute";

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
