import { Route } from 'react-router-dom';

import LoginPage from '../pages/LoginPage';
import FindPasswordPage from '../pages/FindPasswordPage';
import GoogleAuthPage from '../pages/GoogleAuthPage';
import SignupPage from '../pages/SignupPage';

// 로그인 / 회원가입 / 비밀번호 찾기 관련 라우터
function AuthRoutes() {
  return (
    <>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/find-password" element={<FindPasswordPage />} />
      <Route path="/google-auth" element={<GoogleAuthPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </>
  );
}

export default AuthRoutes;
