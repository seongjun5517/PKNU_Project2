import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loginData, setLoginData] = useState({
    userId: '',
    userPw: '',
    saveId: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setLoginData({
      ...loginData,
      [name]: type === 'checkbox' ? checked : value
    });

    // 입력하면 해당 에러 제거
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateLogin = () => {
    const nextErrors = {};

    if (!loginData.userId.trim()) {
      nextErrors.userId = '아이디를 입력해주세요.';
    }

    if (!loginData.userPw.trim()) {
      nextErrors.userPw = '비밀번호를 입력해주세요.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // 아이디/비밀번호 중 하나라도 비어 있으면 페이지 이동 막기
    if (!validateLogin()) return;

    // DB 연결 전 임시 로그인 처리
    login(loginData);
    navigate('/');
  };

  return (
    <main className="page auth-page">
      <section className="auth-card wide">
        <div className="auth-form-area">
          <h2>로그인</h2>
          <p>계정에 로그인하여 서비스를 이용하세요.</p>

          <form onSubmit={handleLogin} noValidate>
            <label>아이디</label>
            <input
              name="userId"
              value={loginData.userId}
              onChange={handleChange}
              placeholder="아이디를 입력하세요"
              required
            />
            {errors.userId && <p className="error-text">{errors.userId}</p>}

            <label>비밀번호</label>
            <input
              type="password"
              name="userPw"
              value={loginData.userPw}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
              required
            />
            {errors.userPw && <p className="error-text">{errors.userPw}</p>}

            <div className="login-option-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="saveId"
                  checked={loginData.saveId}
                  onChange={handleChange}
                />
                <span>아이디 저장</span>
              </label>

              <button
                type="button"
                className="text-button"
                onClick={() => navigate('/find-password')}
              >
                비밀번호 찾기
              </button>
            </div>

            <button type="submit" className="btn-primary full">로그인</button>
          </form>

          <p className="auth-bottom-text">
            계정이 없으신가요? <Link to="/google-auth">회원가입</Link>
          </p>
        </div>

        <div className="auth-illust-area">
          <div className="big-illust">🔐</div>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
