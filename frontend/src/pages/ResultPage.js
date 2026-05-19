import { useLocation } from 'react-router-dom';

function ResultPage() {
  const location = useLocation();
  const result = location.state?.result || { risk: 12.8, score: 86 };

  return (
    <main className="page result-page">
      <section className="result-grid">
        <div className="card risk-card">
          <h3>오늘의 심근경색 발생 확률</h3>
          <div className="circle-chart"><span>{result.risk}%</span></div>
          <h3 className="risk-low">위험도 : 낮음</h3>
          <p>※ 위험도는 낮을수록 위험이 낮습니다.</p>
        </div>

        <div className="card result-chart-card">
          <h3>분석 추이 그래프</h3>
          <div className="simple-chart result">
            <span className="chart-value">{result.risk}%</span>
            <div className="chart-labels">
              <span>4/20</span><span>4/21</span><span>4/22</span><span>4/23</span><span>4/24</span><span>4/25</span><span>오늘</span>
            </div>
          </div>
        </div>

        <div className="card score-card">
          <h3>종합 점수</h3>
          <strong>{result.score}</strong><span>/100</span>
          <div className="progress"><div style={{ width: `${result.score}%` }}></div></div>
          <p>매우 좋아요! 건강 관리 습관이 잘 유지되고 있어요.</p>
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
