import '../../styles/layout/Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <span>© 2024 HealthiQ. All rights reserved.</span>

      {/* 하단 링크: 클릭하면 각각 안내 페이지로 이동 */}
      <div className="footer-links">
        <Link to="/privacy-policy">개인정보처리방침</Link>
        <Link to="/terms">이용약관</Link>
        <Link to="/customer-center">고객센터</Link>
      </div>
    </footer>
  );
}

export default Footer;
