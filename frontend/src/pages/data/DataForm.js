import React from "react";

import {useNavigate} from "react-router-dom";

function DataForm({
        data,
        changeData,
        submitData,
        isUpdate = false
})
    {
        const navigate = useNavigate();

        return(

            <form
                onSubmit={submitData}>

                {/* 회원 ID */}
                <div>
                    <p>
                        회원 ID
                    </p>

                    <input
                        type="text"
                        name="mem_id"
                        value={ data?.mem_id || ""}
                        onChange={changeData}
                    />

                </div>

                {/* 혈압 */}

                <div>
                    <p>
                        혈압
                    </p>

                    <input
                        type="number"
                        name="he_hp"
                        value={data?.he_hp || ""}
                        onChange={changeData}
                    />

                </div>

                {/* 혈당 */}

                <div>

                    <p>
                        혈당
                    </p>

                    <input
                        type="number"
                        step="0.1"
                        name="he_glu"
                        value={ data?.he_glu || ""}
                        onChange={changeData}
                    />

                </div>

                {/* 콜레스테롤 */}

                <div>
                    <p>
                        콜레스테롤
                    </p>

                    <input
                        type="number"
                        step="0.1"

                        name="he_chol"

                        value={
                            data?.he_chol || ""
                        }

                        onChange={changeData}
                    />

                </div>

                {/* BMI */}

                <div>

                    <p>
                        BMI
                    </p>

                    <input
                        type="number"
                        step="0.1"
                        name="he_bmi"
                        value={ data?.he_bmi || ""}
                        onChange={changeData}
                    />

                </div>

                {/* 예측값 */}
                <div>
                    <p>
                        예측값
                    </p>

                    <input
                        type="number"
                        step="0.0001"
                        name="predict"
                        value={data?.predict || ""}
                        onChange={changeData}
                    />

                </div>

                {/* 버튼 */}

                <button type="submit">

                    {isUpdate? "수정" : "등록"}

                </button>

                <button
                    type="button"
                    onClick={() => navigate( "/data/list_paging" )}
                    style={{marginLeft : "10px"}}>
                    취소
                </button>

            </form>
        );
    }

export default DataForm;
