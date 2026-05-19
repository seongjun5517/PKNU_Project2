import '../../styles/layout/Navbar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo">
          <span className="logo-icon">♡</span>
          <span>HealthiQ</span>
        </Link>

        <nav className="menu">
          <Link className={isActive('/') ? 'active' : ''} to="/">홈</Link>
          <Link className={isActive('/analysis') || isActive('/result') ? 'active' : ''} to="/analysis">분석</Link>
          <Link className={isActive('/community') ? 'active' : ''} to="/community">커뮤니티</Link>
          <Link className={isActive('/mypage') ? 'active' : ''} to="/mypage">마이페이지</Link>
        </nav>

        <div className="auth-buttons">
          {user ? (
            <>
              <span className="user-name">hello.user님</span>
              <button className="btn-outline" onClick={handleLogout}>로그아웃</button>
              <button className="btn-outline mint" onClick={() => navigate('/mypage')}>마이페이지</button>
            </>
          ) : (
            <>
              <button className="btn-outline" onClick={() => navigate('/login')}>로그인</button>
              <button className="btn-primary small" onClick={() => navigate('/google-auth')}>회원가입</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
