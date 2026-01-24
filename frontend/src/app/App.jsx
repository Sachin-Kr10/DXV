import "./styles/App.css";
import { Routes, Route } from "react-router";
import ScrollToTop from "../components/ScrollToTop";

import Header from "../components/Header";
import Footer from "../components/Footer";
import FooterFeatures from "../components/FooterFeatures";

import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Payment from "../pages/Payment";

import AdminLayout from "../layouts/AdminLayout";

function App() {
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
                <Route path={"product"} element={<ProductDetail />} />
                <Route path={"cart"} element={<Cart />} />
                <Route path={"login"} element={<Auth />} />
                <Route path={"checkout"} element={<Checkout />} />
                <Route path={"payment"} element={<Payment />} />
              </Routes>
              <FooterFeatures />
              <Footer />
            </>
          }
        />
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </>
  );
}

export default App;
