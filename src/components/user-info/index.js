import React, { useEffect, useState } from 'react'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { Grid, IconButton } from '@mui/material'
import ProfileSideMenu from './ProfileSideMenu'
import ProfileBody from './ProfileBody'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import SideDRawerForProfile from './SideDrawer'
import { Scrollbar } from '../Scrollbar'

const UserInfo = ({ page }) => {
    return (
        <CustomStackFullWidth
            sx={{ paddingBlockStart: '1rem', paddingBlockEnd: '1rem', paddingTop: {xs:"0px",md:"60px"} }}
        >
            <Grid container spacing={2}>
                <Grid
                    container
                    item
                    sx={{
                        display: { sm: 'block', md: 'none' },
                        zIndex: 1155,
                    }}
                    alignItems="center"
                >
                    <SideDRawerForProfile page={page} />
                </Grid>
                <Grid
                    item
                    xs={0}
                    sm={0}
                    md={3}
                    sx={{ display: { xs: 'none', md: 'block' } }}
                >
                    <ProfileSideMenu page={page} />
                </Grid>
                <Grid item xs={12} sm={12} md={9}>
                    <ProfileBody page={page} />
                </Grid>
            </Grid>
        </CustomStackFullWidth>
    )
}

export default UserInfo
