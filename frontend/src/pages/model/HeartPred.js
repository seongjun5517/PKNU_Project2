import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const HeartPred = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const result = location.state?.result;

    const displayResult = (result !== undefined && result !== null && !isNaN(result))
        ? `${(result * 100).toFixed(2)}%`
        : "결과 데이터 오류";

    return (
        <div>
            <h3>심근경색 예측 결과 출력</h3>
            <hr/>

            <p>
                심근경색 발병 확률 : <strong>{displayResult}</strong>
            </p>

            <hr/>

            <button onClick={() => navigate("/predict/heart_pred_form")}>다시 예측하기</button>
            <button onClick={() => navigate("/")}>Home</button>
        </div>
    );
};

export default HeartPred;
