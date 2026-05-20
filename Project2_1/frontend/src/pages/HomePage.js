import '../styles/pages/HomePage.css';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getDataView } from "../springApi/modeldataSpringBootApi"; 

import slideRunner from '../assets/slide-runner.svg';
import slideChart from '../assets/slide-chart.svg';
import slideCommunity from '../assets/slide-community.svg';
import { useAuth } from './user/AuthContext';
import {getCommunityTopList} from "../springApi/communitySpringBootApi";
function HomePage() {
    const navigate = useNavigate();
    const [slideIndex, setSlideIndex] = useState(0);

    // 그래프 및 디버깅 상태
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dbStatus, setDbStatus] = useState("checking"); // checking, success, empty, error, unauthenticated

    // 변경 명세 (useAuth 전체 인스턴스에 대한 이중 방어막 레이어)
    const authInstance = useAuth();
    const user = authInstance ? authInstance.user : null;
    const memId = user ? user.mem_name : "방문자";

    // 실제 데이터 반영
    const [communityPosts, setCommunityPosts] =useState([]);

    useEffect(() => {
        // [핵심 교정] 비로그인 사용자는 Spring Boot 서버 호출을 전면 차단하고 unauthenticated 상태로 즉시 반환
        if (!user) {
            setDbStatus("unauthenticated");
            setLoading(false);
            return;
        }

        setLoading(true);
        console.log(`🚀 [DB진단] Spring Boot API 호출 시작 (조회 ID: ${memId})`);
        
        getDataView(memId)
        .then((response) => {
            // 1. 응답 자체 혹은 데이터 필드 검증
            if (!response || !response.data) {
                console.error("❌ [DB진단] 서버 응답은 왔으나 구조가 올바르지 않습니다. response.data가 없습니다.", response);
                setDbStatus("error");
                setChartData([]);
                setLoading(false);
                return;
            }

            console.log("📥 [DB진단] 백엔드 응답 수신 성공! 로우 데이터:", response.data);

            // 2. 데이터가 빈 배열([])인 경우
            if (response.data.length === 0) {
                console.warn(`⚠️ [DB진단] 연결 성공! 하지만 DB에 회원 '${memId}'의 데이터가 0건입니다. (빈 테이블 상태)`);
                setDbStatus("empty");
                setChartData([]);
                setLoading(false);
                return;
            }

            // 3. 데이터가 존재할 경우 정렬 및 대입
            console.log(`✅ [DB진단] 데이터 로드 완료! 총 ${response.data.length}개의 기록을 찾았습니다.`);
            
            const sortedData = response.data.sort((a, b) => {
                return new Date(a.CHECK_DATE) - new Date(b.CHECK_DATE);
            });
            
            setChartData(sortedData);
            setDbStatus("success");
            setLoading(false);
        })

        .catch((error) => {
            console.error("❌ [DB진단] 아예 Spring 서버와 통신에 실패했습니다.");
            setDbStatus("error");
            setLoading(false);
        });
    }, [memId, user]);

    useEffect(() => {const loadTopPosts = async() => {

        try{
            const response = await getCommunityTopList();
            console.log(response.data);
            setCommunityPosts( response.data);
        }

        catch(error){

            console.log(error);
        }
    };

    loadTopPosts();

}, []);

    const articleLinks = {
        more: 'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6770',
        lifestyle: 'https://www.kdca.go.kr/menu.es?mid=a20303020300',
        food: 'https://doctornow.co.kr/content/magazine/08c6a208de4a4da28aa8bfaacccbbea6'
    };

    const openArticle = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const slides = [
        { title: '건강한 습관으로\n더 나은 삶을 시작하세요', buttonText: '분석 시작하기', link: '/analysis', image: slideRunner, alt: '달리는 사람 일러스트' },
        { title: '데이터로 확인하는\n나의 건강 상태', buttonText: '분석 보기', link: '/result', image: slideChart, alt: '건강 데이터 차트 일러스트' },
        { title: '건강 정보를 나누는\n커뮤니티 공간', buttonText: '커뮤니티 가기', link: '/community', image: slideCommunity, alt: '커뮤니티 일러스트' }
    ];

    

    const moveSlide = (direction) => {
        if (direction === 'prev') {
            setSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
            return;
        }
        setSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    return (
        <main className="page home-page">
        <section className="home-grid">
            <div className="card chart-card" style={{ display: "flex", flexDirection: "column" }}>
            <div className="card-title-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3>오늘의 심근경색 발생 예측 ({memId}님)</h3>
                <button 
                    type="button" 
                    className="text-button" 
                    onClick={() => navigate(user ? '/result' : '/login')} 
                    style={{ fontSize: '13px', color: '#007bff', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                    자세히 보기 〉
                </button>
            </div>

            {/* 그래프 및 디버깅 결과 메시지 레이어 */}
            <div className="dynamic-chart-container" style={{ width: "100%", height: "230px", marginTop: "15px", position: "relative" }}>
                {loading ? (
                    <div style={{ textAlign: "center", paddingTop: "80px", color: "#666" }}>데이터를 로딩 중입니다...</div>
                ) : dbStatus === "unauthenticated" ? (
                    // [핵심 추가] 미인증 유저 방문 시 차트 영역에 출력할 전용 안내 뷰 바인딩
                    <div style={{ textAlign: "center", paddingTop: "65px", padding: "0 20px" }}>
                        <p style={{ fontWeight: "bold", margin: 0, color: "#444" }}>로그인이 필요한 서비스입니다</p>
                        <p style={{ fontSize: "12px", color: "#777", marginTop: "5px", marginBottom: "15px" }}>
                            로그인하시면 축적된 건강 예측 분석 데이터를 실시간 차트로 추적 관리할 수 있습니다.
                        </p>
                        <button className="btn-primary small" onClick={() => navigate('/login')}>
                            로그인하러 가기
                        </button>
                    </div>
                ) : dbStatus === "error" ? (
                    <div style={{ textAlign: "center", paddingTop: "60px", color: "#dc3545", padding: "0 20px" }}>
                        <p style={{ fontWeight: "bold", margin: 0 }}>❌ 백엔드 연결 실패</p>
                        <p style={{ fontSize: "12px", color: "#777", marginTop: "5px" }}>Spring Boot 서버가 켜져 있는지, 혹은 API 파일의 IP/포트 번호 주소를 확인해 주세요.</p>
                    </div>
                ) : dbStatus === "empty" ? (
                    <div style={{ textAlign: "center", paddingTop: "60px", color: "#ffc107", padding: "0 20px" }}>
                        <p style={{ fontWeight: "bold", margin: 0, color: "#b58100" }}>⚠️ 수신 데이터가 없습니다</p>
                        <p style={{ fontSize: "12px", color: "#777", marginTop: "5px" }}>Spring 백엔드 접속은 정상이나, DB에 <strong>{memId}</strong> 회원으로 등록된 분석 데이터가 비어있습니다.</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="CHECK_DATE" tick={{ fontSize: 10 }} />
                        <YAxis domain={[0, 'auto']} tick={{ fontSize: 10 }} />
                        <Tooltip wrapperStyle={{ pointerEvents: "none" }} />
                        <Line
                            type="monotone"
                            dataKey="PREDICT"
                            name="예측 확률"
                            stroke="#007bff"
                            strokeWidth={2.5}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
            </div>

            {/* 오른쪽 상단: 기사 카드 */}
            <div className="card article-card">
            <div className="card-title-row">
                <h3>심혈관 및 심근경색에 대한 기사</h3>
                <button type="button" className="text-button" onClick={() => openArticle(articleLinks.more)}>
                더보기 〉
                </button>
            </div>

            <button type="button" className="article-link-card main-article-link" onClick={() => openArticle(articleLinks.more)}>
                <div className="article-main-img">심장 이미지</div>
                <h4>심근경색 전조증상, 이렇게 확인하세요</h4>
                <p>심근경색은 조기 발견 and 생활습관 관리가 매우 중요합니다.</p>
            </button>

            <div className="article-small-list">
                <button type="button" className="article-link-card" onClick={() => openArticle(articleLinks.lifestyle)}>
                <div className="article-thumb red">♥</div>
                <p>혈관 건강을 지키는 5가지 생활습관</p>
                </button>

                <button type="button" className="article-link-card" onClick={() => openArticle(articleLinks.food)}>
                <div className="article-thumb food">🥗</div>
                <p>심장에 좋은 음식과 나쁜 음식</p>
                </button>
            </div>
            </div>

            {/* 왼쪽 하단: 커뮤니티 인기글 */}
            <div className="card community-preview-card">
            <div className="card-title-row">
                <h3>커뮤니티 인기글</h3>
                <button className="text-button" onClick={() => navigate('/community')}>
                더보기 〉
                </button>
            </div>

            <ul className="post-preview-list">
                {communityPosts.map((post) => (
                <li key={post.com_id} onClick={() => navigate(`/community/${post.com_id}`)}>
                    <span className="category-badge">{post.com_category}</span>
                    <span className="post-title">{post.com_title}</span>
                    <span className="post-meta time">{post.com_like}</span>
                </li>
                ))}
            </ul>
            </div>

            {/* 오른쪽 하단: 메인 슬라이드 */}
            <div className="card slide-card">
            <div className="slide-wrapper">
                <button type="button" className="slide-arrow left" onClick={() => moveSlide('prev')}>
                ‹
                </button>

                <div className="slide-viewport">
                <div className="slide-track" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
                    {slides.map((slide, index) => (
                    <div className="slide-content" key={index}>
                        <div className="slide-text-area">
                        <h2>{slide.title}</h2>
                        <button className="btn-primary slide-button" onClick={() => navigate(slide.link)}>
                            {slide.buttonText}
                        </button>
                        </div>

                        <div className="slide-visual-box">
                        <img className="slide-image" src={slide.image} alt={slide.alt} />
                        </div>
                    </div>
                    ))}
                </div>
                </div>

                <button type="button" className="slide-arrow right" onClick={() => moveSlide('next')}>
                ›
                </button>
            </div>

            <div className="slide-dots">
                {slides.map((slide, index) => (
                <button
                    type="button"
                    key={slide.title}
                    className={slideIndex === index ? 'active' : ''}
                    onClick={() => setSlideIndex(index)}
                    aria-label={`${index + 1}번 슬라이드`}
                />
                ))}
            </div>
            </div>
        </section>
        </main>
    );
}

export default HomePage;