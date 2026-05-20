import React, { useState, useEffect } from 'react';
import '../../styles/pages/ResultPage.css';
import { useLocation} from 'react-router-dom';
import { getDataView } from "../../springApi/modeldataSpringBootApi"; 
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";


function ResultPage() {
  const location = useLocation();
  const result = location.state?.result || { risk: 12.8 };
  // 상태 관리
    const [chartData, setChartData] = useState([]);
    const [selectedData, setSelectedData] = useState(null); 
    const [loading, setLoading] = useState(true);

    const memId = "user4"; 

    // 컴포넌트 마운트 시 데이터 로드
    useEffect(() => {
        setLoading(true);
        
        getDataView(memId)
            .then((response) => {
                const sortedData = response.data.sort((a, b) => {
                    return new Date(a.CHECK_DATE) - new Date(b.CHECK_DATE);
                });
                setChartData(sortedData);
                setLoading(false);
            })
            .catch((error) => {
                console.error("데이터 로딩 실패:", error);
                setLoading(false);
            });
    }, [memId]);

    // 구조적 예외 처리를 추가한 클릭 핸들러
    const handlePointClick = (e) => {
        let targetData = e?.payload;
        
        if (!targetData && e?.activePayload && e.activePayload.length > 0) {
            targetData = e.activePayload[0].payload;
        }

        if (targetData) {
            console.log("🎯 매핑된 상세 데이터:", targetData);
            setSelectedData(targetData);
        }
    };

    // 0 또는 1로 들어오는 진단 값을 '정상/질환' 텍스트로 치환하는 유틸 함수
    const renderDiseaseStatus = (val) => {
        if (val === undefined || val === null) return "-";
        return Number(val) === 1 ? "⚠️ 질환/이상" : "✅ 정상";
    };

  return (
    <main className="page result-page">
      <section className="result-grid">
        {/* 왼쪽 */}
        <div className="card risk-card">
          <h3>오늘의 심근경색 발생 확률</h3>

          <div className="circle-chart">
            <span>{result.risk}%</span>
          </div>
          
          <h3 className="risk-low">위험도 : 낮음</h3>
          <p>※ 위험도는 낮을수록 위험이 낮습니다.</p>
        </div>

        <div className="card result-chart-card">
          <h3>{memId}님 분석 추이 그래프</h3>
          <div style={{ width: "95%", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}></div>

            {loading ? (
                <div>데이터를 불러오는 중입니다...</div>
            ) : chartData.length === 0 ? (
                <div>조회된 데이터가 없습니다. (데이터 배열이 비어있음)</div>
            ) : (
                <>
                    {/* 그래프 영역 */}
                    <div style={{ width: "100%", height: 350, backgroundColor: "#f8f9fa", borderRadius: "8px", padding: "15px", boxSizing: "border-box" }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart 
                                data={chartData} 
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                onClick={handlePointClick} 
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                <XAxis dataKey="CHECK_DATE" tick={{ fontSize: 12 }} />
                                <YAxis domain={[0, 'auto']} tick={{ fontSize: 12 }} />
                                <Tooltip wrapperStyle={{ pointerEvents: "none" }} />
                                <Line
                                    type="monotone"
                                    dataKey="PREDICT"
                                    name="예측 확률"
                                    stroke="#007bff"
                                    strokeWidth={3}
                                    activeDot={{ 
                                        r: 8, 
                                        style: { cursor: "pointer" },
                                        onClick: (e, payload) => handlePointClick(payload)
                                    }}
                                    onClick={handlePointClick} 
                                    style={{ cursor: "pointer" }} 
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <p style={{ fontSize: "13px", color: "#666", marginTop: "5px" }}>📊 그래프 위의 🔵 점을 클릭하시면 하단에 해당 시점의 산출 원본 데이터가 표시됩니다.</p>

                    <hr style={{ margin: "30px 0", border: "0", borderTop: "1px solid #ddd" }} />

                    {/* 하단 상세 데이터 영역 (25개 전체 데이터 표 표시) */}
                    <div style={{ padding: "20px", border: "1px solid #e2e8f0", borderRadius: "8px", backgroundColor: "#fff" }}>
                        <h4 style={{ marginTop: 0, color: "#333", borderBottom: "2px solid #007bff", paddingBottom: "8px" }}>
                            📋 선택된 시점의 예측 결과 및 산출 데이터 (Raw Data 25개 전체 변수)
                        </h4>

                        {selectedData ? (
                            <div>
                                <div style={{ display: "flex", gap: "30px", marginBottom: "20px", backgroundColor: "#ebf8ff", padding: "15px", borderRadius: "6px" }}>
                                    <p style={{ margin: 0 }}><strong>📅 검사 일자 (CHECK_DATE):</strong> {selectedData.CHECK_DATE}</p>
                                    <p style={{ margin: 0 }}><strong>🎯 머신러닝 예측 확률 (PREDICT):</strong> <span style={{color: "#007bff", fontWeight: "bold"}}>{selectedData.PREDICT}</span></p>
                                </div>

                                <p style={{ fontWeight: "bold", marginBottom: "10px" }}>⚙️ 확률 산출 근거 전체 데이터 목록</p>
                                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                                    <thead>
                                        <tr style={{ backgroundColor: "#f1f3f5" }}>
                                            <th style={{ padding: "10px", border: "1px solid #dee2e6", width: "30%" }}>데이터 항목 (변수명)</th>
                                            <th style={{ padding: "10px", border: "1px solid #dee2e6", width: "20%" }}>측정 수치 (값)</th>
                                            <th style={{ padding: "10px", border: "1px solid #dee2e6", width: "30%" }}>데이터 항목 (변수명)</th>
                                            <th style={{ padding: "10px", border: "1px solid #dee2e6", width: "20%" }}>측정 수치 (값)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Row 1 */}
                                        <tr>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6", backgroundColor: "#fafafa" }}>데이터 ID (DATA_ID)</td>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{selectedData.DATA_ID}</td>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6", backgroundColor: "#fafafa" }}>회원 ID (mem_id)</td>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{selectedData.mem_id}</td>
                                        </tr>
                                        {/* Row 2 */}
                                        <tr>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6", backgroundColor: "#fafafa" }}>나이 (AGE)</td>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{selectedData.AGE}세</td>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6", backgroundColor: "#fafafa" }}>성별 (SEX)</td>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{Number(selectedData.SEX) === 1 ? "남성" : "여성"}</td>
                                        </tr>
                                        {/* Row 3 */}
                                        <tr>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6", backgroundColor: "#fafafa" }}>공복혈당 (HE_GLU)</td>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{selectedData.HE_GLU} mg/dL</td>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6", backgroundColor: "#fafafa" }}>당화혈색소 (HE_HBA1C)</td>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{selectedData.HE_HBA1C} %</td>
                                        </tr>
                                        {/* Row 4 */}
                                        <tr>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6", backgroundColor: "#fafafa" }}>총콜레스테롤 (HE_CHOL)</td>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{selectedData.HE_CHOL} mg/dL</td>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6", backgroundColor: "#fafafa" }}>중성지방 (HE_TG)</td>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{selectedData.HE_TG} mg/dL</td>
                                        </tr>
                                        {/* Row 5 */}
                                        <tr>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6", backgroundColor: "#fafafa" }}>비만도 (HE_BMI)</td>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{selectedData.HE_BMI}</td>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6", backgroundColor: "#fafafa" }}>허리둘레 (HE_WC)</td>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{selectedData.HE_WC} cm</td>
                                        </tr>
                                        {/* Row 6 */}
                                        <tr>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6", backgroundColor: "#fafafa" }}>수축기혈압 (HE_HP)</td>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{selectedData.HE_HP} mmHg</td>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6", backgroundColor: "#fafafa" }}>유산소 운동 실천 (PA_AEROBIC)</td>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{selectedData.PA_AEROBIC} 분</td>
                                        </tr>
                                        {/* Row 7 */}
                                        <tr>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6", backgroundColor: "#fafafa" }}>소득 수준 (INCM)</td>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{selectedData.INCM} 분위</td>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6", backgroundColor: "#fafafa" }}>교육 수준 (EDU)</td>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{selectedData.EDU} 단계</td>
                                        </tr>
                                        {/* Row 8 */}
                                        <tr>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6", backgroundColor: "#fafafa" }}>당뇨병 의사진단 여부 (DI1_DG)</td>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{renderDiseaseStatus(selectedData.DI1_DG)}</td>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6", backgroundColor: "#fafafa" }}>고혈압 의사진단 여부 (DI2_DG)</td>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{renderDiseaseStatus(selectedData.DI2_DG)}</td>
                                        </tr>
                                        {/* Row 9 */}
                                        <tr>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6", backgroundColor: "#fafafa" }}>이상지질혈증 의사진단 (DI3_DG)</td>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{renderDiseaseStatus(selectedData.DI3_DG)}</td>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6", backgroundColor: "#fafafa" }}>뇌졸중 의사진단 여부 (DE1_DG)</td>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{renderDiseaseStatus(selectedData.DE1_DG)}</td>
                                        </tr>
                                        {/* Row 10 */}
                                        <tr>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6", backgroundColor: "#fafafa" }}>주간 평균 수면 시간 (BE8_1)</td>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{selectedData.BE8_1} 시간</td>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6", backgroundColor: "#fafafa" }}>일생동안의 흡연 상태 (BS1_1)</td>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{selectedData.BS1_1} (코드식)</td>
                                        </tr>
                                        {/* Row 11 */}
                                        <tr>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6", backgroundColor: "#fafafa" }}>1년간 음주 빈도 (BD1_11)</td>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{selectedData.BD1_11} (코드식)</td>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6", backgroundColor: "#fafafa" }}>한번에 마시는 음주량 (BD2_1)</td>
                                            <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{selectedData.BD2_1} (코드식)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p style={{ color: "#999", fontStyle: "italic", textAlign: "center", padding: "20px 0" }}>
                                💡 위의 그래프에서 분석 결과인 파란색 점을 클릭하면 이 자리에 세부 원본 데이터 표가 나타납니다.
                            </p>
                        )}
                    </div>
                </>
            )}
        </div>
        </div>

        <div className="card"><h3>주요 위험 요인</h3><ul className="dot-list"><li>운동 부족</li><li>스트레스 관리 부족</li><li>수면 시간 부족</li></ul></div>
        <div className="card"><h3>위험도 해석</h3><p>현재 위험도는 낮은 편입니다. 건강한 생활습관을 유지하여 더 좋은 결과를 만들어가세요.</p></div>

        <div className="card recommend-card">
          <h3>추천 음식</h3>
          <div className="icon-list"><div>🐟<span>연어</span></div><div>🥜<span>견과류</span></div><div>🫒<span>올리브 오일</span></div><div>🥗<span>채소</span></div><div>🍓<span>베리류</span></div></div>
        </div>

        <div className="card recommend-card">
          <h3>추천 습관</h3>
          <div className="icon-list"><div>🏃<span>규칙적인 운동</span></div><div>🚭<span>금연하기</span></div><div>🚰<span>체중 관리</span></div><div>🌙<span>충분한 수면</span></div><div>🧘<span>스트레스 관리</span></div></div>
        </div>
      </section>
    </main>
  );
}

export default ResultPage;
