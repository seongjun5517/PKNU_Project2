import { Route } from 'react-router-dom';

import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import TermsPage from '../pages/TermsPage';
import CustomerCenterPage from '../pages/CustomerCenterPage';

// Footer 하단 링크 페이지 라우터
function PolicyRoutes() {
  return (
    <>
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/customer-center" element={<CustomerCenterPage />} />
    </>
  );
}

export default PolicyRoutes;
