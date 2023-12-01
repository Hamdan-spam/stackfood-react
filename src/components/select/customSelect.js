import * as React from 'react';
import {useEffect} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CustomSelect = props => {
    const {value, inputLabel, handleValue, renderData} = props
    const [age, setAge] = React.useState('');
    useEffect(() => {
        if (age !== '') {
            handleValue?.(age)
        }
    }, [age])

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{inputLabel}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label={inputLabel}
                onChange={handleChange}
            >
                {
                    renderData?.map(item => {
                        return <MenuItem value={item?.value}>{item?.label}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    );
};

CustomSelect.propTypes = {};

export default CustomSelect;