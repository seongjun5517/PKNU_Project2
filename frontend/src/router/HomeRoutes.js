import { Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';

// 메인 관련 라우터
function HomeRoutes() {
  return (
    <>
      <Route path="/" element={<HomePage />} />
    </>
  );
}

export default HomeRoutes;
