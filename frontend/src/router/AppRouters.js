import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

import HomeRoutes from './HomeRoutes';
import AuthRoutes from './AuthRoutes';
import AnalysisRoutes from './AnalysisRoutes';
import CommunityRoutes from './CommunityRoutes';
import MyPageRoutes from './MyPageRoutes';
import PolicyRoutes from './PolicyRoutes';

function AppRouters() {
  return (
    <BrowserRouter>
      {/* 모든 페이지 공통 상단 메뉴 */}
      <Navbar />

      {/* Footer 위치가 페이지마다 달라지지 않도록 본문 영역을 공통 래퍼로 감쌈 */}
      <div className="main-content">
        <Routes>
          {/* 라우터를 기능별 파일로 분리 */}
          {HomeRoutes()}
          {AuthRoutes()}
          {AnalysisRoutes()}
          {CommunityRoutes()}
          {MyPageRoutes()}
          {PolicyRoutes()}

          {/* 없는 주소는 메인페이지로 이동 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* 모든 페이지 공통 하단 */}
      <Footer />
    </BrowserRouter>
  );
}

export default AppRouters;
