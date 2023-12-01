import React, { useEffect, useState } from "react";
import { PreferableTimeInput, TimeSlot, TomorrowSlot } from "./CheckOut.style";
import { Grid, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { getAllSchedule, getDayNumber } from "./const";
import { useTranslation } from "react-i18next";
import { CustomPaperBigCard, CustomTypographyBold } from "../../styled-components/CustomStyles.style";
import SimpleBar from "simplebar-react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TodayIcon from "@mui/icons-material/Today";
import moment from "moment/moment";
import InfoIcon from '@mui/icons-material/Info';

const RestaurantScheduleTime = (props) => {
    const {
        restaurantData,
        handleChange,
        today,
        tomorrow,
        numberOfDay,
        setDayNumber,
        global,
        setScheduleAt,
        scheduleAt
    } = props;
    const currentDate = new Date();
    const maxDate = new Date();
    maxDate.setDate(currentDate.getDate() + global?.customer_order_date - 1);
    const [selectedDate, setSelectedDate] = useState(null);
    const { t } = useTranslation();
    const [time, setTime] = useState("Now");
    const [day, setday] = useState("Today");
    const [slot, setSlot] = useState(null);
    const [slotList, setSlotList] = useState(null);
    const [selected, setSelected] = useState(false);
    const slotDurationTime = global?.schedule_order_slot_duration === 0 ? 30 : global?.schedule_order_slot_duration;

    useEffect(() => {
        setSlotList(getAllSchedule(
            numberOfDay,
            restaurantData?.data?.schedules,
            slotDurationTime,
            selectedDate
        ).slice(1));
    }, []);
    useEffect(() => {
        if (day === "Today") {
            if (time === "Now") {
                setScheduleAt('now');
                setSelected(false);
            } else {
                setSelectedDate(moment(currentDate).format('YYYY-MM-DD'))
                setSlotList(getAllSchedule(
                    numberOfDay,
                    restaurantData?.data?.schedules,
                    slotDurationTime,
                    selectedDate
                ).slice(1));
            }
        } else if (day === "Tomorrow") {
            setSelectedDate(moment().add(1, 'day').format('YYYY-MM-DD'))
            setSlotList(getAllSchedule(
                getDayNumber(tomorrow),
                restaurantData?.data?.schedules,
                slotDurationTime,
                selectedDate
            ));
        } else {
            setSlotList(getAllSchedule(
                getDayNumber(moment(selectedDate).format("dddd")),
                restaurantData?.data?.schedules,
                slotDurationTime,
                selectedDate
            ));
        }
    }, [day, time, selectedDate]);

    const handleSlot = (item) => {
        setSelected(item?.value);
        setSlot(item);
        setScheduleAt(item?.value);
    };

    const handleTime = (event, newValue) => {
        setSlot(null)
        setSelected(false)
        if (newValue?.props?.children === "Today") {
            setday("Today");
            setTime("Now");
        } else if (newValue?.props?.children === "Tomorrow") {
            setday("Tomorrow");
            setTime("Later");
        } else {
            setSelectedDate(null)
            setday("CustomDate");
            setTime("Later");
        }
        handleChange(event);
    };

    const isDateDisabled = (date) => {
        const currentDateWithoutTime = moment(currentDate).startOf('day')
        return (
            date < currentDateWithoutTime || date > maxDate // Disable dates earlier than the current date or later than 7 days from the current date
        );
    };
    const handleDateChange = (date) => {
        setSelectedDate(moment(date?.$d).format('YYYY-MM-DD'));
    };



    return (
        <>
            {restaurantData?.data?.schedule_order && (
                <CustomPaperBigCard>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12}>
                            <CustomTypographyBold>
                                {t("Preferable Time")}
                            </CustomTypographyBold>
                        </Grid>
                        <Grid item md={6} sm={6} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>{t("Time")}</InputLabel>
                                <Select
                                    label={t("Time")}
                                    onChange={(event, newValue) => {
                                        handleTime(event, newValue);
                                    }}
                                    defaultValue={getDayNumber(today)}
                                >
                                    <MenuItem
                                        value={getDayNumber(today)}
                                        sx={{
                                            "&:hover": {
                                                backgroundColor: "primary.main"
                                            }
                                        }}
                                    >
                                        {t("Today")}
                                    </MenuItem>
                                    <MenuItem
                                        value={getDayNumber(tomorrow)}
                                        sx={{
                                            "&:hover": {
                                                backgroundColor: "primary.main"
                                            }
                                        }}
                                    >
                                        {t("Tomorrow")}
                                    </MenuItem>
                                    {global?.customer_date_order_sratus &&
                                        <MenuItem
                                            value={"Custom Date"}
                                            sx={{
                                                "&:hover": {
                                                    backgroundColor: "primary.main"
                                                }
                                            }}
                                        >
                                            {t("Custom Date")}
                                        </MenuItem>

                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={6} sm={6} xs={12}>
                            {restaurantData?.data?.schedules &&
                                restaurantData?.data?.schedules?.length > 0 && (
                                    <>{day === "Today" ? (
                                        <FormControl fullWidth>
                                            <InputLabel>{t("Schedule")}</InputLabel>
                                            <Select
                                                label={t("Schedule")}
                                                onChange={(event, newValue) => {
                                                    setday("Today");
                                                    setTime(newValue?.props?.value);
                                                }}
                                                defaultValue={time}
                                            // value={time}
                                            >
                                                <MenuItem
                                                    value={"Now"}
                                                    sx={{
                                                        "&:hover": {
                                                            backgroundColor: "primary.main"
                                                        }
                                                    }}
                                                >
                                                    {t("Now")}
                                                </MenuItem>
                                                <MenuItem
                                                    value={"Later"}
                                                    sx={{
                                                        "&:hover": {
                                                            backgroundColor: "primary.main"
                                                        }
                                                    }}
                                                >
                                                    {t("Later")}
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    ) : (
                                        <>{day === "Tomorrow" ? (
                                            <TomorrowSlot
                                                disabled
                                                fullWidth
                                                id="filled-disabled"
                                                defaultValue={slot?.label}
                                                value={slot?.label}
                                            />

                                        ) : (
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    label="Schedule"
                                                    value={selectedDate}
                                                    onChange={handleDateChange}
                                                    renderInput={(params) => (
                                                        <TextField

                                                            {...params}
                                                            fullWidth
                                                            disabled
                                                            variant="outlined"
                                                            InputProps={{

                                                                endAdornment: (
                                                                    <IconButton
                                                                        edge="end"
                                                                        onClick={params.openPicker}
                                                                    >
                                                                        <TodayIcon />
                                                                    </IconButton>
                                                                )
                                                            }}
                                                        />
                                                    )}

                                                    shouldDisableDate={isDateDisabled}
                                                />
                                            </LocalizationProvider>
                                        )
                                        }
                                        </>
                                    )
                                    }</>
                                )}
                        </Grid>
                    </Grid>
                    {time === "Later" && slotList.length > 0 ?
                        (<SimpleBar style={{ maxHeight: 300 }}>
                            <Grid container spacing={2} paddingTop="20px">
                                {slotList?.map((item, index) => {
                                    return (
                                        <Grid item xs={6} md={3} key={index}>
                                            <TimeSlot
                                                selected={selected} value={item?.value}
                                                onClick={() => handleSlot(item)}
                                            >
                                                {item?.label}
                                            </TimeSlot>
                                        </Grid>
                                    );
                                })
                                }
                            </Grid>
                        </SimpleBar>) : (
                            <>
                                {day !== "Today" &&
                                    <Stack direction="row" paddingTop=".5rem" spacing={1} alignItems="center">
                                        <InfoIcon sx={{ color: theme => theme.palette.info.main }} />
                                        <Typography fontSize="14px" fontWeight="700" >{t("Restaurant is close")}</Typography>
                                    </Stack>
                                }
                            </>

                        )
                    }
                </CustomPaperBigCard>
            )}
        </>
    );
};

RestaurantScheduleTime.propTypes = {};

export default RestaurantScheduleTime;
