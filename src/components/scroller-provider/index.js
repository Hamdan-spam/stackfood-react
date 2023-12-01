import React from 'react'
import PropTypes from 'prop-types'
import { Scrollbar } from '../Scrollbar'

const ScrollerProvider = (props) => {
    const { children, maxHeight, maxWidth, padding } = props
    return (
        <div>
            <Scrollbar
                style={{
                    maxHeight: maxHeight ? maxHeight : '60vh',
                    maxWidth: maxWidth,
                    padding: padding ? padding : '10px',
                }}
            >
                {children}
            </Scrollbar>
        </div>
    )
}
export default ScrollerProvider
