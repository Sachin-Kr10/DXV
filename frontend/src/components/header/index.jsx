import React from 'react'
import { Link } from 'react-router'
import logo from "../../assets/logo/1.jpg"
import Search from '../search'
function Header() {
  return (
    <header>
    <div className='top-strip py-2 border-t-[1px] border-gray-200 border-b-[1px]'>
        <div className='container'>
            <div className='flex items-center justify-between'>
                <div className='col1 w-[50%]'>
                  <p className='text-[14px]'>Get up to 50% off new season style</p>    
                </div>
                <div>
                  <ul className=' flex items-center gap-3'>
                    <li className='list-none'>
                      <Link to="help-center" className='text-[12px] link font-[500] transition'>Help Center</Link>
                    </li>
                    <li className='list-none'>
                      <Link to="order-tracking" className='text-[12px] link font-[500] transition'>Order-tracking</Link>
                    </li>
                    <li className='list-none'>
                      <Link to="#" className='text-[12px] link font-[500] transition'>Help Center</Link>
                    </li>
                  </ul>
                </div>
            </div>
        </div>
    </div>

    <div className='header py-3'>
      <div className='container'>
        <div className="col1 w-[25%]">
          <Link to={"/"}><img src={logo}></img></Link>
        </div>
        <div className="col2 w-[45%]">
            <Search></Search>
        </div>
        <div className="col3 w-[30%] flex items-center">
          <ul className='flex items-center gap-3'>
            <li className="list-none">
              <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
            </li>
          </ul>
        </div>
      </div>

    </div>
    </header>
  )
}

export default Header