import React from 'react';

import { Routes,Route } from 'react-router-dom';

import CommunityPage from '../pages/community/CommunityPage';
import CommunityWritePage from '../pages/community/CommunityWritePage';
import CommunityDetailPage from '../pages/community/CommunityDetailPage';

// 커뮤니티 목록 / 글쓰기 / 상세 페이지 라우터
function CommunityRoutes() {
  return (
    <Routes>
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/community/write" element={<CommunityWritePage />} />
      <Route path="/community/:postId" element={<CommunityDetailPage />} />
    </Routes>
  );
}

export default CommunityRoutes;
