import './styles/common.css';
import './styles/responsive.css';

import React from 'react';
import {BrowserRouter} from "react-router-dom";

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
    <BrowserRouter>
        {/* 상단 Header */}
        <Navbar />
        {/* Home 페이지*/}
        <HomeRoutes />
        {/* goole 인증 페이지*/}
        <AuthRoutes />
        {/* 데이터 입력 페이지 */}
        <AnalysisRoutes />
        {/* 커뮤니티 페이지 */}
        <CommunityRoutes />
        {/* 마이페이지 */}
        <MyPageRoutes />
        {/* footer 관련 페이지 */}
        <PolicyRoutes />
        <Footer />
    </BrowserRouter>
  );
}

export default App;
