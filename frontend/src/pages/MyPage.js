import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function MyPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // 마이페이지 왼쪽 버튼 클릭 상태 관리
  const [activeMenu, setActiveMenu] = useState('내 정보');

  const records = [
    { id: 1, date: '2024.05.26', risk: '12.8% (낮음)' },
    { id: 2, date: '2024.05.19', risk: '18.6% (낮음)' },
    { id: 3, date: '2024.05.12', risk: '24.3% (보통)' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // 상세보기 버튼 클릭 시 현재는 결과 페이지로 이동
  // 나중에 DB 연결 후 record.id로 상세 조회 API 연결 가능
  const handleRecordDetail = () => {
    navigate('/result');
  };

  return (
    <main className="page mypage">
      <section className="mypage-layout">
        <aside className="card mypage-sidebar">
          <button
            className={activeMenu === '내 정보' ? 'active' : ''}
            onClick={() => setActiveMenu('내 정보')}
          >
            내 정보
          </button>

          <button
            className={activeMenu === '분석 기록' ? 'active' : ''}
            onClick={() => setActiveMenu('분석 기록')}
          >
            분석 기록
          </button>

          <button
            className={activeMenu === '목표 관리' ? 'active' : ''}
            onClick={() => setActiveMenu('목표 관리')}
          >
            목표 관리
          </button>

          <button
            className={activeMenu === '알림 설정' ? 'active' : ''}
            onClick={() => setActiveMenu('알림 설정')}
          >
            알림 설정
          </button>

          <button
            className={activeMenu === '회원 정보' ? 'active' : ''}
            onClick={() => setActiveMenu('회원 정보')}
          >
            회원 정보
          </button>

          <button onClick={handleLogout}>로그아웃</button>
        </aside>

        <section className="mypage-content">
          {activeMenu === '내 정보' && (
            <>
              <div className="card profile-card">
                <h3>내 정보</h3>

                <div className="profile-box">
                  <div className="profile-img">👨‍💻</div>

                  <div>
                    <h2>{user?.name || '홍길동'}</h2>
                    <p>{user?.email || 'hong@example.com'}</p>
                    <p>가입일 2024.05.01</p>

                    <button
                      className="btn-outline mint"
                      onClick={() => setActiveMenu('회원 정보')}
                    >
                      정보 수정
                    </button>
                  </div>
                </div>
              </div>

              <div className="card record-card">
                <h3>최근 분석 기록</h3>

                {records.map((record) => (
                  <div className="record-row" key={record.id}>
                    <span>{record.date}</span>
                    <strong>{record.risk}</strong>
                    <button className="btn-outline mint" onClick={handleRecordDetail}>
                      상세보기
                    </button>
                  </div>
                ))}
              </div>

              <GoalCard />
            </>
          )}

          {activeMenu === '분석 기록' && (
            <div className="card mypage-full-card">
              <h3>분석 기록</h3>
              <p>지금까지 진행한 심근경색 발생 확률 예측 기록입니다.</p>

              {records.map((record) => (
                <div className="record-row large" key={record.id}>
                  <span>{record.date}</span>
                  <strong>{record.risk}</strong>
                  <button className="btn-outline mint" onClick={handleRecordDetail}>
                    상세보기
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeMenu === '목표 관리' && <GoalCard />}

          {activeMenu === '알림 설정' && (
            <div className="card mypage-full-card">
              <h3>알림 설정</h3>
              <p>건강 관리 알림을 설정할 수 있습니다.</p>

              <div className="setting-list">
                <label><input type="checkbox" defaultChecked /> 매일 물 섭취 알림 받기</label>
                <label><input type="checkbox" defaultChecked /> 주간 운동 목표 알림 받기</label>
                <label><input type="checkbox" /> 분석 결과 업데이트 알림 받기</label>
              </div>

              <button className="btn-primary small" onClick={() => alert('알림 설정이 저장되었습니다.')}>저장하기</button>
            </div>
          )}

          {activeMenu === '회원 정보' && (
            <div className="card mypage-full-card">
              <h3>회원 정보 수정</h3>
              <p>DB 연결 전이므로 화면 동작만 처리됩니다.</p>

              <form className="mypage-edit-form" onSubmit={(e) => e.preventDefault()}>
                <label>아이디</label>
                <input defaultValue="testUser" />

                <label>이름</label>
                <input defaultValue={user?.name || '홍길동'} />

                <label>전화번호</label>
                <input defaultValue="010-1234-5678" />

                <button className="btn-primary small" onClick={() => alert('회원 정보가 저장되었습니다.')}>수정 완료</button>
              </form>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

function GoalCard() {
  return (
    <div className="card goal-card">
      <h3>나의 목표</h3>

      <div className="goal-grid">
        <div>
          <p>주간 운동 목표</p>
          <strong>4</strong>
          <span>/5회</span>
          <div className="progress"><div style={{ width: '80%' }}></div></div>
        </div>

        <div>
          <p>일간 물 섭취 목표</p>
          <strong>1.6</strong>
          <span>/2L</span>
          <div className="progress"><div style={{ width: '80%' }}></div></div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
