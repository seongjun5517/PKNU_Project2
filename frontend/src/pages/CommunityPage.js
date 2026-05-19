import '../styles/pages/CommunityPage.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CommunityPage() {
  const navigate = useNavigate();

  // 카테고리 버튼 목록
  const categories = ['전체 게시글', '건강 정보', '식단 이야기', '운동 공유', '질문 & 답변', '자유 게시판'];

  // 현재 선택된 카테고리와 페이지 번호
  const [selectedCategory, setSelectedCategory] = useState('전체 게시글');
  const [currentPage, setCurrentPage] = useState(1);

  // DB 연결 전 임시 게시글 데이터
  // 좋아요는 상세 페이지에서만 보여주기 때문에 목록 테이블에는 표시하지 않음
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

  // 카테고리 필터링
  const filteredPosts = selectedCategory === '전체 게시글'
    ? posts
    : posts.filter((post) => post.category === selectedCategory);

  // 페이지네이션 계산
  const postsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));
  const pageNumbers = [1, 2, 3, 4, 5];
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  // 카테고리 선택 시 1페이지로 초기화
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // 숫자 페이지 버튼 클릭
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  // 다음 페이지 버튼 클릭
  const handleNextPage = () => {
    setCurrentPage((prev) => (prev >= 5 ? 1 : prev + 1));
  };

  return (
    <main className="page community-page">
      <section className="community-layout">
        {/* 왼쪽 카테고리 메뉴 */}
        <aside className="card community-sidebar">
          <h3>카테고리</h3>

          {categories.map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </aside>

        {/* 오른쪽 게시글 목록 */}
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
              <tr>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>조회수</th>
              </tr>
            </thead>

            <tbody>
              {currentPosts.length > 0 ? (
                currentPosts.map((post) => (
                  <tr key={post.id} onClick={() => navigate(`/community/${post.id}`)} className="clickable-row">
                    <td>{post.title}</td>
                    <td>{post.writer}</td>
                    <td>{post.date}</td>
                    <td>{post.views}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="empty-post-message">
                    현재 선택한 페이지에 표시할 게시글이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="pagination">
            {pageNumbers.map((page) => (
              <button
                key={page}
                className={currentPage === page ? 'active' : ''}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </button>
            ))}
            <button onClick={handleNextPage}>〉</button>
          </div>

          <p className="page-helper-text">
            현재 {currentPage}페이지 / 실제 게시글 페이지 수 {totalPages}페이지
          </p>
        </section>
      </section>
    </main>
  );
}

export default CommunityPage;
