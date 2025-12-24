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

function App() {

  return (
    <>
    <ScrollToTop/>
    <Header></Header>
    <Routes>
      <Route path={"/"} exact={true} element={<Home/>} />
      <Route path={"product"} exact={true} element={<ProductDetailPage/>} />
      <Route path={"cart"} exact={true} element={<Cart/>} />
      <Route path={"login"} exact={true} element={<Auth/>} />
    </Routes>
    <FooterFeature/>
    <Footer/>
    </>
  )
}

export default App
