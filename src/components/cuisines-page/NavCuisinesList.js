import React from 'react'
import Link from 'next/link'
import MenuItem from '@mui/material/MenuItem'
import { alpha, ListItemIcon, Typography, useTheme } from '@mui/material'
import CustomImageContainer from '../CustomImageContainer'

const NavCuisinesList = ({ item, handledropClose, cuisinesImageUrl }) => {
    const theme = useTheme()
    return (
        <Link
            href={{
                pathname: `/cuisines/${item.id}`,
                query: { name: item?.name },
            }}
            //href={`/cuisines/${item.id}`}
            key={item?.id}
        >
            <MenuItem
                onClick={handledropClose}
                sx={{
                    alignItems: 'center',
                    gap: '5px',
                    borderRadius: '5px',
                    '&:hover': {
                        backgroundColor: (theme) =>
                            alpha(theme.palette.primary.main, 0.3),
                    },
                }}
            >
                <ListItemIcon>
                    <CustomImageContainer
                        src={`${cuisinesImageUrl}/${item.image}`}
                        width="35px"
                        height="35px"
                        loading="lazy"
                        objectFit="cover"
                    />
                </ListItemIcon>
                <Typography
                    variant="h5"
                    fontWeight="400"
                    color={theme.palette.neutral[1000]}
                >
                    {item.name}
                </Typography>
            </MenuItem>
        </Link>
    )
}

export default NavCuisinesList
