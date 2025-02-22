import React, { useId } from "react";
import PropTypes from 'prop-types';

const Input = React.forwardRef(function Input({
    label,
    type,
    className,
    ...props
}, ref) {
    const id = useId();
    return (
        <div className="w-full">
            {label && (
                <label 
                    htmlFor={id}
                    className="inline-block mb-1 pl-1"
                
                >
                    {label}
                </label>
            )}
            <input 
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border-gray-200 w-full ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    );
});

Input.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
};

Input.defaultProps = {
    type: 'text',
    className: '',
};

export default Input;
