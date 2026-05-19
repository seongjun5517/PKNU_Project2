import { Route } from 'react-router-dom';

import AnalysisPage from '../pages/AnalysisPage';
import ResultPage from '../pages/ResultPage';

// 건강 분석 입력폼 / 결과 페이지 라우터
function AnalysisRoutes() {
  return (
    <>
      <Route path="/analysis" element={<AnalysisPage />} />
      <Route path="/result" element={<ResultPage />} />
    </>
  );
}

export default AnalysisRoutes;
