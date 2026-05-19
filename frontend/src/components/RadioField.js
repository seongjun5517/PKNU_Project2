import React from "react";

// name 속성을 추가로 받아야 여러 개의 라디오 그룹이 서로 꼬이지 않습니다.
const RadioField = ({ label, name, value, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      
      {/* 고혈압 진단을 받음 -> 1 */}
      <label>
        <input
          type="radio"
          name={name}
          value="1" 
          checked={Number(value) === 1} // 부모의 값이 숫자 1 또는 문자열 '1'이면 체크
          onChange={onChange}
          required
        />
        있음
      </label>

      {/* 진단을 받지 않음 -> 0 */}
      <label>
        <input
          type="radio"
          name={name}
          value="0"
          checked={Number(value) === 0} // 부모의 값이 숫자 0 또는 문자열 '0'이면 체크
          onChange={onChange}
          required
        />
        없음
      </label>
    </div>
  );
};

export default RadioField;