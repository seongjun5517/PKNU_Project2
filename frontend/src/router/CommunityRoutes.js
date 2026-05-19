import { Route } from 'react-router-dom';

import CommunityPage from '../pages/CommunityPage';
import CommunityWritePage from '../pages/CommunityWritePage';
import CommunityDetailPage from '../pages/CommunityDetailPage';

// 커뮤니티 목록 / 글쓰기 / 상세 페이지 라우터
function CommunityRoutes() {
  return (
    <>
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/community/write" element={<CommunityWritePage />} />
      <Route path="/community/:postId" element={<CommunityDetailPage />} />
    </>
  );
}

export default CommunityRoutes;
