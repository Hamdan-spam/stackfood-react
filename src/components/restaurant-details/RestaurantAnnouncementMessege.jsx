import React, { useEffect, useState } from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { alpha, Box, Stack, Typography, useMediaQuery } from "@mui/material";
import CampaignIcon from "@mui/icons-material/Campaign";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";

const BgBox = styled(Box)(({ theme }) => ({
  margin: "0px !important",
  backgroundPosition: "center",
  backgroundColor: theme.palette.customColor.eleven,
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  display: "flex",
  alignItems: "center"
}));


const normalStyle = {
  textAlign: "center"
};
const RestaurantAnnouncementMessege = ({ storeAnnouncement }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  let duration = (storeAnnouncement?.length * 24) / 100;
  const translateX = isSmall ? ((storeAnnouncement?.length) * 3.5) : ((storeAnnouncement?.length) * 1.3);
  const wordCount = isSmall ? (storeAnnouncement?.length > 35) : (storeAnnouncement?.length > 150);
  // const wordCount = true;

  const animatedStyle = {
    width: "90%",
    paddingInline: "10px",
    whiteSpace: "nowrap",
    animation: `scrollRightToLeft ${duration}s linear infinite`,
    position: "absolute",
    left: "95%",
    transformOrigin: "top left",
    "@keyframes scrollRightToLeft": {
      "0%": {
        transform: "translateX(0%)"
      },
      "100%": {
        transform: `translateX(-${translateX}%)`
      }
    }
  };

  return (
    <BgBox>
      <Stack
        height="60px"
        position="relative"
        padding="0px"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        width="100%"
      >
        <Stack
          position="absolute"
          direction="row"
          spacing={{ xs: 1, md: 2 }}
          sx={wordCount ? animatedStyle : normalStyle}

        >
          {/*<CampaignIcon color="primary" style={{width: "30px", height: "30px"}}/>*/}
          <CampaignIcon size="40px" sx={{ color: theme.palette.whiteContainer.main }} />
          <Typography
            fontSize="16px"
            fontWeight="500"
            textTransform="capitalize"
            sx={{
              color: theme.palette.whiteContainer.main
            }}
          >
            {storeAnnouncement}
          </Typography>
        </Stack>
      </Stack>
    </BgBox>

  );
};

export default RestaurantAnnouncementMessege;