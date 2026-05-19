import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import FindPasswordPage from '../pages/FindPasswordPage';
import GoogleAuthPage from '../pages/GoogleAuthPage';
import SignupPage from '../pages/SignupPage';
import AnalysisPage from '../pages/AnalysisPage';
import ResultPage from '../pages/ResultPage';
import CommunityPage from '../pages/CommunityPage';
import CommunityWritePage from '../pages/CommunityWritePage';
import CommunityDetailPage from '../pages/CommunityDetailPage';
import MyPage from '../pages/MyPage';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import TermsPage from '../pages/TermsPage';
import CustomerCenterPage from '../pages/CustomerCenterPage';

// 로그인 안 된 사용자가 마이페이지 접근하면 로그인 페이지로 이동
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function AppRouters() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/find-password" element={<FindPasswordPage />} />
        <Route path="/google-auth" element={<GoogleAuthPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/result" element={<ResultPage />} />

        <Route path="/community" element={<CommunityPage />} />
        <Route path="/community/write" element={<CommunityWritePage />} />
        <Route path="/community/:postId" element={<CommunityDetailPage />} />

        {/* Footer 링크 페이지 */}
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/customer-center" element={<CustomerCenterPage />} />

        <Route
          path="/mypage"
          element={
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default AppRouters;
