import React from 'react'
import { Stack } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'

const SearchSuggestionsShimmer = () => {
    return (
        <Stack spacing={1} marginTop="1rem">
            <Skeleton variant="text" width="120px" />
            <Stack
                spacing={1}
                flexWrap="wrap"
                flexGrow={1}
                alignItems="start"
                justifyContent="flex-start"
            >
                <Skeleton variant="text" width="120px" height="30px" />
                <Skeleton variant="text" width="120px" height="30px" />
                <Skeleton variant="text" width="120px" height="30px" />
            </Stack>
        </Stack>
    )
}

export default SearchSuggestionsShimmer
