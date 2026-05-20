import {Routes, Route } from 'react-router-dom';

import LoginPage from '../pages/member/LoginPage';
import FindPasswordPage from '../pages/member/FindPasswordPage';
import GoogleAuthPage from '../pages/member/GoogleAuthPage';
import SignupPage from '../pages/member/SignupPage';

// 로그인 / 회원가입 / 비밀번호 찾기 관련 라우터
function AuthRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/find-password" element={<FindPasswordPage />} />
      <Route path="/google-auth" element={<GoogleAuthPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default AuthRoutes;
