import React, { useState, useEffect } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';

import '../../styles/pages/CommunityPage.css';

// 사용할 API 임포트
import {getCommunityView,setCommunityLike,setCommunityDelete} from "../../springApi/communitySpringBootApi";

import {getCommentList,setCommentInsert,setCommentDelete,setCommentUpdate} from "../../springApi/commentSpringBootApi";

function CommunityDetailPage() {

  const navigate = useNavigate();
  const { postId } = useParams(); // App.js 라우터 설정에 따라 com_id 또는 postId로 매핑됩니다.

  /**
   * 로그인 사용자
  */
  const user_info = JSON.parse(
      localStorage.getItem("user_info")
    );

  // 게시글 상세 데이터를 저장할 상태
  const [post, setPost] = useState(null);

  // 로딩 상태 및 좋아요 상태
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  /**
   * 댓글 목록
  */
  const [commentList, setCommentList] = useState([]);

  /**
   * 댓글 입력
  */
  const [commentContent, setCommentContent] = useState("");

  /**
   * 수정중 댓글
   */
  const [editComment, setEditComment] = useState(null);

  // 1. 페이지 로드 시 해당 게시글 상세 데이터 가져오기
  useEffect(() => {

    const fetchPostDetail = async () => {
      try {
        setIsLoading(true);
        // useParams로 가져온 postId(또는 com_id)로 단건 조회 API 호출
        const response =
          await getCommunityView(postId);

        if (response.data) {

          setPost(response.data);

          // 백엔드에서 받아온 초기 좋아요 수 설정
          setLikeCount(
            response.data.com_like || 0
          );

          // (선택사항) 로그인한 유저가 이미 좋아요를 눌렀는지 여부 데이터가 있다면 백엔드 기준 설정 가능
          // 현재는 기본값 false로 세팅하되 데이터 구조에 맞춰 수정 가능합니다.
        }

      } 
      
      catch (error) {

        console.error(
          "게시글 상세 내용을 불러오는 중 오류 발생:",
          error
        );

        alert(
          "존재하지 않거나 삭제된 게시글입니다."
        );

        navigate('/community'); // 에러 발생 시 목록으로 튕겨내기
      } 
      
      finally {

        setIsLoading(false);
      }
    };

    /**
     * 댓글 목록 조회
    */
    const fetchCommentList = async() => {

      try{
        const response = await getCommentList(postId);

        setCommentList(response.data);

      }

      catch(error){

        console.log(error);
      }
    };

    if (postId) {

      fetchPostDetail();
      fetchCommentList();
    }

  }, [postId, navigate]);

  // 2. 좋아요 버튼 클릭 이벤트 처리
  const handleLikeClick = async () => {

    if(!user_info){

      alert("로그인 후 이용하세요.");
      return;
    }

    // 게시글별 좋아요 key 생성
    const likeKey = `like_${postId}_${user_info.email}`;

    // 이미 좋아요 눌렀는지 확인
    const isLiked = localStorage.getItem(likeKey);

    if(isLiked){

      alert("이미 좋아요를 눌렀습니다.");

      return;
    }

    try {

      // 서버에 좋아요 요청 보내기
      await setCommunityLike(postId);

      // localStorage 저장
      localStorage.setItem(
        likeKey,
        "true"
      );

      // 토글 형태로 상태 변경 (서버가 정상 처리되었다고 가정)
      setLiked((prevLiked) => !prevLiked);

      setLikeCount((prevCount) =>
        (liked ? prevCount - 1 : prevCount + 1)
      );
      
      // 만약 스프링 백엔드에서 좋아요 클릭 후 '갱신된 총 좋아요 수'를 응답(response.data)으로 준다면
      // const response = await setCommunityLike(postId);
      // setLikeCount(response.data); 
      // 형태로 정확하게 동기화하는 것이 더 안전합니다.

      alert("좋아요 완료");

    }

    catch (error) {

      console.error(
        "좋아요 처리 중 오류 발생:",
        error
      );

      alert("좋아요 처리에 실패했습니다.");
    }
  };

  /**
   * 게시글 삭제
  */
  const deletePost = async() => {

    if(!window.confirm("게시글을 삭제하시겠습니까?")){
          return;
    }

    try{

      await setCommunityDelete(postId);
      alert(
        "게시글 삭제 완료되었습니다!!!"
      );

      navigate("/community");

    }

    catch(error){

      console.log(error);

      alert(
          "게시글 삭제 실패하였습니다!!!"
      );
    }
  };

  /**
   * 댓글 목록 다시 조회
  */
  const reloadCommentList = async() => {

    try{
      const response = await getCommentList(postId);

      setCommentList(
        response.data
      );

    }

    catch(error){

      console.log(error);
    }
  };

  /**
   * 댓글 등록
  */
  const insertComment = async() => {

    if(!user_info){

      alert(
        "로그인 후 이용하세요."
      );

      return;
    }

    if(commentContent.trim() === ""){

      alert(
        "댓글 내용을 입력하세요."
      );

      return;
    }

    try{

      const comment = {

        comid : Number(postId),
        memid : user_info.mem_id,
        commentcontent : commentContent
      };

      await setCommentInsert(comment);

      alert(
        "댓글 등록 완료되었습니다!!!"
      );

      setCommentContent("");

      reloadCommentList();

    }

    catch(error){

      console.log(error);

      alert(
        "댓글 등록 실패하였습니다!!!"
      );
    }
  };

  /**
   * 댓글 수정
  */
  const updateComment = async() => {



    try{

      const comment = {

        comid : editComment.comid,
        memid : editComment.memid,
        commentcreated : editComment.commentcreated,
        commentcontent : commentContent
      };

      await setCommentUpdate(comment);

      alert(
        "댓글 수정 완료되었습니다!!!"
      );

      setEditComment(null);
      setCommentContent("");
      reloadCommentList();

    }

    catch(error){

      console.log(error);

      alert(
        "댓글 수정 실패하였습니다!!!"
      );
    }
  };

  /**
   * 댓글 삭제
   */
  const deleteComment = async(comment) => {

    try{

      const result = await setCommentDelete(

          comment.comid,
          comment.memid.trim(),
          comment.commentcreated.substring(0, 16)
        );

      console.log(result.data);

      if(result.data.includes("성공")){

        alert(
          "댓글 삭제 완료되었습니다!!!"
        );

        reloadCommentList();
      }

      else{

        alert(
          "댓글 삭제 실패하였습니다!!!"
        );
      }

    }

    catch(error){

      console.log(error);

      alert(
        "댓글 삭제 실패하였습니다!!!"
      );
    }
  };

  // 로딩 중 화면 표시
  if (isLoading) {

    return (

      <main className="page community-detail-page">

        <section
          className="card detail-card"
          style={{
                  textAlign: 'center',
                  padding: '40px'
              }}>

          <p>
            데이터를 불러오는 중입니다...
          </p>

        </section>

      </main>
    );
  }

  // 데이터가 없을 때 방어 코드
  if (!post) {

    return (

      <main className="page community-detail-page">
        <section
          className="card detail-card"
          style={{
            textAlign: 'center',
            padding: '40px'
          }}>

          <p>
            게시글을 찾을 수 없습니다.
          </p>

          <button
            className="btn-outline"
            onClick={() => navigate('/community')}>

            목록
          </button>

        </section>

      </main>
    );
  }

  return (

    <main className="page community-detail-page">

      <section className="card detail-card">

        {/* 목록에서 카테고리를 post.category로 매핑했으니 그대로 유지 혹은 컬럼명에 맞게 변경 */}

        <span className="category-badge detail-badge">
          {post.com_category || '일반'}
        </span>

        <h2>
          {post.com_title}
        </h2>

        <div className="detail-meta">

          <span>
            작성자 : {post.mem_id}
          </span>

          <span>
            작성일 : {post.com_created}
          </span>

          <span>
            조회수 : {post.com_view}
          </span>

        </div>

        <div className="detail-content">

          {/* 백엔드에서 글 내용 본문이 오는 필드명(예: com_content)으로 맞춰주세요 */}

          <p>

            {post.com_content || "내용이 없습니다."}

          </p>

        </div>

        <div className="detail-action-row"
              style={{
                        display : "flex",
                        justifyContent : "space-between",
                        alignItems : "center"
                    }}>

            {/* 왼쪽 버튼 */}
            <div>
              <button
                type="button"
                className={liked ? 'like-button active' : 'like-button'}
                onClick={handleLikeClick}>

                ♥ 좋아요 {likeCount}

              </button>

              <button
                className="btn-outline"
                onClick={() => navigate('/community')}
                style={{marginLeft : "10px"}}>

                목록으로

              </button>

            </div>



            {/* 오른쪽 버튼 - 작성자만 표시 */}
            <div>
              {user_info && user_info.mem_id === post.mem_id && (
                <>
                  <button
                    className="btn-outline"
                    onClick={() => navigate(`/community/edit/${postId}`)}
                    style={{marginRight : "10px"}}>
                    수정
                  </button>

                  <button
                    className="btn-outline"
                    onClick={deletePost}>
                    삭제
                  </button>
                </>
              )}
            </div>

      </div>

        {/* =========================
            댓글 영역
        ========================= */}

        <hr style={{margin : "40px 0"}}/>

        <h3>
          댓글
        </h3>

        {/* 댓글 입력 */}

        <div style={{marginBottom : "30px"}}>

          <textarea rows="4"
                    style={{width : "100%",
                            padding : "15px"
                          }}

                    value={commentContent}
                    onChange={(e) => 
                    setCommentContent(
                        e.target.value
                    )
                  }
          />

          <br/>

          <button onClick={() => {

              if(editComment){
                updateComment();
              }

              else{
                insertComment();
              }
            }}

            style={{marginTop : "10px",
                    padding : "10px 20px"}}>

            {editComment ? "댓글 수정": "댓글 등록"}

          </button>

        </div>

        {/* 댓글 목록 */}

        {commentList.map( (comment, idx) => (

              <div key={idx}
                   style={{
                              border : "1px solid #cccccc",
                              padding : "15px",
                              marginBottom : "15px",
                              borderRadius : "10px"
                          }}>
                <h4>
                  작성자 :
                  {" "}
                  {comment.memid}

                </h4>

                <p>

                  {comment.commentcontent}

                </p>

                <small>

                  {comment.commentcreated}

                </small>

                <br/>

                {user_info?.id === comment.memid && (

                    <>
                      <button onClick={() => {

                          setEditComment(comment);
                          setCommentContent(
                            comment.commentcontent
                          );
                        }}

                        style={{
                                  marginTop : "10px",
                                  marginRight : "10px"
                              }}>

                        수정

                      </button>

                      <button onClick={() =>
                          deleteComment(comment)}

                        style={{
                                  marginTop : "10px",
                                  marginRight : "10px"
                              }}>

                        삭제

                      </button>

                    </>
                  )
                }

              </div>
            ))
        }

      </section>

    </main>
  );
}

export default CommunityDetailPage;