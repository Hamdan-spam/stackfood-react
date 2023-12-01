import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { InputAdornment, NoSsr, useTheme } from '@mui/material'
import {
    Search,
    SearchIconWrapper,
    StyledInputBase,
} from '../../custom-search/CustomSearch.style'
import { CustomStackFullWidth } from '../../../styled-components/CustomStyles.style'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search';
const CustomSearch = ({
    handleSearchResult,
    selectedValue,
    handleFocus,
    query,
    setFocused,
    setInputValue,
}) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const [value, setValue] = useState('')
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }
    useEffect(() => {
        if (query) {
            setValue(query)
        } else {
            setValue('')
        }
    }, [query])

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchResult(e.target.value)
            e.preventDefault()
            setFocused(false)
            setInputValue('')
        }
    }
    const handleChange = (value) => {
        if (value === '') {
            handleSearchResult('')
            //setFocused(false)
        }
        setInputValue(value)
        setValue(value)
        handleFocus()
    }
    const clearValue = () => {
        setValue('')
        setInputValue('')
    }

    return (
        <CustomStackFullWidth>
            <form onSubmit={handleKeyPress}>
                <Search >
                    <SearchIconWrapper languageDirection={languageDirection}>
                        <SearchIcon fontSize="medium"  />
                    </SearchIconWrapper>
                    <NoSsr>
                        <StyledInputBase
                            onFocus={handleFocus}
                            backgroundColor={theme.palette.neutral[200]}
                            placeholder={t('Search foods and restaurants....')}
                            value={value}
                            onChange={(e) => handleChange(e.target.value)}
                            inputProps={{ 'aria-label': 'search' }}
                            onKeyPress={(e) => handleKeyPress(e)}
                            languageDirection={languageDirection}
                            startAdornment={  // Add startAdornment here
                                <InputAdornment
                                  position="start"
                                  sx={{
                                      marginInlineStart: '10px',
                                      cursor: 'pointer',
                                  }}
                                  // Add your content for the startAdornment here
                                >
                                    <SearchIcon
                                      fontSize="medium"
                                    />
                                </InputAdornment>
                            }
                            endAdornment={
                                value !== '' ? (
                                    <InputAdornment
                                        position="end"
                                        onClick={() => clearValue()}
                                        sx={{
                                            marginInlineEnd: '10px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <CloseIcon
                                            fontSize="medium"
                                            sx={{
                                                borderRadius: '50%',
                                                p: '3px',
                                                backgroundColor: (theme) =>
                                                    theme.palette.neutral[300],
                                                color: (theme) =>
                                                    theme.palette.whiteContainer
                                                        .main,
                                                fontWeight: 'bold',
                                            }}
                                        />
                                    </InputAdornment>
                                ) : null
                            }
                        />


                    </NoSsr>
                </Search>
            </form>
        </CustomStackFullWidth>
    )
}

CustomSearch.propTypes = {}

export default CustomSearch
