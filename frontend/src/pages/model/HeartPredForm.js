import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getHeartPredict } from "../../flaskApi/predict";
import InputField from "../../components/InputField";
import RadioField from "../../components/RadioField";

const HeartPredForm = () => {
    const [features, setFeatures] = useState([
                0,    // 0: 고혈압 의사진단 (없음 0으로 세팅)
                0,    // 1: 이상지질혈증 의사진단 (없음)
                0,    // 2: 당뇨병 의사진단 (없음)
                0,    // 3: 뇌졸중 의사진단 (없음)
                2,    // 4: 고혈압 유병여부 (2: 고혈압 전단계)
                115.0, // 5: 공복 혈당
                6.1,  // 6: 당화혈색소
                220.0, // 7: 총콜레스테롤
                180.0, // 8: 중성지방
                25.5, // 9: 체질량지수 BMI
                88.0, // 10: 허리둘레
                2,    // 11: 평생 담배 흡연 여부 (5갑 미만 혹은 과거 흡연)
                3,    // 12: 1년간 음주 빈도
                2,    // 13: 한번에 마시는 음주량
                8,    // 14: 하루에 앉아서 보내는 시간
                2,    // 15: 유산소 신체활동 실천율 (실천함)
                1,    // 16: 성별 (남자)
                55,   // 17: 나이
                3,    // 18: 최종 학력
                2     // 19: 소득 분위수
            ]);
    
    const navigate = useNavigate();

    const handleChange = (index, value) => {
        const update = [...features];
        update[index] = parseFloat(value);
        setFeatures(update);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // const loginId = seesionStorage.getItem("mem_id");
        const loginId = "user5";

        const requestData = {
            features : features,
            mem_id : loginId
        }

        getHeartPredict(requestData)
            .then((res) => {
                alert("예측 성공 : " + res.data.probability);
                navigate("/predict/result", { state: { result: res.data.probability } });
            })
            .catch((err) => {
                console.error("예측중 오류 발생 : ", err);
            });
    };

    return (
        <div>
            <h3>심근경색 발병 확률 구하기</h3>
            <hr/>

            <form onSubmit={handleSubmit}>
                {/* di1_dg ~ di3_dg 컴포넌트 필드 */}
                <RadioField label={"고혈압 의사진단여부 : "} name="di1_dg" value={features[0]} onChange={(e)=> handleChange(0, e.target.value)} />
                <RadioField label={"이상지질혈증 의사진단여부 : "} name="di2_dg" value={features[1]} onChange={(e)=> handleChange(1, e.target.value)} />
                <RadioField label={"당뇨병 의사진단여부 : "} name="de1_dg" value={features[2]} onChange={(e)=> handleChange(2, e.target.value)} />
                <RadioField label={"뇌졸중 의사진단여부 : "} name="di3_dg" value={features[3]} onChange={(e)=> handleChange(3, e.target.value)} />
                
                {/* he_hp 입력 필드 (name 통일 및 checked 괄호 수정) */}
                <div>
                    <label>고혈압 유병여부 : </label>
                    <label>
                        <input  type="radio"
                                name="he_hp" // 💡 이름을 하나로 통일
                                value="1"
                                checked={Number(features[4]) === 1} // 💡 괄호 위치 수정
                                onChange={(e) => handleChange(4, e.target.value)}
                                required />
                        정상
                    </label>
                    <label>
                        <input  type="radio"
                                name="he_hp"
                                value="2"
                                checked={Number(features[4]) === 2}
                                onChange={(e) => handleChange(4, e.target.value)}
                                required />
                        고혈압전단계
                    </label>
                    <label>
                        <input  type="radio"
                                name="he_hp"
                                value="3"
                                checked={Number(features[4]) === 3}
                                onChange={(e) => handleChange(4, e.target.value)}
                                required />
                        고혈압
                    </label>
                </div>

                {/* 수치형 입력 필드들 */}
                <InputField label={"공복 혈당 : "} value={features[5]} onChange={(e) => handleChange(5, e.target.value)} />
                <InputField label={"당화혈 색소 : "} value={features[6]} onChange={(e) => handleChange(6, e.target.value)} />
                <InputField label={"총콜레스테롤 : "} value={features[7]} onChange={(e) => handleChange(7, e.target.value)} />
                <InputField label={"중성지방 : "} value={features[8]} onChange={(e) => handleChange(8, e.target.value)} />
                <InputField label={"체질량지수(BMI) : "} value={features[9]} onChange={(e) => handleChange(9, e.target.value)} />
                <InputField label={"허리둘레 : "} value={features[10]} onChange={(e) => handleChange(10, e.target.value)} />

                {/* bs1_1 입력 필드 (name 통일 및 checked 괄호 수정) */}
                <div>
                    <label>평생 일반담배 흡연 여부 : </label>
                    <label>
                        <input  type="radio"
                                name="bs1_1"
                                value="1"
                                checked={Number(features[11]) === 1}
                                onChange={(e) => handleChange(11, e.target.value)}
                                required />
                        5갑(100개비) 미만
                    </label>
                    <label>
                        <input  type="radio"
                                name="bs1_1"
                                value="2"
                                checked={Number(features[11]) === 2}
                                onChange={(e) => handleChange(11, e.target.value)}
                                required />
                        5갑(100개비) 이상
                    </label>
                    <label>
                        <input  type="radio"
                                name="bs1_1"
                                value="3"
                                checked={Number(features[11]) === 3}
                                onChange={(e) => handleChange(11, e.target.value)}
                                required />
                        피운적 없음
                    </label>
                </div>

                {/* bd1_11 입력 필드 */}
                <div>
                    <label>1년간 음주 빈도 : </label>
                    <label>
                        <input  type="radio"
                                name="bd1_11"
                                value="1"
                                checked={Number(features[12]) === 1}
                                onChange={(e) => handleChange(12, e.target.value)}
                                required />
                        최근 1년간 전혀 마시지 않았다.
                    </label>
                    <label>
                        <input  type="radio"
                                name="bd1_11"
                                value="2"
                                checked={Number(features[12]) === 2}
                                onChange={(e) => handleChange(12, e.target.value)}
                                required />
                        월 1회미만
                    </label>
                    <label>
                        <input  type="radio"
                                name="bd1_11"
                                value="3"
                                checked={Number(features[12]) === 3}
                                onChange={(e) => handleChange(12, e.target.value)}
                                required />
                        월 1회정도
                    </label>
                    <label>
                        <input  type="radio"
                                name="bd1_11"
                                value="4"
                                checked={Number(features[12]) === 4}
                                onChange={(e) => handleChange(12, e.target.value)}
                                required />
                        주 2~3회정도
                    </label>
                    <label>
                        <input  type="radio"
                                name="bd1_11"
                                value="5"
                                checked={Number(features[12]) === 5}
                                onChange={(e) => handleChange(12, e.target.value)}
                                required />
                        주 4회정도
                    </label>
                </div>

                {/* bd2_1 입력 필드 */}
                <div>
                    <label>한번에 마시는 음주량 : </label>
                    <label>
                        <input  type="radio"
                                name="bd2_1"
                                value="1"
                                checked={Number(features[13]) === 1}
                                onChange={(e) => handleChange(13, e.target.value)}
                                required />
                        1~2잔
                    </label>
                    <label>
                        <input  type="radio"
                                name="bd2_1"
                                value="2"
                                checked={Number(features[13]) === 2}
                                onChange={(e) => handleChange(13, e.target.value)}
                                required />
                        3~4잔
                    </label>
                    <label>
                        <input  type="radio"
                                name="bd2_1"
                                value="3"
                                checked={Number(features[13]) === 3}
                                onChange={(e) => handleChange(13, e.target.value)}
                                required />
                        5~6잔
                    </label>
                    <label>
                        <input  type="radio"
                                name="bd2_1"
                                value="4"
                                checked={Number(features[13]) === 4}
                                onChange={(e) => handleChange(13, e.target.value)}
                                required />
                        7~9잔
                    </label>
                    <label>
                        <input  type="radio"
                                name="bd2_1"
                                value="5"
                                checked={Number(features[13]) === 5}
                                onChange={(e) => handleChange(13, e.target.value)}
                                required />
                        10잔 이상
                    </label>
                </div>

                <InputField label={"하루에 앉아서 보내는 시간 : "} value={features[14]} onChange={(e) => handleChange(14, e.target.value)} />

                {/* pa_aerobic 입력 필드 */}
                <div>
                    <label>유산소 신체 활동 실천율 : </label>
                    <label>
                        <input  type="radio"
                                name="pa_aerobic"
                                value="1"
                                checked={Number(features[15]) === 1}
                                onChange={(e) => handleChange(15, e.target.value)}
                                required />
                        실천하지 않음
                    </label>
                    <label>
                        <input  type="radio"
                                name="pa_aerobic"
                                value="2"
                                checked={Number(features[15]) === 2}
                                onChange={(e) => handleChange(15, e.target.value)}
                                required />
                        실천함
                    </label>
                </div>

                {/* sex 입력 필드 */}
                <div>
                    <label>성별 : </label>
                    <label>
                        <input  type="radio"
                                name="sex"
                                value="1"
                                checked={Number(features[16]) === 1}
                                onChange={(e) => handleChange(16, e.target.value)}
                                required />
                        남자
                    </label>
                    <label>
                        <input  type="radio"
                                name="sex"
                                value="2"
                                checked={Number(features[16]) === 2}
                                onChange={(e) => handleChange(16, e.target.value)}
                                required />
                        여자
                    </label>
                </div>

                <InputField label={"나이 : "} value={features[17]} onChange={(e) => handleChange(17, e.target.value)} />

                {/* edu 입력 필드 */}
                <div>
                    <label>최종 학력 : </label>
                    <label>
                        <input  type="radio"
                                name="edu"
                                value="1"
                                checked={Number(features[18]) === 1}
                                onChange={(e) => handleChange(18, e.target.value)}
                                required />
                        초졸 이하
                    </label>
                    <label>
                        <input  type="radio"
                                name="edu"
                                value="2"
                                checked={Number(features[18]) === 2}
                                onChange={(e) => handleChange(18, e.target.value)}
                                required />
                        중졸
                    </label>
                    <label>
                        <input  type="radio"
                                name="edu"
                                value="3"
                                checked={Number(features[18]) === 3}
                                onChange={(e) => handleChange(18, e.target.value)}
                                required />
                        고졸
                    </label>
                    <label>
                        <input  type="radio"
                                name="edu"
                                value="4"
                                checked={Number(features[18]) === 4}
                                onChange={(e) => handleChange(18, e.target.value)}
                                required />
                        대졸 이상
                    </label>
                </div>

                {/* incm 입력 필드 */}
                <div>
                    <label>소득 분위수 : </label>
                    <label>
                        <input  type="radio"
                                name="incm"
                                value="1"
                                checked={Number(features[19]) === 1}
                                onChange={(e) => handleChange(19, e.target.value)}
                                required />
                        하
                    </label>
                    <label>
                        <input  type="radio"
                                name="incm"
                                value="2"
                                checked={Number(features[19]) === 2}
                                onChange={(e) => handleChange(19, e.target.value)}
                                required />
                        중하
                    </label>
                    <label>
                        <input  type="radio"
                                name="incm"
                                value="3"
                                checked={Number(features[19]) === 3}
                                onChange={(e) => handleChange(19, e.target.value)}
                                required />
                        중상
                    </label>
                    <label>
                        <input  type="radio"
                                name="incm"
                                value="4"
                                checked={Number(features[19]) === 4}
                                onChange={(e) => handleChange(19, e.target.value)}
                                required />
                        상
                    </label>
                </div>

                {/* 버튼 세트 */}
                <div style={{ marginTop: "20px" }}>
                    <button type="submit">예측하기</button>
                    <button type="button" onClick={() => navigate(-1)} style={{ marginLeft: "10px" }}>
                        Home 바로가기
                    </button>
                </div>
            </form>
        </div>
    );
};

export default HeartPredForm;