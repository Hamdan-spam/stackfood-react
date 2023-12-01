import React from 'react';
import {ClickAwayListener, IconButton, InputAdornment, Stack, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {CloseIconWrapper, CustomBoxFullWidth} from "../../styled-components/CustomStyles.style";
import {Search, StyledInputBase} from "../custom-search/CustomSearch.style";
import {LoadingButton} from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import {t} from "i18next";

// import Box from "@mui/material/Box";
// import {Tip} from "./Tip";


const ChatContactSearch = ({searchValue,setSearchValue,handleSearch,isLoading,handleReset,searchSubmitHandler}) => {

    const onChangeHandler=(e)=>{
        e.preventDefault()
        handleSearch(e.target.value)
    }
    return (

            <Stack padding=".4rem">
               < form onSubmit={(e)=>searchSubmitHandler(e)}>
                    <Search>
                        <StyledInputBase

                            fullWidth
                            label={t("Search...")}
                            placeholder={t("Search...")}
                                startAdornment={
                                <InputAdornment position="start"  sx={{paddingInlineStart:"10px",marginInlineEnd:"-10px"}}>
                                    <SearchIcon fontSize="small"/>
                                </InputAdornment>
                            }

                            value={searchValue}
                            onChange={(e)=>onChangeHandler(e)}

                        />
                        {searchValue !== '' && (
                            <>
                                {isLoading ? (
                                    <CloseIconWrapper right={-1}>
                                        <LoadingButton
                                            loading
                                            variant="text"
                                            sx={{ width: '10px' }}
                                        />
                                    </CloseIconWrapper>
                                ) : (
                                    <CloseIconWrapper onClick={handleReset}>
                                        <IconButton>
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    </CloseIconWrapper>
                                )}
                            </>
                        )}
                    </Search>
               </form>

            </Stack>



    );
};

ChatContactSearch.propTypes = {};

export default ChatContactSearch;