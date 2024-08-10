import React from "react";
import PropTypes from 'prop-types';

function Button({
    children,
    type='button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
    return (
        <button 
            type={type} 
            className={`px-4 py-3 rounded-lg ${className} ${textColor} ${bgColor}`} 
            {...props}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.string,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
    className: PropTypes.string,
};

Button.defaultProps = {
    type: 'button',
    bgColor: 'bg-blue-600',
    textColor: 'text-white',
    className: '',
};

export default Button;
