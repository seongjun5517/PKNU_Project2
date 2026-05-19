import '../styles/pages/CommunityPage.css';

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function CommunityDetailPage() {
  const navigate = useNavigate();
  const { postId } = useParams();

  // DB 연결 전 임시 상세 데이터
  // 목록의 글 id와 맞춰두면 클릭한 글의 상세 화면으로 이동 가능
  const posts = [
    { id: 1, category: '건강 정보', title: '아침 공복 유산소, 정말 효과 있을까요?', writer: '건강한나', date: '2024.05.20', views: 123, likes: 12 },
    { id: 2, category: '식단 이야기', title: '다이어트 식단 공유합니다!', writer: '운동러버', date: '2024.05.19', views: 98, likes: 9 },
    { id: 3, category: '운동 공유', title: '단백질 섭취량, 하루에 얼마나 적당할까요?', writer: '헬시라이프', date: '2024.05.19', views: 76, likes: 7 },
    { id: 4, category: '질문 & 답변', title: '스트레스 관리에 좋은 방법 추천해주세요!', writer: '마인드케어', date: '2024.05.18', views: 64, likes: 5 },
    { id: 5, category: '자유 게시판', title: '심장에 좋은 음식과 나쁜 음식 정리', writer: '푸드가이드', date: '2024.05.18', views: 58, likes: 8 },
    { id: 6, category: '건강 정보', title: '혈압 관리할 때 꼭 확인해야 하는 습관', writer: '케어닥터', date: '2024.05.17', views: 51, likes: 4 },
    { id: 7, category: '식단 이야기', title: '저염식 식단 구성 어떻게 하면 좋을까요?', writer: '식단러', date: '2024.05.17', views: 43, likes: 6 },
    { id: 8, category: '운동 공유', title: '퇴근 후 30분 걷기 루틴 공유', writer: '워킹맨', date: '2024.05.16', views: 39, likes: 3 },
    { id: 9, category: '질문 & 답변', title: 'BMI가 정상이어도 복부비만이면 위험한가요?', writer: '궁금해요', date: '2024.05.16', views: 88, likes: 10 },
    { id: 10, category: '자유 게시판', title: '요즘 수면 관리 앱 사용해보신 분?', writer: '슬립케어', date: '2024.05.15', views: 33, likes: 2 },
    { id: 11, category: '건강 정보', title: '심혈관 건강에 좋은 운동 강도 정리', writer: '헬스가이드', date: '2024.05.15', views: 92, likes: 11 },
    { id: 12, category: '식단 이야기', title: '오메가3 음식으로 챙기는 법', writer: '푸드케어', date: '2024.05.14', views: 45, likes: 5 },
    { id: 13, category: '운동 공유', title: '초보자 홈트 루틴 추천합니다', writer: '홈트왕', date: '2024.05.14', views: 74, likes: 8 },
    { id: 14, category: '질문 & 답변', title: '공복혈당이 높게 나왔는데 어떻게 해야 할까요?', writer: '질문자', date: '2024.05.13', views: 81, likes: 7 },
    { id: 15, category: '자유 게시판', title: '건강검진 후기 공유합니다', writer: '검진완료', date: '2024.05.13', views: 29, likes: 3 }
  ];

  const post = posts.find((item) => item.id === Number(postId)) || posts[0];

  // 좋아요는 상세 페이지 안에서만 작동하도록 처리
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked);
    setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
  };

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
          <p>
            DB 연결 전에는 임시 데이터로 내용이 표시됩니다.
            나중에 Spring Boot API에서 게시글 상세 데이터를 받아오면 됩니다.
          </p>
        </div>

        <div className="detail-action-row">
          <button
            type="button"
            className={liked ? 'like-button active' : 'like-button'}
            onClick={handleLikeClick}
          >
            ♥ 좋아요 {likeCount}
          </button>

          <button className="btn-outline" onClick={() => navigate('/community')}>
            목록으로
          </button>
        </div>
      </section>
    </main>
  );
}

export default CommunityDetailPage;
