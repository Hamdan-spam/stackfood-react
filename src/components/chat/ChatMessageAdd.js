import React, { useRef, useState } from 'react'
import {
    TextField,
    Box,
    Tooltip,
    IconButton,
    styled,
    alpha,
    InputAdornment,
} from '@mui/material'
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import Picker from 'emoji-picker-react'
import { toast } from 'react-hot-toast'
import { t } from 'i18next'
import ChatImage from './ChatImage'
import { Stack } from '@mui/system'
import useMediaQuery from '@mui/material/useMediaQuery'
const CssTextField = styled(TextField)(({ theme }) => ({
    '& label.Mui-focused': {
        color: (theme) => theme.palette.neutral[300],
        background: (theme) => theme.palette.neutral[100],
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
    '& .MuiOutlinedInput-root': {
        border: `1px solid ${theme.palette.neutral[300]}`,
        fontSize: '14px',
        borderRadius: '24px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '10px',
        },
    },
}))
const ChatMessageAdd = ({ onSend }) => {
    const [openEmoji, setOpenEmoji] = useState(false)
    const [chosenEmoji, setChosenEmoji] = useState(null)
    const xSmall = useMediaQuery((theme) => theme.breakpoints.down('md'))
    const [body, setBody] = useState({
        text: '',
        file: [],
    })
    const languageDirection = localStorage.getItem('direction')
    const fileInputRef = useRef(null)
    const handleChange = (event) => {
        setBody({ ...body, text: event.target.value })
    }

    const onEmojiClick = (event, emojiObject) => {
        setBody({ ...body, text: body.text + event?.emoji })
        setOpenEmoji(false)
    }

    const handleSend = () => {
        if (!body) {
            toast.error(t('write something'))
        }
        if (body.file.length > 3) {
            toast.error(t('Maximum 3 images can be send at a time.'))
        } else {
            onSend?.(body)
            setBody({ text: '', file: [] })
        }
    }
    const handleAttach = () => {
        fileInputRef.current.click()
    }
    const handleKeyUp = (event) => {
        if (event.code === 'Enter' && !event.shiftKey) {
            handleSend()
        }
    }
    const MAX_LENGTH = 3
    const handleFileOnChange = (e) => {
        if (body?.file?.length <= 4) {
            setBody({ ...body, file: [...body.file, ...e.target.files] })
        } else {
            toast.error(t('maximum image upload limit 5'))
        }
    }

    const removeImage = (name) => {
        const tempData = body.file.filter((item) => item.name !== name)
        setBody({ text: body.text, file: tempData })
    }
    return (
        <>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexShrink: 0,
                    p: 1.5,
                    position: 'relative',
                    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.25)',
                    margin: '10px',
                }}
            >
                <Box sx={{ position: 'absolute', bottom: '80%' }}>
                    {openEmoji && (
                        <Picker
                            pickerStyle={{ width: '100%' }}
                            onEmojiClick={onEmojiClick}
                        />
                    )}
                </Box>
                <Stack direction="row" sx={{ paddingInlineEnd: '.7rem' }}>
                    <Tooltip title={t('Image')}>
                        <IconButton onClick={handleAttach}>
                            <InsertPhotoIcon
                                fontSize="medium"
                                color="primary"
                            />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title={'Gif'}>
                        <IconButton onClick={handleAttach}>
                            <GifBoxOutlinedIcon
                                fontSize="medium"
                                color="primary"
                            />
                        </IconButton>
                    </Tooltip>
                </Stack>
                <CssTextField
                    // disabled={disabled}
                    fullWidth
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                    placeholder={t('Start a new message')}
                    value={body.text}
                    size="small"
                    multiline
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                {!xSmall && (
                                    <InsertEmoticonIcon
                                        color="primary"
                                        sx={{ cursor: 'pointer' }}
                                        onClick={() =>
                                            setOpenEmoji(
                                                (prevState) => !prevState
                                            )
                                        }
                                    />
                                )}
                            </InputAdornment>
                        ),
                    }}
                />

                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        m: -2,
                        marginInlineStart: languageDirection !== 'rtl' && 2,
                        marginInlineEnd: languageDirection === 'rtl' && '1rem',
                    }}
                >
                    <Tooltip title="Send">
                        <IconButton
                            disabled={
                                body.text === '' && body.file.length === 0
                            }
                            onClick={handleSend}
                            sx={{
                                transform:
                                    languageDirection === 'rtl' &&
                                    'rotate(180deg)',
                            }}
                        >
                            <SendOutlinedIcon
                                fontSize="medium"
                                color="primary"
                            />
                        </IconButton>
                    </Tooltip>
                </Box>
                <input
                    hidden
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileOnChange}
                />
                {body.file.length > 0 && (
                    <ChatImage body={body} removeImage={removeImage} />
                )}
            </Box>
        </>
    )
}
export default ChatMessageAdd
