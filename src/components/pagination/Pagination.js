import React from 'react'
import { Box, Button, Pagination, Stack } from "@mui/material";
import { styled } from "@mui/system";

// const StyledPagination = styled(Pagination)`
//   display: flex;
//   justify-content: center;
//   list-style: none;
//   padding: 0;
//   margin: 0;
//
//   li {
//     margin: 0 5px;
//     padding: 10px;
//     border: 1px solid #ccc;
//     cursor: pointer;
//     background-color: #fff;
//
//     &.Mui-selected {
//       background-color: #000;
//       color: #fff;
//     }
//   }
// `;
export const StyledPagination = styled(Pagination)(({ theme }) => ({

    '& .MuiPaginationItem-root': {
        fontWeight: '700',
        color: theme.palette.neutral[400],
    },
    // Add styles for the selected page button
    '& .Mui-selected': {
        backgroundColor: `${theme.palette.primary.main} !important`,
        color: theme.palette.neutral[100],
        fontWeight: '700',
    },
}));
export default function CustomePagination({
    total_size,
    page_limit,
    offset,
    setOffset,
}) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                paddingBlockStart:"25px"
            }}
            //padding={{xs:"10px 0px 0px 0px",md:'30px 0px 20px 0px'}}
        >
                <StyledPagination
                    size="large"

                    variant="outlined"
                    count={Math.ceil(total_size / page_limit)}
                    onChange={(e, value) => {
                        setOffset(value)
                    }}
                    page={offset}
                />
        </Box>
    )
}
