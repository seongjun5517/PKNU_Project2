import React, { useState, useEffect } from 'react'; // useEffect 추가
import { useNavigate, useParams } from 'react-router-dom';

import '../../styles/pages/CommunityPage.css';

// 사용할 API 임포트
import { getCommunityView, setCommunityLike } from "../../springApi/communitySpringBootApi"; 

function CommunityDetailPage() {
  const navigate = useNavigate();
  const { postId } = useParams(); // App.js 라우터 설정에 따라 com_id 또는 postId로 매핑됩니다.

  // 게시글 상세 데이터를 저장할 상태
  const [post, setPost] = useState(null);
  // 로딩 상태 및 좋아요 상태
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // 1. 페이지 로드 시 해당 게시글 상세 데이터 가져오기
  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        setIsLoading(true);
        // useParams로 가져온 postId(또는 com_id)로 단건 조회 API 호출
        const response = await getCommunityView(postId);
        
        if (response.data) {
          setPost(response.data);
          // 백엔드에서 받아온 초기 좋아요 수 설정
          setLikeCount(response.data.com_like || 0);
          // (선택사항) 로그인한 유저가 이미 좋아요를 눌렀는지 여부 데이터가 있다면 백엔드 기준 설정 가능
          // 현재는 기본값 false로 세팅하되 데이터 구조에 맞춰 수정 가능합니다.
        }
      } catch (error) {
        console.error("게시글 상세 내용을 불러오는 중 오류 발생:", error);
        alert("존재하지 않거나 삭제된 게시글입니다.");
        navigate('/community'); // 에러 발생 시 목록으로 튕겨내기
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) {
      fetchPostDetail();
    }
  }, [postId, navigate]);

  // 2. 좋아요 버튼 클릭 이벤트 처리
  const handleLikeClick = async () => {
    try {
      // 서버에 좋아요 요청 보내기
      await setCommunityLike(postId);

      // 토글 형태로 상태 변경 (서버가 정상 처리되었다고 가정)
      setLiked((prevLiked) => !prevLiked);
      setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
      
      // 만약 스프링 백엔드에서 좋아요 클릭 후 '갱신된 총 좋아요 수'를 응답(response.data)으로 준다면
      // const response = await setCommunityLike(postId);
      // setLikeCount(response.data); 
      // 형태로 정확하게 동기화하는 것이 더 안전합니다.
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생:", error);
      alert("좋아요 처리에 실패했습니다.");
    }
  };

  // 로딩 중 화면 표시
  if (isLoading) {
    return (
      <main className="page community-detail-page">
        <section className="card detail-card" style={{ textAlign: 'center', padding: '40px' }}>
          <p>데이터를 불러오는 중입니다...</p>
        </section>
      </main>
    );
  }

  // 데이터가 없을 때 방어 코드
  if (!post) {
    return (
      <main className="page community-detail-page">
        <section className="card detail-card" style={{ textAlign: 'center', padding: '40px' }}>
          <p>게시글을 찾을 수 없습니다.</p>
          <button className="btn-outline" onClick={() => navigate('/community')}>목록으로</button>
        </section>
      </main>
    );
  }

  return (
    <main className="page community-detail-page">
      <section className="card detail-card">
        {/* 목록에서 카테고리를 post.category로 매핑했으니 그대로 유지 혹은 컬럼명에 맞게 변경 */}
        <span className="category-badge detail-badge">{post.category || '일반'}</span>

        <h2>{post.com_title}</h2>

        <div className="detail-meta">
          <span>작성자 : {post.mem_id}</span>
          <span>작성일 : {post.com_created}</span>
          <span>조회수 : {post.com_view}</span>
        </div>

        <div className="detail-content">
          {/* 백엔드에서 글 내용 본문이 오는 필드명(예: com_content)으로 맞춰주세요 */}
          <p>{post.com_content || "내용이 없습니다."}</p>
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