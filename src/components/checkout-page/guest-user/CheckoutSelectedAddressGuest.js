import {
	IconButton,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
	useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { t } from "i18next";
import CreateIcon from "@mui/icons-material/Create";
import PlaceIcon from "@mui/icons-material/Place";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import PersonIcon from "@mui/icons-material/Person";
import CallIcon from "@mui/icons-material/Call";
import MapsHomeWorkSharpIcon from "@mui/icons-material/MapsHomeWorkSharp";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { DeliveryCaption } from "../CheckOut.style";
import AddNewAddress from "../../user-info/address/AddNewAddress";
// import CustomModal from "../../modal";
// import GuestUserInforForm from "../../address/GuestUserInforForm";

const CheckoutSelectedAddressGuest = ({
	address,
	refetch,
	configData,
	editAddress,
	setEditAddress,
	orderType,
}) => {
	const theme = useTheme();
	const dispatch = useDispatch();
	//const [openGuestUserModal, setOpenGuestUserModal] = useState(false);
	//  const { openAddressModal } = useSelector((state) => state.addressModel);
	const { guestUserInfo } = useSelector((state) => state.guestUserInfo);
	const handleClick = () => {
		if (orderType === "take_away") {
			//setOpenGuestUserModal(true);
		} else {
			setEditAddress(address);
			//  dispatch(setOpenAddressModal(true));
		}
	};

	return (
		<div>
			<DeliveryCaption>{t('Delivery Addresses')}</DeliveryCaption>
			<CustomStackFullWidth
				border={`1px solid ${theme.palette.neutral[300]}`}
				borderRadius="5px"
				alignItems="flex-start"
				padding="10px"

			>
				<CustomStackFullWidth
					direction="row"
					alignItems="center"
					borderBottom={`2px solid ${theme.palette.neutral[200]}`}
				>
					<CustomStackFullWidth padding="8px">
						{guestUserInfo ? (
							<CustomStackFullWidth flexDirection={{ xs: "column", md: "row" }}>
								<CustomStackFullWidth
									direction="row"
									alignItems="center"
									gap="5px"
									padding="8px"
								>
									<PersonIcon sx={{ color: (theme) => theme.palette.neutral[300] }} />
									<Typography fontSize="13px">{guestUserInfo?.contact_person_name}</Typography>
								</CustomStackFullWidth>
								<CustomStackFullWidth
									direction="row"
									alignItems="center"
									gap="5px"
									padding="8px"
								>
									<CallIcon sx={{ color: (theme) => theme.palette.neutral[300] }} />
									<Typography fontSize="13px">
										{guestUserInfo?.contact_person_number}
									</Typography>
								</CustomStackFullWidth>
								{orderType !== "take_away" && (
									<CustomStackFullWidth
										direction="row"
										alignItems="center"
										gap="5px"
										padding="8px"
									>
										<MapsHomeWorkSharpIcon
											sx={{ color: (theme) => theme.palette.neutral[300] }}
										/>
										<Typography fontSize="12px">{`House - ${guestUserInfo?.house} , Floor - ${guestUserInfo?.floor}`}</Typography>
									</CustomStackFullWidth>
								)}
							</CustomStackFullWidth>
						) : (
							<CustomStackFullWidth
								direction="row"
								alignItems="center"
								justifyContent="center"
								gap="5px"
							>
								<ErrorOutlineOutlinedIcon
									sx={{ color: theme.palette.error.light }}
								/>
								<Typography sx={{ color: theme.palette.error.light }}>
									{t("No Contact Info Added")}
								</Typography>
							</CustomStackFullWidth>
						)}
					</CustomStackFullWidth>
					<AddNewAddress refetch={refetch} buttonbg="true" guestUser='true' orderType={orderType} />

				</CustomStackFullWidth>
				<CustomStackFullWidth
					direction="row"
					alignItems="center"
					gap="5px"
					padding="8px"
				>
					{orderType !== "take_away" && (
						<>
							<PlaceIcon sx={{ color: theme.palette.primary.main }} />
							<Typography sx={{ color: (theme) => theme.palette.neutral[400] }} >{guestUserInfo ? guestUserInfo?.address : address?.address}</Typography>
						</>
					)}
				</CustomStackFullWidth>
			</CustomStackFullWidth>
			{/* <AddNewAddress
                openAddressModal={openAddressModal}
                refetch={refetch}
                t={t}
                configData={configData}
                editAddress={editAddress}
                setEditAddress={setEditAddress}
            /> */}
			{/*{openGuestUserModal && (*/}
			{/*  <CustomModal*/}
			{/*    openModal={openGuestUserModal}*/}
			{/*    handleClose={() => setOpenGuestUserModal(false)}*/}
			{/*  >*/}
			{/*    <GuestUserInforForm*/}
			{/*      configData={configData}*/}
			{/*      editAddress={editAddress}*/}
			{/*      setEditAddress={setEditAddress}*/}
			{/*      handleClose={() => setOpenGuestUserModal(false)}*/}
			{/*    />*/}
			{/*  </CustomModal>*/}
			{/*)}*/}
		</div>
	);
};

export default CheckoutSelectedAddressGuest;
