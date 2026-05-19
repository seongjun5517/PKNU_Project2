import './styles/common.css';
import './styles/responsive.css';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import HomeRoutes from './router/HomeRoutes';
import AuthRoutes from './router/AuthRoutes';
import AnalysisRoutes from './router/AnalysisRoutes';
import CommunityRoutes from './router/CommunityRoutes';
import MyPageRoutes from './router/MyPageRoutes';
import PolicyRoutes from './router/PolicyRoutes';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        {/* 상단 Header */}
        <Navbar />

        {/* 가운데 페이지 영역 */}
        <main className="main-content">
          {/* Home 페이지 */}
          <HomeRoutes />

          {/* Google 인증 / 로그인 / 회원가입 페이지 */}
          <AuthRoutes />

          {/* 데이터 입력 / 분석 결과 페이지 */}
          <AnalysisRoutes />

          {/* 커뮤니티 페이지 */}
          <CommunityRoutes />

          {/* 마이페이지 */}
          <MyPageRoutes />

          {/* Footer 관련 페이지 */}
          <PolicyRoutes />
        </main>

        {/* 하단 Footer */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;