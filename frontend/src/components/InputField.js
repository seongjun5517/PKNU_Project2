import React from "react";

// 입력 필드 컴포넌트 생성
//  - 필요한 곳에서 공용으로 사용
const InputField = ({label, value, onChange}) => {
    return (
        <div>
            <label>{label}</label> : 
            {/* step : 소숫점 첫번째자리까지 허용하여 입력 가능하도록 처리 */}
             <input type="number" 
                    step="0.1" 
                    value={value} 
                    onChange={onChange}
                    required />
        </div>
    );
};

export default InputField;