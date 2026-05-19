import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const [slideIndex, setSlideIndex] = useState(0);

  // 기사 임시 외부 링크
  // 나중에 실제 DB 기사 데이터가 생기면 이 배열만 API 데이터로 교체하면 됨
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
  // image에 실제 이미지 경로를 넣으면 됨. 예: image: '/images/slide01.png', type: 'image'
  const slides = [
    {
      title: '건강한 습관으로\n더 나은 삶을 시작하세요',
      desc: '심근경색 위험도를 분석하고 건강 습관을 관리하세요.',
      image: '🏃‍♀️',
      type: 'emoji'
    },
    {
      title: '데이터로 보는\n나의 건강 상태',
      desc: '입력한 건강 수치를 바탕으로 분석 결과를 확인하세요.',
      image: '📊',
      type: 'emoji'
    },
    {
      title: '커뮤니티에서\n건강 정보를 나눠보세요',
      desc: '식단, 운동, 건강 정보를 함께 공유할 수 있습니다.',
      image: '💬',
      type: 'emoji'
    }
  ];

  const communityPosts = [
    { category: '건강 정보', title: '아침 공복 유산소, 정말 효과 있을까요?', views: 123, time: '5시간 전' },
    { category: '식단 이야기', title: '다이어트 식단 공유합니다!', views: 98, time: '3시간 전' },
    { category: '운동 공유', title: '단백질 섭취량, 하루에 얼마나 적당할까요?', views: 76, time: '5시간 전' },
    { category: '자유 게시판', title: '스트레스 관리에 좋은 방법 추천해주세요!', views: 64, time: '1일 전' }
  ];

  const moveSlide = (direction) => {
    if (direction === 'prev') {
      setSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    } else {
      setSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <main className="page home-page">
      <section className="home-grid">
        <div className="card chart-card">
          <h3>오늘의 심근경색 발생 예측</h3>
          <div className="simple-chart">
            <span className="chart-value">12.8%</span>
            <div className="chart-labels">
              <span>4/20</span><span>4/21</span><span>4/22</span><span>4/23</span><span>4/24</span><span>4/25</span><span>오늘</span>
            </div>
          </div>
        </div>

        <div className="card article-card">
          <div className="card-title-row">
            <h3>심혈관 및 심근경색에 대한 기사</h3>
            
          </div>

          <button
            type="button"
            className="article-link-card main-article-link"
            onClick={() => openArticle(articleLinks.more)}
          >
            <div className="article-main-img">심장 이미지</div>
            <h4>심근경색 전조증상, 이렇게 확인하세요</h4>
            <p>심근경색은 조기 발견과 생활습관 관리가 매우 중요합니다.</p>
          </button>

          <div className="article-small-list">
            <button
              type="button"
              className="article-link-card"
              onClick={() => openArticle(articleLinks.lifestyle)}
            >
              <div className="article-thumb red">♥</div>
              <p>혈관 건강을 지키는 5가지 생활습관</p>
            </button>

            <button
              type="button"
              className="article-link-card"
              onClick={() => openArticle(articleLinks.food)}
            >
              <div className="article-thumb food">🥗</div>
              <p>심장에 좋은 음식과 나쁜 음식</p>
            </button>
          </div>
        </div>

        <div className="card community-preview-card">
          <div className="card-title-row">
            <h3>커뮤니티 인기글</h3>
            <button className="text-button" onClick={() => navigate('/community')}>더보기 〉</button>
          </div>
          <ul className="post-preview-list">
            {communityPosts.map((post, index) => (
              <li key={index} onClick={() => navigate(`/community/${index + 1}`)}>
                <span className="category-badge">{post.category}</span>
                <span className="post-title">{post.title}</span>
                <span className="post-meta">♡ {post.views}</span>
                <span className="post-meta">{post.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card slide-card">
          <h3>슬라이드 이미지</h3>
          <div className="slide-wrapper">
            <button className="slide-arrow left" onClick={() => moveSlide('prev')}>‹</button>

            {/* 슬라이드를 track으로 묶고 transform을 적용해서 부드럽게 이동 */}
            <div className="slide-viewport">
              <div
                className="slide-track"
                style={{ transform: `translateX(-${slideIndex * 100}%)` }}
              >
                {slides.map((slide) => (
                  <div className="slide-content" key={slide.title}>
                    <div>
                      <h2>
                        {slide.title.split('\n').map((line) => (
                          <span key={line}>{line}<br /></span>
                        ))}
                      </h2>
                      <p>{slide.desc}</p>
                      <button className="btn-primary" onClick={() => navigate('/analysis')}>
                        분석 시작하기
                      </button>
                    </div>

                    {slide.type === 'image' ? (
                      <img className="slide-image" src={slide.image} alt={slide.title} />
                    ) : (
                      <div className="runner-illust">{slide.image}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button className="slide-arrow right" onClick={() => moveSlide('next')}>›</button>
          </div>
          <div className="slide-dots">
            {slides.map((slide, index) => (
              <button
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
