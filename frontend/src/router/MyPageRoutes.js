import {Routes, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import MyPage from '../pages/member/MyPage';

// 마이페이지는 로그인한 사용자만 접근 가능
function MyPageRoutes() {
  return (
    <Routes>
      <Route path="/mypage" element={<PrivateRoute><MyPage /></PrivateRoute>}/>
    </Routes>
  );
}

export default MyPageRoutes;
