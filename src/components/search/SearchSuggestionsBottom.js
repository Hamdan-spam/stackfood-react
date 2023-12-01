import React, { useEffect, useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import PropTypes from 'prop-types'
import {
    Button,
    Chip,
    IconButton,
    Paper,
    Popover,
    Stack,
    Typography,
} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import {
    CustomColouredTypography,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import { CustomTypography } from '../custom-tables/Tables.style'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { ProductsApi } from '../../hooks/react-query/config/productsApi'
import { useDispatch, useSelector } from 'react-redux'
import Skeleton from '@mui/material/Skeleton'
import SearchIcon from '@mui/icons-material/Search'

import SuggestedCuisines from './SuggestedCuisines'
import { setHandleHomePage } from '../../redux/slices/global'
import { Scrollbar } from '../Scrollbar'
import SearchSuggestionsShimmer from './SearchSuggestionsShimmer'
import { useGetSuggestSearchResult } from '../../hooks/react-query/search/useGetSuggestSearchResult'
import { setSuggestedKeywords } from '../../redux/slices/storedData'
const CustomPaper = styled(Paper)(({ theme, display }) => ({
    position: 'absolute',
    top: "64px",
    maxWidth:"450px",
    width: '100%',
    padding: '1rem',
    display: display ? display : 'inherit',
    zIndex: 999,
    left: "unset",
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    [theme.breakpoints.down('md')]: {
        zIndex: 999,
        maxWidth:"350px",
        width: '100%',
        top: "54px",
    },
}))
const SearchSuggestionsBottom = (props) => {
    const {
        setOpenSearchSuggestions,
        setOnSearchDiv,
        setSelectedValue,
        routeHandler,
        handleFocus,
        inputValue,
        searchRef
    } = props
    const dispatch = useDispatch()
    const theme = useTheme()
    //const [suggestedKeywords, setSuggestedKeywords] = useState([])
    const { token } = useSelector((state) => state.userToken)
    const { suggestedKeywords } = useSelector((state) => state.storedData)
    const [list, setList] = useState([])
    const { t } = useTranslation()
    const router = useRouter()

    const handleSearchSuccess = (res) => {
        dispatch(setSuggestedKeywords(res.data))
        //setSuggestedKeywords(res.data)
    }
    const { refetch, isRefetching } = useQuery(
        [],
        () => ProductsApi.suggestedProducts(),
        {
            onSuccess: handleSearchSuccess,
            enabled: false,
        }
    )
    // SEARCH_API
    const {
        data,
        refetch: searchResultRefetch,
        isLoading,
    } = useGetSuggestSearchResult(inputValue)

    useEffect(() => {
        if (inputValue) {
            searchResultRefetch()
        }
    }, [inputValue])

    useEffect(() => {
        let getItem = JSON.parse(localStorage.getItem('searchedValues'))
            ?.reverse()
            ?.slice(0, 5)
        if (getItem && getItem.length > 0) {
            setList(getItem)
        }
        if (token && suggestedKeywords?.length === 0) {
            refetch()
        }
    }, [])
    const handleDeleteAble = (value) => {
        let getItem = JSON.parse(localStorage.getItem('searchedValues'))
        if (getItem && getItem.length > 0) {
            let newItems = getItem.filter((item) => item !== value)
            setList(newItems)
            localStorage.setItem('searchedValues', JSON.stringify(newItems))
        }
    }
    const clearAll = () => {
        setList([])
        localStorage.setItem('searchedValues', JSON.stringify([]))
    }
    const historyHandler = () => {
        return (
            <>
                {list.length > 0 && (
                    <Stack spacing={1} width="100%">
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <CustomTypography>{t('History')}</CustomTypography>
                            <Button onClick={clearAll}>
                                <CustomTypography sx={{ fontWeight: '400' }}>
                                    {t('Clear All')}
                                </CustomTypography>
                            </Button>
                        </Stack>
                        <Stack gap="10px" flexWrap="wrap" flexGrow={1}>
                            {list.map((item, index) => {
                                return (
                                    <CustomStackFullWidth
                                        justifyContent="space-between"
                                        direction="row"
                                        sx={{ paddingInlineEnd: '10px' }}
                                    >
                                        <Stack
                                            sx={{ cursor: 'pointer' }}
                                            key={index}
                                            direction="row"
                                            spacing={0.7}
                                            alignItems="center"
                                            onClick={() => routeHandler(item)}
                                        >
                                            <SearchIcon
                                                style={{
                                                    width: '16px',
                                                    height: '16px',
                                                }}
                                            />
                                            <Typography
                                                color={
                                                    theme.palette.neutral[1200]
                                                }
                                            >
                                                {item}
                                            </Typography>
                                        </Stack>
                                        <IconButton
                                            onClick={() =>
                                                handleDeleteAble(item)
                                            }
                                        >
                                            <ClearIcon
                                                style={{
                                                    width: '16px',
                                                    height: '16px',
                                                }}
                                            />
                                        </IconButton>
                                    </CustomStackFullWidth>
                                )
                            })}
                        </Stack>
                    </Stack>
                )}
            </>
        )
    }

    return (
        <>
            <CustomPaper
                ref={searchRef}
                elevation={8}
                onMouseEnter={() => handleFocus()}
                onMouseLeave={() => setOnSearchDiv(false)}
                //display={token ? 'inherit' : list.length > 0 ? 'inherit' : 'none'}
                sx={{ maxHeight: '400px' }}
            >
                <CustomStackFullWidth spacing={3}>
                    <Scrollbar style={{ maxHeight: '100%' }}>
                        {inputValue === '' ? (
                            <>
                                {token && (
                                    <>
                                        {historyHandler()}
                                        <SuggestedCuisines
                                            routeHandler={routeHandler}
                                        />
                                        {suggestedKeywords.length > 0 && (
                                            <Stack
                                                spacing={1}
                                                sx={{ paddingTop: '1rem' }}
                                            >
                                                <CustomTypography>
                                                    {t('Suggested Searches')}
                                                </CustomTypography>
                                                <Stack
                                                    // spacing={1}
                                                    flexWrap="wrap"
                                                    flexGrow={1}
                                                    alignItems="start"
                                                    justifyContent="flex-start"
                                                    gap="10px"
                                                >
                                                    {suggestedKeywords.map(
                                                        (item, index) => {
                                                            return (
                                                                <Stack
                                                                    key={index}
                                                                    direction="row"
                                                                    sx={{
                                                                        cursor: 'pointer',
                                                                    }}
                                                                    spacing={
                                                                        0.7
                                                                    }
                                                                    alignItems="center"
                                                                    onClick={() =>
                                                                        routeHandler(
                                                                            item?.name
                                                                        )
                                                                    }
                                                                >
                                                                    <SearchIcon
                                                                        style={{
                                                                            width: '16px',
                                                                            height: '16px',
                                                                        }}
                                                                    />
                                                                    <Typography
                                                                        color={
                                                                            theme
                                                                                .palette
                                                                                .neutral[1200]
                                                                        }
                                                                    >
                                                                        {
                                                                            item?.name
                                                                        }
                                                                    </Typography>
                                                                </Stack>
                                                            )
                                                        }
                                                    )}
                                                </Stack>
                                            </Stack>
                                        )}

                                        {(isRefetching || isLoading) &&
                                            token && (
                                                <SearchSuggestionsShimmer />
                                            )}
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                {data && (
                                    <Stack
                                        spacing={1}
                                        sx={{ paddingTop: '10px' }}
                                    >
                                        <CustomTypography>
                                            {t('Suggested Searches')}
                                        </CustomTypography>
                                        <Stack
                                            // spacing={1}
                                            flexWrap="wrap"
                                            flexGrow={1}
                                            alignItems="start"
                                            justifyContent="flex-start"
                                            gap="10px"
                                        >
                                            <CustomColouredTypography
                                                sx={{ fontSize: '14px' }}
                                            >
                                                {t('Foods')}
                                            </CustomColouredTypography>
                                            {data?.foods?.map((item, index) => {
                                                return (
                                                    <Stack
                                                        key={index}
                                                        direction="row"
                                                        sx={{
                                                            cursor: 'pointer',
                                                        }}
                                                        spacing={0.7}
                                                        alignItems="center"
                                                        onClick={() =>
                                                            routeHandler(
                                                                item?.name
                                                            )
                                                        }
                                                    >
                                                        <SearchIcon
                                                            style={{
                                                                width: '16px',
                                                                height: '16px',
                                                            }}
                                                        />
                                                        <Typography
                                                            color={
                                                                theme.palette
                                                                    .neutral[1200]
                                                            }
                                                        >
                                                            {item?.name}
                                                        </Typography>
                                                    </Stack>
                                                )
                                            })}
                                        </Stack>
                                        {(isRefetching || !data?.foods) && (
                                            <SearchSuggestionsShimmer />
                                        )}
                                        <Stack
                                            // spacing={1}
                                            flexWrap="wrap"
                                            flexGrow={1}
                                            alignItems="start"
                                            justifyContent="flex-start"
                                            gap="10px"
                                        >
                                            <CustomColouredTypography
                                                sx={{ fontSize: '14px' }}
                                            >
                                                {t('Restaurants')}
                                            </CustomColouredTypography>
                                            {data?.restaurants?.map(
                                                (item, index) => {
                                                    return (
                                                        <Stack
                                                            key={index}
                                                            direction="row"
                                                            sx={{
                                                                cursor: 'pointer',
                                                            }}
                                                            spacing={0.7}
                                                            alignItems="center"
                                                            onClick={() =>
                                                                routeHandler(
                                                                    item?.name
                                                                )
                                                            }
                                                        >
                                                            <SearchIcon
                                                                style={{
                                                                    width: '16px',
                                                                    height: '16px',
                                                                }}
                                                            />
                                                            <Typography
                                                                color={
                                                                    theme
                                                                        .palette
                                                                        .neutral[1200]
                                                                }
                                                            >
                                                                {item?.name}
                                                            </Typography>
                                                        </Stack>
                                                    )
                                                }
                                            )}
                                        </Stack>
                                    </Stack>
                                )}
                                {(isRefetching || !data?.restaurants) && (
                                    <SearchSuggestionsShimmer />
                                )}
                            </>
                        )}
                    </Scrollbar>
                </CustomStackFullWidth>
            </CustomPaper>
        </>
    )
}

SearchSuggestionsBottom.propTypes = {}

export default SearchSuggestionsBottom
