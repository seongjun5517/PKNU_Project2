import '../../styles/pages/AuthPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // DB/OAuth 연결 전 임시 구글 로그인 처리
  const handleGoogleLogin = () => {
    login({ loginType: 'google' });
    navigate('/');
  };

  return (
    <main className="page auth-page login-google-page">
      <section className="auth-card login-google-card">
        <div className="login-google-left">
          <div className="auth-logo login-auth-logo">
            <span className="logo-icon">♡</span>
            <span>HealthiQ</span>
          </div>

          <h2>구글 계정으로 인증</h2>
          <p>구글 계정으로 간편하게 로그인하세요.</p>

          <button
            type="button"
            className="google-button login-google-button"
            onClick={handleGoogleLogin}
          >
            <span>G</span>
            Google로 계속하기
          </button>

          <p className="auth-bottom-text login-only-bottom">
            계정이 없으신가요? <Link to="/google-auth">회원가입</Link>
          </p>
        </div>

        <div className="login-google-illust-box" aria-hidden="true">
          <div className="big-illust">📋</div>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
