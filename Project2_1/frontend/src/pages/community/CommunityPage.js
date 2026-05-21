import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import '../../styles/pages/CommunityPage.css';

import { getCommunityList } from "../../springApi/communitySpringBootApi"; 

function CommunityPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mem_id = searchParams.get("mem_id");

  const categories = ['전체 게시글', '건강 정보', '식단 이야기', '운동 공유', '질문 & 답변', '자유 게시판'];

  const [selectedCategory, setSelectedCategory] = useState('전체 게시글');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('all');

  const [searchKeyword, setSearchKeyword] = useState('');
  const [appliedKeyword, setAppliedKeyword] = useState('');

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await getCommunityList(mem_id);
        setPosts(response.data || []); 
      } catch (error) {
        console.error("게시글 목록을 불러오는 중 오류 발생:", error);
        alert("데이터를 로드하는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [mem_id]);

  const getPostWriter = (post) => post.mem_id || post.writer || post.userId || '';
  const getPostTitle = (post) => post.com_title || post.title || '';
  const getPostCategory = (post) => post.com_category || post.category || '';

  const modeFilteredPosts =
    viewMode === 'mine'
      ? posts.filter((post) => getPostWriter(post) === mem_id)
      : posts;

  const categoryFilteredPosts =
    selectedCategory === '전체 게시글' || viewMode === 'mine'
      ? modeFilteredPosts
      : modeFilteredPosts.filter((post) => getPostCategory(post) === selectedCategory);

  const filteredPosts = categoryFilteredPosts.filter((post) => {
    const title = getPostTitle(post);
    const writer = getPostWriter(post);
    return (
      title.toLowerCase().includes(appliedKeyword.toLowerCase()) ||
      writer.toLowerCase().includes(appliedKeyword.toLowerCase())
    );
  });

  const postsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev >= totalPages ? 1 : prev + 1));
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return dateString.split('T')[0];
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchSubmit = () => {
    setAppliedKeyword(searchKeyword);
    setCurrentPage(1);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
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
              <input
                placeholder="검색어를 입력하세요"
                value={searchKeyword}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
              />
              <button className="btn-primary small" onClick={handleSearchSubmit}>
                확인
              </button>
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
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="empty-post-message">데이터를 불러오는 중입니다...</td>
                </tr>
              ) : currentPosts.length > 0 ? (
                currentPosts.map((post) => (
                  <tr
                    key={post.com_id || post.id}
                    onClick={() => navigate(`/community/${post.com_id || post.id}`)}
                    className="clickable-row"
                  >
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
            <button onClick={() => setCurrentPage(currentPage <= 1 ? totalPages : currentPage - 1)}>
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
            <button onClick={handleNextPage}>
              〉
            </button>
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