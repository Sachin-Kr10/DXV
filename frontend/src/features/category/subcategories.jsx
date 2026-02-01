import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useEffect, useState } from "react";
import api from "../../api/api";

function PopularCategorySlider({ tag, filters, setFilters }) {
   const [value, setValue] = useState(false);

  const [subCategories, setSubCategories] = useState([]);
  const [selectedSub, setSelectedSub] = useState(null);
  

  useEffect(() => {
 
  api.get("/nav/subcategories", {
      params: {
        mainCategory: filters.mainCategory,
        brand: filters.brand || undefined,
        prodCategory: filters.prodCategory,
      },
    })
    .then((res) => {
      setSubCategories(res.data);
    })
    .catch((err) => console.log("failed to load sub categories", err));
}, [filters.mainCategory, filters.brand, filters.prodCategory]);

  return (
    <>
      <section className="bg-[#F7F7F7] pt-12 pb-6 ">
        <div className="max-w-7xl mx-auto px-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-0">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-[#0B0B0B]">
              {tag} <span className="text-[#C9A24D]">Products</span>
            </h1>
            <p className="text-sm text-[#8E8E8E] mt-1">Do not miss the offer</p>
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
                onChange={(e, newValue) => {
                  const clicked = subCategories.find(
                    (item) => item.slug === newValue,
                  );
                  const isSame = selectedSub === newValue;

                  setSelectedSub(isSame ? null : newValue);
                  setFilters((prev) => ({
                    ...prev,
                    subCategory: isSame ? null : newValue,
                    prodCategory: isSame
                      ? prev.prodCategory
                      : clicked?.category || prev.prodCategory,
                  }));

                  setValue(isSame ? false : newValue);
                }}
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
                {subCategories.map((item, i) => (
                  <Tab
                    key={item.slug}
                    value={item.slug}
                    label={item.name.toUpperCase()}
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
  );
}

export default PopularCategorySlider;