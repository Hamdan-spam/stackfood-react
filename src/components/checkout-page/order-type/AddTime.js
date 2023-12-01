import React, {useEffect, useState} from 'react';
import {Button, Stack, Typography} from "@mui/material";
import {CustomStackFullWidth} from "../../../styled-components/CustomStyles.style";
import CustomModal from "../../custom-modal/CustomModal";
import TimeChooser from "./TimeChooser";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import {Box} from "@mui/system";



const AddTime = props => {
    const {data, handleDaysTime, t} = props
    const [selected, setSelected] = useState(data)
    const [clickedButtonId, setClickedButtonId] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    useEffect(() => {
        if (clickedButtonId!==null) {
            setOpenModal(true)
        }
    }, [clickedButtonId])
    useEffect(()=>{
        handleDaysTime?.(selected)
    },[selected])
    const handleSelection = (sItem) => {
        if(sItem?.time!==''){
            const newArray = selected.map(item => item.value === sItem.value ? {...sItem, time:''} : item)
            setSelected(newArray)
        }
        else{
            setClickedButtonId(sItem.value)
        }
    }
    const handleVariant = (item) => {
        if(item?.time!==''){
            return "contained"
        }
        else{
            return "outlined"
        }
    }
    const handleModalClose = () => {
        setOpenModal(false)
        setClickedButtonId(null)
    }
    const handleSuccess = (time) => {

        const newArray = selected.map(item=> item?.value===clickedButtonId ? {...item, time} : item )
        setSelected(newArray)
        setClickedButtonId(null)
        setOpenModal(false)
    }
    return (<CustomStackFullWidth spacing={1}>
        <Typography fontSize='14px' color='gray'>
            {t('*Chose your preferable days and times to get your delivery')}
        </Typography>
        <CustomStackFullWidth direction='row' alignItems='center' justifyContent='flex-start' spacing={2}>

            {selected?.map(item => <Button onClick={() => handleSelection(item)}
                                           variant={handleVariant(item)} sx={{
                minWidth: '170px',
                padding: '10px 20px',
                color: theme => item?.time!=='' ? theme.palette.neutral[100] : theme.palette.neutral[1000],
            }}>
                <CustomStackFullWidth alignItems='center' justifyContent='center' >
                    <Typography>
                        {item?.name}
                    </Typography>
                    {item?.time!=='' &&  <Typography>
                        <AccessTimeOutlinedIcon/> {item?.time}
                    </Typography> }
                </CustomStackFullWidth>
            </Button>)}
            <CustomModal
                openModal={openModal}
                setModalOpen={handleModalClose}
            >
                <TimeChooser clickedButtonId={clickedButtonId} handleModalClose={handleModalClose}
                             handleSuccess={handleSuccess}/>
            </CustomModal>
        </CustomStackFullWidth>
        <Box sx={{width:'100%', height:'10px'}} />
    </CustomStackFullWidth>);
};

AddTime.propTypes = {};

export default AddTime;