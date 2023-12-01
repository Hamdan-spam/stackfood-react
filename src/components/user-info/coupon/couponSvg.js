import React from 'react';
import {Stack} from "@mui/system";

const CouponSvg = () => {
    return (
            <svg  width="100%" height="100%" viewBox="0 0 344 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_dd_1_23276)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10 15C10 9.47716 14.4772 5 20 5H324C329.523 5 334 9.47715 334 15V38.7089C333.687 38.6895 333.371 38.6797 333.053 38.6797C324.681 38.6797 317.895 45.4661 317.895 53.8376C317.895 62.2091 324.681 68.9955 333.053 68.9955C333.371 68.9955 333.687 68.9857 334 68.9664V95C334 100.523 329.523 105 324 105H20C14.4771 105 10 100.523 10 95L10 68.9955C18.3715 68.9955 25.1579 62.2091 25.1579 53.8376C25.1579 45.4661 18.3715 38.6797 10 38.6797L10 15Z" fill="white"/>
                </g>
                <defs>
                    <filter id="filter0_dd_1_23276" x="0" y="0" width="344" height="120" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="5"/>
                        <feGaussianBlur stdDeviation="5"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_23276"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset/>
                        <feGaussianBlur stdDeviation="1"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                        <feBlend mode="normal" in2="effect1_dropShadow_1_23276" result="effect2_dropShadow_1_23276"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1_23276" result="shape"/>
                    </filter>
                </defs>

            </svg>

    );
};

export default CouponSvg;
