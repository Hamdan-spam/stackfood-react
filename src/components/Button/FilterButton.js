import React from 'react'
import { Box, Stack } from "@mui/system";
import TuneIcon from '@mui/icons-material/Tune';
import { Button, Typography } from '@mui/material'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { t } from 'i18next'

const FilterButton = ({ handleClick ,activeFilters}) => {
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <Button
            variant="outlined"
            sx={{
                padding: {xs:'1px 8px',sm:'4px 8px',md:'5px 8px'},
                borderRadius: '15px' ,
                color:theme=>theme.palette.neutral[300],
                borderColor: theme => theme.palette.neutral[300],
            }}
            onClick={handleClick}
        >
            <Stack direction="row" alignItems="center" spacing={0.5}>
                {activeFilters?.length>0 &&
                    <Box
                    sx={{
                        backgroundColor:theme=>theme.palette.primary.main,
                        color:theme=>theme.palette.neutral[100],
                        borderRadius: '50%',
                         fontSize:"12px",
                        width: '19px',
                        height: '19px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: '5px',
                        marginRight: '5px',
                    }}>
                    {activeFilters?.length}
                   </Box>}

                <TuneIcon
                    style={{
                        width: '16px',
                        height: '16px',
                    }}
                    sx={{color:theme.palette.neutral[400]}}

                />
                {!isSmall && (
                    <Typography
                        fontSize="14px"
                        fontWeight="400"
                        color={theme.palette.neutral[400]}
                    >
                        {t('Filter')}
                    </Typography>
                )}
                <KeyboardArrowDownOutlinedIcon
                   size="medium"
                   sx={{color:theme=>theme.palette.neutral[1000]}}
                />
            </Stack>
        </Button>
    )
}

export default FilterButton
