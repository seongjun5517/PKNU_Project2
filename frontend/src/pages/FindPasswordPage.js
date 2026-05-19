import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function FindPasswordPage() {
  const navigate = useNavigate();

  const [findData, setFindData] = useState({
    userId: '',
    phone: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFindData({ ...findData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!findData.userId.trim() || !findData.phone.trim()) {
      setMessage('아이디와 전화번호를 모두 입력해주세요.');
      return;
    }

    // DB 연결 전 임시 안내 메시지
    setMessage('입력한 정보가 확인되었습니다. 임시 비밀번호 발급 기능은 DB 연결 후 구현하면 됩니다.');
  };

  return (
    <main className="page auth-page">
      <section className="auth-card single-auth-card">
        <h2>비밀번호 찾기</h2>
        <p>가입한 아이디와 전화번호를 입력해주세요.</p>

        <form onSubmit={handleSubmit} className="single-auth-form">
          <label>아이디</label>
          <input
            name="userId"
            value={findData.userId}
            onChange={handleChange}
            placeholder="아이디를 입력하세요"
            required
          />

          <label>전화번호</label>
          <input
            name="phone"
            value={findData.phone}
            onChange={handleChange}
            placeholder="010-0000-0000"
            required
          />

          {message && <p className="info-message">{message}</p>}

          <button type="submit" className="btn-primary full">비밀번호 찾기</button>
          <button type="button" className="btn-outline full-outline" onClick={() => navigate('/login')}>
            로그인으로 돌아가기
          </button>
        </form>
      </section>
    </main>
  );
}

export default FindPasswordPage;
