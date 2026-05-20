import React, { useState, useEffect } from 'react'; // useEffect 추가
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'

import '../../styles/pages/CommunityPage.css';

import { getCommunityList } from "../../springApi/communitySpringBootApi"; 

function CommunityPage() {
  const navigate = useNavigate();

  // 로그인 사용자 정보
  const { user } = useAuth();

  // 현재 로그인한 사용자 ID 추출
  // AuthContext 구조에 따라 user.id, user.mem_id, user.email 중 하나가 들어올 수 있어서 여러 개 대응
  const loginId =
    user?.mem_id ||
    user?.id ||
    user?.email ||
    localStorage.getItem('mem_id') ||
    localStorage.getItem('userId') ||
    localStorage.getItem('email');

  // 카테고리 버튼 목록
  const categories = ['전체 게시글', '건강 정보', '식단 이야기', '운동 공유', '질문 & 답변', '자유 게시판'];

  // 현재 선택된 카테고리와 페이지 번호
  const [selectedCategory, setSelectedCategory] = useState('전체 게시글');
  const [currentPage, setCurrentPage] = useState(1);
  
  // 전체 게시글 / 내 게시글 보기 모드
  const [viewMode, setViewMode] = useState('all');

   // 검색어 상태
  const [searchKeyword, setSearchKeyword] = useState('');

  // 1. API로 가져온 게시글 데이터를 저장할 상태(State) 생성
  const [posts, setPosts] = useState([]);
  // 로딩 상태 추가 (선택사항이지만 UX에 좋습니다)
  const [isLoading, setIsLoading] = useState(true);
 
  // 2. 컴포넌트 마운트 시 API 호출하여 데이터 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await getCommunityList();
        
        // 백엔드 응답 구조(response.data)에 따라 넣어줍니다.
        // Spring 백엔드가 보통 객체나 배열을 넘겨주므로 response.data를 확인해 보세요.
        setPosts(response.data || []); 
      } catch (error) {
        console.error("게시글 목록을 불러오는 중 오류 발생:", error);
        alert("데이터를 로드하는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []); // 빈 배열을 넣어 처음 렌더링될 때 딱 한 번만 실행되도록 합니다.

  // 카테고리 필터링
  // 게시글 작성자 가져오기
const getPostWriter = (post) => {
  return post.mem_id || post.writer || post.userId || '';
};

// 게시글 제목 가져오기
const getPostTitle = (post) => {
  return post.com_title || post.title || '';
};

// 게시글 카테고리 가져오기
const getPostCategory = (post) => {
  return post.com_category || post.category || '';
};

// 1차 필터: 전체 게시글 / 내 게시글
const modeFilteredPosts =
  viewMode === 'mine'
    ? posts.filter((post) => getPostWriter(post) === loginId)
    : posts;

// 2차 필터: 카테고리
const categoryFilteredPosts =
  selectedCategory === '전체 게시글' || viewMode === 'mine'
    ? modeFilteredPosts
    : modeFilteredPosts.filter((post) => getPostCategory(post) === selectedCategory);

// 3차 필터: 검색어
const filteredPosts = categoryFilteredPosts.filter((post) => {
  const title = getPostTitle(post);
  const writer = getPostWriter(post);

  return (
    title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    writer.toLowerCase().includes(searchKeyword.toLowerCase())
  );
});

  // 페이지네이션 계산
  const postsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));
  
  // 데이터 양에 맞게 동적으로 페이지 번호 배열 생성 (기존 고정값 [1,2,3,4,5] 대신 변경)
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  // 카테고리 선택 시 1페이지로 초기화
  const handleCategoryClick = (category) => {
    // 카테고리를 누르면 다시 전체 게시글 모드로 전환
    setViewMode('all');
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // 내 게시글 버튼 클릭
  const handleMyPosts = () => {
    if (!loginId) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    setViewMode('mine');
    setCurrentPage(1);
  };

  // 검색어 입력
  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
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


  // ISO 날짜 문자열에서 날짜 부분만 추출
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
              className={selectedCategory === category && viewMode === 'all' ? 'active' : ''}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </aside>

        {/* 오른쪽 게시글 목록 */}
        <section className="card community-content">
          <div className="community-top">
            <h2>{viewMode === 'mine' ? '내 게시글' : selectedCategory}</h2>

            <div className="community-actions">
              <input
                value={searchKeyword}
                onChange={handleSearchChange}
                placeholder="검색어를 입력하세요"
              />

              <button
                type="button"
                className={viewMode === 'mine' ? 'btn-primary small' : 'btn-outline small'}
                onClick={handleMyPosts}
              >
                내 게시글
              </button>

              <button
                type="button"
                className="btn-primary small"
                onClick={() => navigate('/community/write')}
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
                    <td>{getPostTitle(post)}</td>
                    <td>{getPostWriter(post)}</td>
                    <td>{formatDate(post.com_created)}</td>
                    <td>{post.com_view}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="empty-post-message">
                    {viewMode === 'mine'
                      ? '내가 작성한 게시글이 없습니다.'
                      : '현재 선택한 조건에 표시할 게시글이 없습니다.'}
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