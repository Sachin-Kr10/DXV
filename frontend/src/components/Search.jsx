import Button from '@mui/material/Button'
import { CiSearch } from 'react-icons/ci'

function Search() {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search luxury fashion..."
        className="w-full h-[44px] px-4 pr-12 rounded-full border border-[#E5E5E5] bg-[#FFFFFF] text-sm focus:outline-none focus:border-[#C9A24D]"
      />
      <Button
        className="!absolute right-1 top-[4px] !min-w-[36px] !text-[#1A1A1A]"
      >
        <CiSearch size={20} />
      </Button>
    </div>
  )
}

export default Search
