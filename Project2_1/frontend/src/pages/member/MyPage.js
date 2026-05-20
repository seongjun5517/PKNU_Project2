import '../../styles/pages/MyPage.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../user/AuthContext';

// MyPage.js 상단 import에 추가
import { getDataView } from '../../springApi/modeldataSpringBootApi';
import { getMemberView, setMemberUpdate } from '../../springApi/memberSpringBootApi'; 

function MyPage() {
    const navigate = useNavigate();
    const { user, login } = useAuth() || {}; // [수정] 수정 완료 후 전역 세션 갱신을 위해 login 함수 구독

    // 마이페이지 왼쪽 버튼 클릭 상태 관리
    const [activeMenu, setActiveMenu] = useState('내 정보');

    // [추가] 회원 정보 수정 폼을 위한 독립 상태 변수 선언
    const [editForm, setEditForm] = useState({
        mem_id: "",
        mem_name: "",
        mem_phone: "",
        mem_nickname: ""
    });

    // 정적 가상 데이터 (분석 기록용)
    const [records, setRecords] = useState([]);
    const [recordLoading, setRecordLoading] = useState(true);


    useEffect(() => {
    //     if (!user) return;

    //     const memId = user.mem_id || user.id;  // ✅ ID로 수정
    //     getDataView(memId)
    //         .then((response) => {
    //             if (!response?.data || response.data.length === 0) {
    //                 setRecords([]);
    //                 return;
    //             }
    //             const sorted = [...response.data]
    //                 .sort((a, b) => new Date(b.CHECK_DATE) - new Date(a.CHECK_DATE))
    //                 .slice(0, 3);
    //             setRecords(sorted);
    //         })
    //         .catch(() => setRecords([]))
    //         .finally(() => setRecordLoading(false));
    // }, [user]);
    // if (!user) return;

    const mem_id = user.mem_id || user.id;

    // 로컬스토리지 기본값 먼저 세팅 (빠른 렌더링)
    setEditForm({
        mem_id: mem_id || "",
        mem_name: user.mem_name || user.name || "",
        mem_phone: "",
        mem_nickname: ""
    });

    // DB에서 전화번호 + 닉네임 조회
    getMemberView(mem_id)
        .then((res) => {
            const data = res.data;
            setEditForm((prev) => ({
                ...prev,
                mem_phone: data.mem_phone || "",
                mem_nickname: data.mem_nickname || ""
            }));
        })
        .catch((err) => {
            console.error("❌ 회원 상세 조회 실패:", err);
        });

}, [user]);

    const handleRecordDetail = () => {
        navigate('/result');
    };

    // [추가] 입력 박스 값 변경 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // [추가] 백엔드 API 송신 및 전역 상태 동기화 처리 핸들러
    const handleUpdateSubmit = (e) => {
        e.preventDefault();

        // 비즈니스 유효성 검증
        if (!editForm.mem_name.trim()) {
            alert("이름은 필수 입력 항목입니다.");
            return;
        }

        console.log("📤 [회원정보수정] 백엔드 전송 데이터:", editForm);

        setMemberUpdate(editForm)
            .then((res) => {
                // [핵심 교정] 화면 전체의 네비게이션 바 및 프로필 뷰 동기화를 위한 객체 재정비
                const updatedSessionUser = {
                    // id: editForm.mem_id,
                    // name: editForm.mem_name,
                    // phone: editForm.mem_phone,
                    // nickname: editForm.mem_nickname,
                    
                    // 호환성을 위한 원본 데이터 맵 유지
                    mem_id: editForm.mem_id,
                    mem_name: editForm.mem_name,
                    mem_phone: editForm.mem_phone,
                    mem_nickname: editForm.mem_nickname
                };

                // 로컬 스토리지 데이터 및 AuthContext 내부 State 동시 갱신 
                login(updatedSessionUser);

                alert("회원 정보 수정이 정상적으로 완료되었습니다.");
                setActiveMenu('내 정보'); // 수정 완료 후 대시보드로 복귀
            })
            .catch((err) => {
                console.error("❌ [회원정보수정] API 통신 실패:", err);
                if (err.response) {
                    alert(`서버 오류 (코드: ${err.response.status}): 수정에 실패했습니다.`);
                } else {
                    alert("네트워크 물리 오류가 발생했습니다. 서버 상태를 확인하세요.");
                }
            });
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
                className = {activeMenu === '내 게시글 조회' ? 'active' : ''}
                onClick={() => {setActiveMenu('내 게시글 조회');
                window.location.href =`/community?mem_id=${user.mem_id}`;}}>

            내 게시글 조회

          </button>

          <button 
            className={activeMenu === '회원 정보' ? 'active' : ''}
            onClick={() => setActiveMenu('회원 정보')}>
                
            회원 정보
          </button>

            <button
                className={activeMenu === '분석 기록' ? 'active' : ''}
                onClick={() => setActiveMenu('분석 기록')}
            >
                분석 기록
            </button>

            <button
                className={activeMenu === '알림 설정' ? 'active' : ''}
                onClick={() => setActiveMenu('알림 설정')}
            >
                알림 설정
            </button>

            </aside>

            <section className="mypage-content">
            {activeMenu === '내 정보' && (
                <>
                <div className="card profile-card">
                    <h3>내 정보</h3>

                    <div className="profile-box">
                    <div className="profile-img">👨‍💻</div>

                    <div>
                        <h2>{user?.mem_name || user?.name || '홍길동'}</h2>
                        <p>{user?.mem_id || user?.id || 'hong@example.com'}</p>

                        <button className="btn-outline mint"
                                onClick={() => setActiveMenu('회원 정보')}>

                            정보 수정
                        </button>
                    </div>
                    </div>
                </div>

                <div className="card record-card">
                    <h3>최근 분석 기록</h3>
                    {recordLoading ? (
                        <p style={{ color: '#888', fontSize: '14px' }}>불러오는 중...</p>
                    ) : records.length === 0 ? (
                        <p style={{ color: '#888', fontSize: '14px' }}>분석 기록이 없습니다.</p>
                    ) : (
                        records.map((record, index) => (
                            <div className="record-row" key={index}>
                                <span>{record.CHECK_DATE}</span>
                                <strong>{(record.PREDICT * 100).toFixed(1)}% </strong>
                                <button className="btn-outline mint" onClick={handleRecordDetail}>
                                    상세보기
                                </button>
                            </div>
                        ))
                    )}
                </div>
                </>
            )}

            {activeMenu === '분석 기록' && (
                <div className="card mypage-full-card">
                    <h3>분석 기록</h3>
                    <p>지금까지 진행한 심근경색 발생 확률 예측 기록입니다.</p>

                    {recordLoading ? (
                        <p style={{ color: '#888', fontSize: '14px' }}>불러오는 중...</p>
                    ) : records.length === 0 ? (
                        <p style={{ color: '#888', fontSize: '14px' }}>분석 기록이 없습니다.</p>
                    ) : (
                        records.map((record, index) => (
                            <div className="record-row large" key={index}>
                                <span>{record.CHECK_DATE}</span>
                                <strong>{(record.PREDICT * 100).toFixed(1)}%</strong>
                                <button className="btn-outline mint" onClick={handleRecordDetail}>
                                    상세보기
                                </button>
                            </div>
                        ))
                    )}
                </div>
            )}

            {activeMenu === '알림 설정' && (
                <div className="card mypage-full-card">
                <h3>알림 설정</h3>
                <p>건강 관리 알림을 설정할 수 있습니다.</p>

                <div className="setting-list">
                    <label><input type="checkbox" defaultChecked /> 매일 건강 체크 알림 받기</label>
                    <label><input type="checkbox" defaultChecked /> 주간 분석 결과 알림 받기</label>
                    <label><input type="checkbox" /> 커뮤니티 댓글 알림 받기</label>
                </div>

                <button
                    className="btn-primary small"
                    onClick={() => alert('알림 설정이 저장되었습니다.')}>
                    저장하기
                </button>
                </div>
            )}

            {activeMenu === '회원 정보' && (
                <div className="card mypage-full-card">
                <h3>회원 정보 수정</h3>
                <p>아이디는 수정할 수 없습니다.</p>

                {/* [수정] 핸들러 추가 및 각 input 태그에 name, value, onChange 속성 바인딩 */}
                <form className="mypage-edit-form" onSubmit={handleUpdateSubmit}>
                    <label>아이디</label>
                    <input
                    name="mem_id"
                    value={editForm.mem_id}
                    readOnly
                    className="readonly-input"
                    />

                    <label>이름</label>
                    <input 
                    name="mem_name"
                    value={editForm.mem_name} 
                    onChange={handleInputChange}
                    />

                    <label>전화번호</label>
                    <input 
                    name="mem_phone"
                    value={editForm.mem_phone} 
                    onChange={handleInputChange}
                    />

                    <label>닉네임</label>
                    <input 
                    name="mem_nickname"
                    value={editForm.mem_nickname} 
                    onChange={handleInputChange}
                    />

                    <button type="submit" className="btn-primary small">
                    수정 완료
                    </button>
                </form>
                </div>
            )}
            </section>
        </section>
        </main>
    );
}

export default MyPage;