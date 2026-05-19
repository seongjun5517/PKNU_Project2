import '../styles/pages/HomePage.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import slideRunner from '../assets/slide-runner.svg';
import slideChart from '../assets/slide-chart.svg';
import slideCommunity from '../assets/slide-community.svg';

function HomePage() {
  const navigate = useNavigate();

  // 현재 보고 있는 슬라이드 번호
  const [slideIndex, setSlideIndex] = useState(0);

  // 기사 임시 링크
  // 실제 기사 API를 연결하면 이 객체만 API 응답값으로 교체하면 됨
  const articleLinks = {
    more: 'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6770',
    lifestyle: 'https://www.kdca.go.kr/menu.es?mid=a20303020300',
    food: 'https://doctornow.co.kr/content/magazine/08c6a208de4a4da28aa8bfaacccbbea6'
  };

  // 새 탭으로 기사 열기
  const openArticle = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // 메인 슬라이드 데이터
  // image 값만 실제 이미지 파일로 바꾸면 그대로 슬라이드에 적용 가능
  const slides = [
    {
      title: '건강한 습관으로\n더 나은 삶을 시작하세요',
      buttonText: '분석 시작하기',
      link: '/analysis',
      image: slideRunner,
      alt: '달리는 사람 일러스트'
    },
    {
      title: '데이터로 확인하는\n나의 건강 상태',
      buttonText: '분석 보기',
      link: '/result',
      image: slideChart,
      alt: '건강 데이터 차트 일러스트'
    },
    {
      title: '건강 정보를 나누는\n커뮤니티 공간',
      buttonText: '커뮤니티 가기',
      link: '/community',
      image: slideCommunity,
      alt: '커뮤니티 일러스트'
    }
  ];

  // 메인에 보여줄 커뮤니티 인기글 임시 데이터
  const communityPosts = [
    { id: 1, category: '건강 정보', title: '아침 공복 유산소, 정말 효과 있을까요?', time: '5시간 전' },
    { id: 2, category: '식단 이야기', title: '다이어트 식단 공유합니다!', time: '3시간 전' },
    { id: 3, category: '운동 공유', title: '단백질 섭취량, 하루에 얼마나 적당할까요?', time: '5시간 전' },
    { id: 4, category: '자유 게시판', title: '스트레스 관리에 좋은 방법 추천해주세요!', time: '1일 전' }
  ];

  // 슬라이드 이전/다음 이동
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
        {/* 왼쪽 상단: 예측 그래프 */}
        <div className="card chart-card">
          <h3>오늘의 심근경색 발생 예측</h3>

          <div className="simple-chart">
            <span className="chart-value">12.8%</span>

            <div className="chart-labels">
              <span>4/20</span>
              <span>4/21</span>
              <span>4/22</span>
              <span>4/23</span>
              <span>4/24</span>
              <span>4/25</span>
              <span>오늘</span>
            </div>
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
            <p>심근경색은 조기 발견과 생활습관 관리가 매우 중요합니다.</p>
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
              <li key={post.id} onClick={() => navigate(`/community/${post.id}`)}>
                <span className="category-badge">{post.category}</span>
                <span className="post-title">{post.title}</span>
                <span className="post-meta time">{post.time}</span>
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
