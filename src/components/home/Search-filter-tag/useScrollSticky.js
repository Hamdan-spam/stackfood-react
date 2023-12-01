import { useState, useEffect, useRef } from 'react';
import { useDispatch } from "react-redux";
import {
  setCategoryIsSticky,
  setFoodTypeIsSticky,
  setRestaurantIsSticky,
  setSticky
} from "../../../redux/slices/scrollPosition";
import { useRouter } from "next/router";

const useScrollSticky = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  const offsetElementRef = useRef(null);
  const catOffsetElementRef = useRef(null);



  useEffect(() => {
    const handleScroll = () => {

      if (offsetElementRef.current) {
        const elementOffset = offsetElementRef.current.getBoundingClientRect().top;
        const scrollTop = window.scrollY + 50;
        if (scrollTop >= elementOffset) {
          dispatch(setSticky(true))
        } else {
          dispatch(setSticky(false));
        }
      }
      if (catOffsetElementRef.current) { // Access current property
        const elementOffset = catOffsetElementRef.current.getBoundingClientRect().top;
        const scrollTop = window.scrollY - 100;
        if (scrollTop >= elementOffset) {
          dispatch(setCategoryIsSticky(true));
        } else {
          dispatch(setCategoryIsSticky(false));
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    router.events.on('routeChangeStart', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll);
      router.events.off('routeChangeStart', handleScroll);
    };
  }, [router.pathname]);

  return { offsetElementRef, catOffsetElementRef };
};

export default useScrollSticky;
