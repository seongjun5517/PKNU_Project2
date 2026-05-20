import { Routes,Route } from 'react-router-dom';

import AnalysisPage from '../pages/model/AnalysisPage';
import ResultPage from '../pages/member/ResultPage';

// 건강 분석 입력폼 / 결과 페이지 라우터
function AnalysisRoutes() {
  return (
    <Routes>
      <Route path="/analysis" element={<AnalysisPage />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  );
}

export default AnalysisRoutes;
