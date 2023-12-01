import React, { useEffect, useRef, useState } from "react";
import FoodCampaign from "./food-campaign/FoodCampaign";
import BestReviewedFood from "./food-campaign/best-reviewed-foods/BestReviewedFood";
import NearbyPopularFood from "./new-popular-food/NearbyPopularFood";
import { Stack } from "@mui/system";
import { styled, Tab, Tabs } from "@mui/material";
import { t } from "i18next";
import { mockData } from "./mockData";
import { useTheme } from "@emotion/react";
import { foodTabData } from "./foodTabData";
import useScrollSticky from "./Search-filter-tag/useScrollSticky";
import ScrollSpy from "react-ui-scrollspy";
import { useSelector } from "react-redux";


export const CustomHomeTab = styled(Tabs)(
    ({ theme, marginBottom, marginTop }) => ({
      color:"none",
      borderBottom: `1px solid ${theme.palette.borderBottomBg}`,
      zIndex: 9,
      '& .MuiButtonBase-root': {
        paddingInlineEnd: '10px',
        paddingInlineStart: '10px',
        '& .MuiTabScrollButton-root': {

          width:20,
        },
      },
      '& .MuiTabs-flexContainer': {
        gap: '10px',
      },
      '& .MuiTabScrollButton-root': {
        width: 20,

      },
      '& .MuiTabs-indicator': {
        display: 'none',
      },


    })
)
const DifferentFoodCompontent = ({campaignIsloading,isLoading,isLoadingNearByPopularRestaurantData}) => {
  const [activeSection, setActiveSection] = useState(null);
  const parentScrollContainerRef = useRef(null);
  const theme=useTheme()
  const { foodOffsetElementRef } = useScrollSticky();
  const {restaurantIsSticky}=useSelector((state) => state.scrollPosition)
  const [filterType, setFilterType] = useState(null)
  const [shouldUpdateActiveSection, setShouldUpdateActiveSection] = useState(true);
  const updateActiveSection = () => {
    const section1 = document.getElementById(foodTabData[0]?.value);
    const section2 = document.getElementById(foodTabData[1]?.value);
    const section3 = document.getElementById(foodTabData[2]?.value);

    if (shouldUpdateActiveSection) {
      if (section3 && window.scrollY + 200 >= section3.offsetTop) {
        setActiveSection(foodTabData[2]?.value);
      } else if (section2 && window.scrollY + 300 >= section2.offsetTop) {
        setActiveSection(foodTabData[1]?.value);
      } else if (section1 && window.scrollY + 300 >= section1.offsetTop) {
        setActiveSection(foodTabData[0]?.value);
      } else {
        setActiveSection(null);
      }
    }
  };
  const handleChange = (event, newValue) => {
    setFilterType(newValue)
    setShouldUpdateActiveSection(false);

  }
  const handleScroll = () => {
    updateActiveSection();
  };

  const scrollToSection = (sectionId) => {
    const target = document.getElementById(sectionId);
    if (target) {
      const headerOffset = 150;
      const elementPosition = target.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scroll({
        top: offsetPosition,
        behavior: "smooth",
      });
      setShouldUpdateActiveSection(true);
    }
  };
  useEffect(() => {

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);

  const activeTab=activeSection||filterType
  return (
    <Stack marginTop="30px">
     <Stack  sx={{
       position:"sticky",
       top:{xs:"90px",md:"108px"},
       zIndex:9,
       background:theme=>theme.palette.neutral[1800]}}>
       <CustomHomeTab
          value={filterType}
         onChange={handleChange}
         // textColor={iconColor}
         variant="scrollable"
         allowScrollButtonsMobile
         // aria-label="scrollable prevent tabs example"
       >
         {foodTabData?.map((item) => {
           return (
             <Tab
               key={item?.id}
               value={item.value}
               sx={{
                 fontWeight:activeTab===item?.value ? "700":"400",
                 transition: "all 0.2s",
                 borderBottom:activeTab===item?.value ?"2px solid":"none",
                 borderColor:activeTab===item?.value ? theme=>theme.palette.primary.main:"none",
                 color:activeTab===item?.value ? theme=>theme.palette.primary.main:(theme) =>
                     theme.palette.customColor?.six,
                 '&.Mui-selected': {
                   color:activeTab===item?.value ? theme=>theme.palette.primary.main:(theme) =>
                       theme.palette.customColor?.six,
                 },
               }}
               label={t(item?.category_name)}
               onClick={() => scrollToSection(item?.value)}
             />
           )
         })}
       </CustomHomeTab>
     </Stack>
      <div ref={parentScrollContainerRef}>
        <ScrollSpy>
          <div id={foodTabData[0]?.value}>
            <FoodCampaign isLoading={campaignIsloading} />
          </div>
          <div id={foodTabData[1]?.value}>
            <NearbyPopularFood isLoading={isLoadingNearByPopularRestaurantData} />
          </div>
          <div id={foodTabData[2]?.value}>
            <BestReviewedFood isLoading={isLoading} />
          </div>
        </ScrollSpy>
      </div>
    </Stack>
  );
};

export default DifferentFoodCompontent;