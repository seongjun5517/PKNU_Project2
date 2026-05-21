import React, { useState, useEffect } from 'react'; // useEffect 추가
import { useNavigate, useSearchParams } from 'react-router-dom';

import '../../styles/pages/CommunityPage.css';

import { getCommunityList } from "../../springApi/communitySpringBootApi"; 

import { useAuth } from '../user/AuthContext';

function CommunityPage() {
  const navigate = useNavigate();
  const { user } = useAuth() || {};
  const [searchParams] = useSearchParams();
  const mem_id = searchParams.get("mem_id");

  // 카테고리 버튼 목록
  const categories = ['전체 게시글', '건강 정보', '식단 이야기', '운동 공유', '질문 & 답변', '자유 게시판'];

  // 현재 선택된 카테고리와 페이지 번호
  const [selectedCategory, setSelectedCategory] = useState('전체 게시글');
  const [currentPage, setCurrentPage] = useState(1);


  // 1. API로 가져온 게시글 데이터를 저장할 상태(State) 생성
  const [posts, setPosts] = useState([]);
  // 로딩 상태 추가 (선택사항이지만 UX에 좋습니다)
  const [isLoading, setIsLoading] = useState(true);

  // 2. 컴포넌트 마운트 시 API 호출하여 데이터 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await getCommunityList(mem_id);
        
        // 백엔드 응답 구조(response.data)에 따라 넣어줍니다.
        // Spring 백엔드가 보통 객체나 배열을 넘겨주므로 response.data를 확인해 보세요.
        setPosts(response.data || []); 
      } 
      
      catch (error) {
        console.error("게시글 목록을 불러오는 중 오류 발생:", error);
        alert("데이터를 로드하는 데 실패했습니다.");
      } 
      
      finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [mem_id]); // 빈 배열을 넣어 처음 렌더링될 때 딱 한 번만 실행되도록 합니다.

  // 카테고리 필터링
  const filteredPosts = selectedCategory === '전체 게시글'
    ? posts
    : posts.filter((post) => post.com_category === selectedCategory);

  // 페이지네이션 계산
  const postsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));
  
  // 데이터 양에 맞게 동적으로 페이지 번호 배열 생성 (기존 고정값 [1,2,3,4,5] 대신 변경)
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  
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
    setCurrentPage((prev) => (prev >= totalPages ? 1 : prev + 1));
  };

  // iISO 날짜 문자열에서 날짜 부분만 추출
  const formatDate = (dateString) => {
  if (!dateString) {
    return '';
  }

    return dateString.split('T')[0];
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
              <button
                className="btn-primary small"
                onClick={() => {
                  if (!user) {
                    alert("로그인 후 이용 가능합니다.");
                    return;
                  }
                  navigate('/community/write');
                }}
              >
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
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="empty-post-message">데이터를 불러오는 중입니다...</td>
                </tr>
              ) : currentPosts.length > 0 ? (
                currentPosts.map((post) => (
                  // 만약 백엔드 DB의 PK(아이디) 컬럼명이 id가 아니라 com_id라면 post.com_id로 변경해야 합니다.
                  <tr key={post.com_id || post.id} onClick={() => navigate(`/community/${post.com_id || post.id}`)} className="clickable-row">
                    <td>{post.com_title}</td>
                    <td>{post.mem_nickname || post.mem_id}</td> 
                    <td>{formatDate(post.com_created)}</td>    
                    <td>{post.com_view}</td>   
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="empty-post-message">
                    현재 선택한 카테고리에 표시할 게시글이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="pagination">

        {/* 이전 페이지 */}
        <button onClick={() =>setCurrentPage( currentPage <= 1? totalPages: currentPage - 1)}>
          〈
        </button>

        {pageNumbers.map((page) => (
          <button
            key={page}
            className={currentPage === page ? 'active' : ''}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ))}

        {/* 다음 페이지 */}
        <button onClick={handleNextPage}>
          〉
      </button>
</div>

          <p className="page-helper-text">
            현재 {currentPage} 페이지 / 총 페이지 수 {totalPages} 페이지
          </p>
        </section>
      </section>
    </main>
  );
}

export default CommunityPage;