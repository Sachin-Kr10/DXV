import './styles/App.css'
import Header from './components/header'
import Home from './pages/home/index'
import ProductDetailPage from './components/productdetail'
import FooterFeature from './components/footerfeatures'
import Footer from './components/footer'
import ScrollToTop from './components/scrolltotop'
import { Routes,Route } from 'react-router'
function App() {

  return (
    <>
    <ScrollToTop/>
    <Header></Header>
    <Routes>
      <Route path={"/"} exact={true} element={<Home/>} />
      <Route path={"product"} exact={true} element={<ProductDetailPage/>} />
    </Routes>
    <FooterFeature/>
    <Footer/>
    </>
  )
}

export default App
