import React, { useEffect, useState } from 'react'
import { CustomImageContainerStyled } from '../styled-components/CustomStyles.style'
import placeholder from '../../public/static/notimage.png'

const CustomImageContainer = ({
    cursor,
    mdHeight,
    maxWidth,
    height,
    width,
    objectFit,
    minwidth,
    src,
    alt,
    borderRadius,
    marginBottom,
    smHeight,
    smMb,
    smMaxWidth,
    smWidth,
}) => {
    const [imageFile, setState] = useState(null)
    useEffect(() => {
        setState(src)
    }, [src])
    const errorHeight = smHeight ? smHeight : '104px'
    return (
        <CustomImageContainerStyled
            height={height}
            width={width}
            objectFit={objectFit}
            minwidth={minwidth}
            borderRadu={borderRadius}
            marginBottom={marginBottom}
            smHeight={smHeight}
            smMb={smMb}
            maxWidth={maxWidth}
            smMaxWidth={smMaxWidth}
            smWidth={smWidth}
            mdHeight={mdHeight}
            cursor={cursor}
        >
            <img
                src={imageFile}
                alt={alt}
                onError={(e) => {
                    // currentTarget.onerror = null; // prevents looping
                    setState(placeholder.src)
                    e.target.style =
                        'objectFit:contain !important;width:auto !important;'
                    e.target.style.margin = 'auto'
                }}
                loading="lazy"
            />
        </CustomImageContainerStyled>
    )
}
export default CustomImageContainer
