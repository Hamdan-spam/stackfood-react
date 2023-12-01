import React, { useEffect, useState } from 'react'
import { IconButton, Paper, Stack } from '@mui/material'
import CustomImageContainer from '../CustomImageContainer'
import CloseIcon from '@mui/icons-material/Close'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { useTheme } from '@mui/material/styles'
const ChatImage = ({ body, removeImage }) => {
    const theme = useTheme()
    const [files, setFiles] = useState()
    useEffect(() => {
        setFiles(body.file)
    }, [body.file])

    return (
        <Paper
            sx={{
                position: 'absolute',
                bottom: 78,
                padding: '5px',
                display: 'flex',
                flexDirection: 'row',
                gap: '20px',
                flexWrap: 'wrap',
            }}
        >
            {files?.map((item) => {
                return (
                    <Stack
                        sx={{ position: 'relative', width: 'auto' }}
                        direction="row"
                    >
                        <CustomImageContainer
                            objectFit="contain"
                            src={URL.createObjectURL(item)}
                            height="70px"
                            width="90px"
                            borderRadius=".5rem"
                            smWidth="50px"
                            smHeight="60px"
                        />
                        <IconButton
                            sx={{
                                position: 'absolute',
                                right: -0,
                                bottom: 0,
                                background: (theme) => theme.palette.error.main,
                                padding: '0px',
                                borderRadius: '0px',
                                '&:hover': {
                                    backgroundColor: (theme) =>
                                        theme.palette.error.dark,
                                },
                            }}
                            onClick={() => removeImage(item.name)}
                        >
                            <CloseIcon
                                sx={{
                                    color: (theme) =>
                                        theme.palette.neutral[100],
                                }}
                                fontSize="small"
                            />
                        </IconButton>
                    </Stack>
                )
            })}
        </Paper>
    )
}
export default ChatImage
