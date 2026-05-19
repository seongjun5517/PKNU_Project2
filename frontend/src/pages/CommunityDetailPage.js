import { useNavigate, useParams } from 'react-router-dom';

function CommunityDetailPage() {
  const navigate = useNavigate();
  const { postId } = useParams();

  const posts = {
    1: { category: '건강 정보', title: '아침 공복 유산소, 정말 효과 있을까요?', writer: '건강한나', date: '2024.05.20', views: 123 },
    2: { category: '식단 이야기', title: '다이어트 식단 공유합니다!', writer: '운동러버', date: '2024.05.19', views: 98 },
    3: { category: '운동 공유', title: '단백질 섭취량, 하루에 얼마나 적당할까요?', writer: '헬시라이프', date: '2024.05.19', views: 76 },
    4: { category: '질문 & 답변', title: '스트레스 관리에 좋은 방법 추천해주세요!', writer: '마인드케어', date: '2024.05.18', views: 64 },
    5: { category: '자유 게시판', title: '심장에 좋은 음식과 나쁜 음식 정리', writer: '푸드가이드', date: '2024.05.18', views: 58 }
  };

  const post = posts[postId] || posts[1];

  return (
    <main className="page community-detail-page">
      <section className="card detail-card">
        <span className="category-badge detail-badge">{post.category}</span>
        <h2>{post.title}</h2>
        <div className="detail-meta">
          <span>작성자 : {post.writer}</span>
          <span>작성일 : {post.date}</span>
          <span>조회수 : {post.views}</span>
        </div>
        <div className="detail-content">
          <p>이 페이지는 게시글 상세보기 화면입니다.</p>
          <p>DB 연결 전에는 임시 데이터로 내용이 표시됩니다. 나중에 Spring Boot API에서 게시글 상세 데이터를 받아오면 됩니다.</p>
        </div>
        <button className="btn-outline" onClick={() => navigate('/community')}>목록으로</button>
      </section>
    </main>
  );
}

export default CommunityDetailPage;
