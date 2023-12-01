import * as React from 'react'
import { useState } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Fade from '@mui/material/Fade'

import { useTranslation } from 'react-i18next'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import { Chip } from '@mui/material'
import { CustomBoxFullWidth } from './chat/Chat.style'
import { RTL } from './RTL/RTL'

const ItemSelectWithChip = (props) => {
    const { title, data, handleChange } = props
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [selected, setSelected] = useState(null)
    const { t } = useTranslation()
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleClickItem = (value) => {
        setSelected(value)
        setAnchorEl(null)
        handleChange?.(value)
    }
    const handleDelete = () => {
        setSelected(null)
        handleChange?.(null)
    }
    const languageDirection = localStorage.getItem('direction')
    return (
        <RTL direction={languageDirection}>
            <CustomBoxFullWidth sx={{ height: selected ? '95px' : '40px' }}>
                <Button
                    id="fade-button"
                    aria-controls={open ? 'fade-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    fullWidth
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        textTransform: 'capitalize',
                    }}
                >
                    {t(title)}
                    {open ? (
                        <KeyboardDoubleArrowDownIcon />
                    ) : languageDirection === 'rtl' ? (
                        <KeyboardDoubleArrowLeftIcon />
                    ) : (
                        <KeyboardDoubleArrowRightIcon />
                    )}
                </Button>
                {data?.length > 0 && (
                    <Menu
                        id="fade-menu"
                        MenuListProps={{
                            'aria-labelledby': 'fade-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                    >
                        {data?.map((item, index) => {
                            return (
                                <MenuItem
                                    key={index}
                                    onClick={() => handleClickItem(item)}
                                >
                                    {t(item)}
                                </MenuItem>
                            )
                        })}
                    </Menu>
                )}
                {selected && (
                    <Chip
                        sx={{ mt: '10px', ml: '15px' }}
                        label={t(selected)}
                        onDelete={handleDelete}
                    />
                )}
            </CustomBoxFullWidth>
        </RTL>
    )
}

export default ItemSelectWithChip
