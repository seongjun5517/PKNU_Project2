import React from "react";

const InputField = ({label, value, onChange}) => {
    return (
        <div>
            <label>{label}</label>
            <input  type="number"
                    step="0.1"
                    value={value}
                    onChange={onChange}
                    required />
        </div>
    );
};

export default InputField;