import {Routes, Route } from 'react-router-dom';

import LoginPage from '../pages/member/LoginPage';
import GoogleAuthPage from '../pages/member/GoogleAuthPage';
import SignupPage from '../pages/member/SignupPage';
import MemberInsertPage from '../pages/member/MemberInsertPage';

// 로그인 / 회원가입 / 비밀번호 찾기 관련 라우터
function AuthRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/google-auth" element={<GoogleAuthPage />} />
      <Route path="/signup" element={<MemberInsertPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default AuthRoutes;
