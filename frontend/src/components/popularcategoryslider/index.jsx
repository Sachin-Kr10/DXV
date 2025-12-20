import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function PopularCategorySlider() {
   const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }; 

  const categories = [
  "New Arrivals",
  "Watches",
  "Bags",
  "Shoes",
  "Men",
  "Women",
  "Accessories",
  "Jewellery",
  "Sunglasses",
  "Perfumes",
  "Limited",
  "Sale",
];

  return (
    <>
    <section className="bg-[#F7F7F7] pt-12 pb-6 ">
      <div className="max-w-7xl mx-auto px-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-[#0B0B0B]">
            Popular <span className="text-[#C9A24D]">Products</span>
          </h1>
          <p className="text-sm text-[#8E8E8E] mt-1">
            Do not miss the offer
          </p>
        </div>
         <div className="rightsec ">
      <Box
        sx={{
          maxWidth: { xs: 320, sm: 480 }, 
          bgcolor: "#F7F7F7",
        }}
      >
        <Tabs
          value={value}
          onChange={(e, v) => setValue(v)}
          variant="scrollable"
          scrollButtons="auto"
          textColor="inherit"
          indicatorColor="secondary"
          TabIndicatorProps={{
            sx: {
              backgroundColor: "#C9A24D",
              height: "2px",
            },
          }}
          sx={{
            minHeight: "48px",
            "& .MuiTabs-flexContainer": {
              gap: "4px",
            },
            "& .MuiTabs-scrollButtons": {
              color: "#C9A24D",
            },
          }}
        >
          {categories.map((item, i) => (
            <Tab
              key={i}
              label={item}
              disableRipple
              sx={{
                minHeight: "48px", 
                paddingX: "14px", 
                textTransform: "uppercase",
                fontSize: "12.5px",
                letterSpacing: "0.15em",
                fontWeight: 500,
                color: "#1A1A1A",
                transition: "color 0.25s ease",
                "&.Mui-selected": {
                  color: "#0B0B0B",
                  fontWeight: 600,
                },
                "&:hover": {
                  color: "#1A1A1A",
                },
              }}
            />
          ))}
        </Tabs>
      </Box>
    </div>
        </div>
    </section>
    </>
  )
}

export default PopularCategorySlider;