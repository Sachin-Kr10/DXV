import './styles/App.css'
import Header from './components/header'
import Home from './pages/home/index'

import { Routes,Route } from 'react-router'
function App() {

  return (
    <>
    <Header></Header>
    <Routes>
      <Route path={"/"} exact={true} element={<Home/>} />
    </Routes>
    </>
  )
}

export default App
