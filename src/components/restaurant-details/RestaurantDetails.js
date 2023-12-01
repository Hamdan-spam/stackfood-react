import React, { useEffect, useRef, useState } from "react";
import { alpha, Box, Grid, Typography } from "@mui/material";
import TopBanner from "./HeadingBannerSection/TopBanner";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import RecommendProduct from "./RecommendProduct";
import CustomContainer from "../container";
import RestaurantCategoryBar from "./RestaurantCategoryBar";
import { useGetAllProductsOfARestaurant } from "../../hooks/custom-hooks/useGetAllProductsOfARestaurant";
import { useGetAllCategories } from "../../hooks/custom-hooks/useGetAllCategories";
import CategoriesWiseFood from "./CategoriesWiseFood";
import { isAvailable, restaurantDiscountTag } from "../../utils/customFunctions";

import RestaurentDetailsShimmer from "./RestaurantShimmer/RestaurentDetailsShimmer";
import { useGetRecommendProducts } from "../../hooks/react-query/config/useGetRecommendProduct";

import { debounce } from "lodash";
import CustomSearch from "../custom-search/CustomSearch";
import { Stack } from "@mui/system";
import { t } from "i18next";
import { ProductApis } from "../../hooks/react-query/config/productsApi";
import { useQuery } from "react-query";
import { useRestaurentFoodSearch } from "../../hooks/custom-hooks/useRestaurentFoodSearch";
import { usePopularFoods } from "../../hooks/react-query/restaurants/usePopularFoods";
import RestaurantAnnouncementMessege from "./RestaurantAnnouncementMessege";

const getCombinedCategoriesAndProducts = (
	all_categories,
	all_products,
	restaurantCategoryIds,
	recommendProducts,
	popularProducts
) => {
	const allCategories = all_categories;
	const allProducts = all_products;

	const popular = {
		id: 1112,
		name: t("Popular"),
		products: popularProducts,
		isBgColor: true
	};
	const recommend = {
		id: 1233,
		name: t("Recommend Products"),
		products: recommendProducts?.products,
		isBgColor: true
	};

	if (allCategories?.length > 0 && allProducts?.length > 0) {
		const data = allCategories?.map((item) => {
			const categoryItems = allProducts?.filter(
				(product) => product?.category_ids[0]?.id == item?.id
			);
			if (categoryItems.length > 0) {
				return {
					...item,
					products: categoryItems
				};
			} else {
				return {
					...item,
					// products: allProducts?.filter(
					//     (product) => product?.category_id !== item?.id
					// ),
					products: []
				};
			}
		});
		if (
			popularProducts?.length > 0 &&
			recommendProducts?.products?.length > 0
		) {
			return [popular, recommend, ...data];
		} else if (popularProducts?.length > 0) {
			return [popular, ...data];
		} else if (recommendProducts?.products?.length > 0) {
			return [recommend, ...data];
		} else {
			return data;
		}
	} else {
		return [];
	}
};

