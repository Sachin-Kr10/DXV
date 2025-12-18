import React from 'react'
import Button from '@mui/material/Button';
import { CiSearch } from "react-icons/ci";

function Search() {
  return (
    <div className='searchBox w-[100%] h-[50px] bg-[#8b8080] radius-[10px] relative'>
        <input type="text" placeholder='Search for Products..' className='w-100 h-[35px] bg-' />
   
      <Button  className='absolute top-[5px] '><CiSearch /></Button>
    
    </div>
  )
}

export default Search