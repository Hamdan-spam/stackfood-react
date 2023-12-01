import React, { useEffect } from 'react'
import BasicCampaign from '../../components/campaigns/BasicCampaign'
import Meta from '../../components/Meta'
import { useRouter } from 'next/router'
import MainApi from '../../api/MainApi'
import { CustomHeader } from '../../api/Headers'
import useGetBasicCampaignsDetails from '../../hooks/react-query/canpaings/useGetBasicCampaignsDetails'
import CustomContainer from '../../components/container'

const Index = ({ configData }) => {
    const router = useRouter()
    const id = router.query.id

    const { data, refetch, isLoading, isRefetching } =
        useGetBasicCampaignsDetails({ id })
    useEffect(() => {
        refetch()
    }, [id])

    return (
        <div>
            <Meta title={`${data?.title} - ${configData?.business_name}`} />
            <CustomContainer>
                <BasicCampaign
                    campaignsDetails={data}
                    configData={configData}
                    isLoading={isLoading}
                    isRefetching={isRefetching}
                />
            </CustomContainer>
        </div>
    )
}

export default Index
// export const getServerSideProps = async ({ params: { id }, resolvedUrl }) => {
//     const configRes = await fetch(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/config`,
//         {
//             method: 'GET',
//             headers: CustomHeader,
//         }
//     )
//     const config = await configRes.json()
//     return {
//         props: {
//             configData: config,
//         },
//     }
// }