const RestaurantDetails = ({ restaurantData }) => {
	const [data, setData] = useState([]);
	const [allFoods, setAllFoods] = useState([]);
	const [page_limit, setPageLimit] = useState(50);
	const [offset, SetOffSet] = useState(1);
	const [selectedId, setSelectedId] = useState(null);
	const [isFirstRender, setIsFirstRender] = useState(true);
	const [showComponent, setShowComponent] = useState(true);
	const [checkFilter, setCheckFilter] = useState(false);
	const [filterKey, setFilterKey] = useState({});
	const [searchKey, setSearchKey] = useState("");
	const restaurantId = restaurantData?.id;
	const allProducts = useGetAllProductsOfARestaurant(restaurantId);
	const allCategories = useGetAllCategories();
	const theme = useTheme();
	const isSmall = useMediaQuery(theme.breakpoints.down("md"));
	const refs = useRef([]);
	const restaurantCategoryIds = restaurantData?.category_ids;
	const handleOnSuccess = (res) => {
		setAllFoods(res?.data?.products);
	};

	const searchFood = useRestaurentFoodSearch(
		restaurantId,
		searchKey,
		handleOnSuccess
	);
	useEffect(() => {
		const timer = setTimeout(() => {
			setShowComponent(false);
		}, 15000);
		return () => clearTimeout(timer);
	}, []);
	useEffect(() => {
		if (searchKey === "") {
			setAllFoods(allProducts);
		}
	}, [allProducts, searchKey]);

	const clickedOnCategoryRef = useRef(false);

	///RECOMMEND PRODUCTS API
	const {
		data: recommendProducts,
		refetch: refetchRecommend,
		isRefetching,
		isLoading
	} = useGetRecommendProducts({ restaurantId, page_limit, offset, searchKey });
	const { data: popularProducts, refetch: refetchPopular } = usePopularFoods({
		restaurantId,
		page_limit,
		offset,
		searchKey
	});
	useEffect(() => {
		if (restaurantId) {
			refetchRecommend();
			refetchPopular();
		}
	}, [restaurantId, searchKey]);
	useEffect(() => {
		setSearchKey("");
		setSelectedId(null);
	}, [restaurantId]);

	useEffect(() => {
		const combined = getCombinedCategoriesAndProducts(
			allCategories,
			allFoods,
			restaurantCategoryIds,
			recommendProducts,
			popularProducts
		);

		const hasProducts = combined?.filter(
			(item) => item?.products?.length > 0
		);
		setData(hasProducts);
		//setSelectedId(hasProducts?.[0]?.id)
		setIsFirstRender(false);
	}, [allFoods, allCategories, recommendProducts, popularProducts]);

	const handleFocusedSection = debounce((val) => {
		setSelectedId(val?.id);
		if (!isFirstRender) {
			if (!clickedOnCategoryRef.current) {
				setSelectedId(val?.id);
			}
			clickedOnCategoryRef.current = false;
		}
	}, 300);
	const handleClick = (val) => {
		//setClickedCategory(val)
		setSelectedId(val);

		clickedOnCategoryRef.current = true;
		// setClickedOnCategory(true)
	};

	useEffect(() => {
		if (refs.current.length > 0) {
			if (selectedId) {
				refs.current[selectedId]?.scrollIntoView({
					behavior: "smooth"
				});
			}
		}
	}, [selectedId]);

	const handleFilter = () => {
		setCheckFilter((prevState) => !prevState);
	};

	useEffect(() => {
		handleFilteredData();
	}, [checkFilter]);

	const handleFilteredData = () => {
		const combined = getCombinedCategoriesAndProducts(
			allCategories,
			allFoods,
			restaurantCategoryIds,
			recommendProducts,
			popularProducts
		);

		const filterData = combined?.map((item) => {
			return {
				...item,
				products: item?.products?.filter((foods) => {
					return (
						(filterKey?.discount && foods?.discount > 0) ||
						(filterKey?.nonVeg && foods?.veg === 0) ||
						(filterKey?.veg && foods?.veg === 1) ||
						(filterKey?.currentlyAvailable &&
							isAvailable(
								foods?.available_time_starts,
								foods?.available_time_ends
							)) ||
						(!filterKey?.veg &&
							!filterKey?.nonVeg &&
							!filterKey?.discount &&
							!filterKey?.currentlyAvailable)
					);
				})
			};
		});
		const hasProducts = filterData?.filter(
			(item) => item?.products?.length > 0
		);
		setData(hasProducts);
	};

	const handleSearchResult = async (values) => {
		if (values === "") {
			setSearchKey("");
			//setIsSearch('')
		} else {
			setSearchKey(values);
			//  setIsSearch('search')
		}
	};
	const restaurantDiscount = restaurantDiscountTag(
		restaurantData?.discount,
		restaurantData?.free_delivery
	);

	return (
		<CustomContainer sx={{ mb: { xs: "7px", md: "0" } }}>
			<CustomStackFullWidth pb={isSmall ? "1rem" : "3rem"} paddingTop={{ xs: "10px", md: "70px" }} spacing={2}>
				{restaurantData && <TopBanner details={restaurantData} />}
				<CustomStackFullWidth spacing={3}>
					{!isFirstRender && (
						<>
							<RestaurantCategoryBar
								handleFilter={handleFilter}
								filterKey={filterKey}
								setFilterKey={setFilterKey}
								data={data}
								selectedId={selectedId}
								handleClick={handleClick}
								isSmall={isSmall}
								handleSearchResult={handleSearchResult}
								searchKey={searchKey}
							/>
							{!isSmall && (
								<Stack
									sx={{
										backgroundColor: (theme) =>
											theme.palette.neutral[1800],
										position: "sticky",
										zIndex: 998,
										padding: "1rem 1rem 1rem 0",
										maxWidth: "50%",
										top: {
											xs: "199px",
											sm: "270px",
											md: "262px"
										}
									}}
								>
									<CustomSearch
										//key={reRenderSearch}
										handleSearchResult={handleSearchResult}
										label={t("Search foods")}
										//isLoading={isLoadingSearchFood}
										searchFrom="restaurantDetails"
										selectedValue={searchKey}
									/>
								</Stack>
							)}
							{data?.map((item, index) => {
								return (
									<Box sx={{ position: "relative" }}>
										<Box
											sx={{
												position: "absolute",
												top: "-340px"
											}}
											ref={(el) =>
												(refs.current[item?.id] = el)
											}
										/>
										<CategoriesWiseFood
											data={item}
											handleFocusedSection={
												handleFocusedSection
											}
											indexNumber={index}
											restaurantDiscount={
												restaurantDiscount
											}
										/>
									</Box>
								);
							})}
							{data?.length === 0 && (
								<RestaurentDetailsShimmer
									showComponent={showComponent}
								/>
							)}
						</>
					)}
				</CustomStackFullWidth>
			</CustomStackFullWidth>
		</CustomContainer>
	);
};

export default RestaurantDetails;
