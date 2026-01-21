import './styles/App.css'
import { Routes,Route } from 'react-router'
import Header from './components/header'
import Home from './pages/home/index'
import ProductDetailPage from './components/productdetail'
import FooterFeature from './components/footerfeatures'
import Footer from './components/footer'
import ScrollToTop from './components/scrolltotop'
import Cart from './components/cart'
import Auth from './login/signup'
import Checkout from './components/checkout'
import Payment from './components/payment'
import AdminLayout from './admin/adminlayout'

function App() {

  return (
    <>
    <ScrollToTop/>

    <Routes>
    <Route path="/*" element = {
    <>  
    <Header></Header>
    <Routes>
      <Route path={"/"} element={<Home/>} />
      <Route path={"product"} element={<ProductDetailPage/>} />
      <Route path={"cart"} element={<Cart/>} />
      <Route path={"login"} element={<Auth/>} />
      <Route path={"checkout"}  element={<Checkout/>} />
      <Route path={"payment"} element={<Payment/>} />
      <Route path={"admin"} element={<Admin/>} />
    </Routes>
    <FooterFeature/>
    <Footer/>
    </>
    } />


     <Route path="/admin/*" element={<AdminLayout />} />
    </Routes>
    </>
  )
}

export default App
