import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CommunityPage() {
  const navigate = useNavigate();

  const categories = ['전체 게시글', '건강 정보', '식단 이야기', '운동 공유', '질문 & 답변', '자유 게시판'];
  const [selectedCategory, setSelectedCategory] = useState('전체 게시글');

  const posts = [
    { id: 1, category: '건강 정보', title: '아침 공복 유산소, 정말 효과 있을까요?', writer: '건강한나', date: '2024.05.20', views: 123 },
    { id: 2, category: '식단 이야기', title: '다이어트 식단 공유합니다!', writer: '운동러버', date: '2024.05.19', views: 98 },
    { id: 3, category: '운동 공유', title: '단백질 섭취량, 하루에 얼마나 적당할까요?', writer: '헬시라이프', date: '2024.05.19', views: 76 },
    { id: 4, category: '질문 & 답변', title: '스트레스 관리에 좋은 방법 추천해주세요!', writer: '마인드케어', date: '2024.05.18', views: 64 },
    { id: 5, category: '자유 게시판', title: '심장에 좋은 음식과 나쁜 음식 정리', writer: '푸드가이드', date: '2024.05.18', views: 58 }
  ];

  const filteredPosts = selectedCategory === '전체 게시글'
    ? posts
    : posts.filter((post) => post.category === selectedCategory);

  return (
    <main className="page community-page">
      <section className="community-layout">
        <aside className="card community-sidebar">
          <h3>카테고리</h3>
          {categories.map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </aside>

        <section className="card community-content">
          <div className="community-top">
            <h2>{selectedCategory}</h2>
            <div className="community-actions">
              <input placeholder="검색어를 입력하세요" />
              <button className="btn-primary small" onClick={() => navigate('/community/write')}>
                글 작성하기
              </button>
            </div>
          </div>

          <table className="post-table">
            <thead>
              <tr><th>제목</th><th>작성자</th><th>작성일</th><th>조회수</th></tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.id} onClick={() => navigate(`/community/${post.id}`)} className="clickable-row">
                  <td>{post.title}</td><td>{post.writer}</td><td>{post.date}</td><td>{post.views}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button className="active">1</button><button>2</button><button>3</button><button>4</button><button>5</button><button>〉</button>
          </div>
        </section>
      </section>
    </main>
  );
}

export default CommunityPage;
