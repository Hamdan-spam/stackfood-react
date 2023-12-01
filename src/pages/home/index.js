import React from 'react'
import Homes from '../../components/home/Homes'
import Meta from '../../components/Meta'
import HomeGuard from '../../components/home-guard/HomeGuard'
import CssBaseline from '@mui/material/CssBaseline'
import { ConfigApi } from '../../hooks/react-query/config/useConfig'
import { landingPageApi } from '../../components/landingpage/Api'
import { CustomHeader } from '../../api/Headers'
import { getServerSideProps } from '../index'
const HomePage = ({ configData, landingPageData, pathName }) => {
  return (
    <>
      <Meta
        title={configData?.business_name}
        ogImage={`${configData?.base_urls?.react_landing_page_images}/${landingPageData?.banner_section_full?.banner_section_img_full}`}
        pathName={pathName}
      />
      <Homes   configData={configData} />
    </>
  )
}
HomePage.getLayout = (page) => <HomeGuard>{page}</HomeGuard>

export default HomePage
export { getServerSideProps }