import React, {useEffect,useState} from "react";

import {getCommentList,setCommentInsert,setCommentDelete} from "../../springApi/commentSpringBootApi";

function CommentPage(){

    /**
     * 게시글 번호
     * 테스트용
    */
    const comId = 1;

    /**
     * 댓글 목록
    */
    const [commentList, setCommentList] = useState([]);

    /**
     * 댓글 입력
    */
    const [commentContent, setCommentContent] = useState("");

    /**
     * 로그인 사용자
    */
    const loginMember = localStorage.getItem("loginMember");

    /**
     * 댓글 목록 조회
    */
    const getList = async() => {

        try{
            const response = await getCommentList(comId);

            setCommentList(response.data);

        }
        
        catch(error){

            console.log(error);
        }
    };

    /**
     * 최초 실행
    */
    useEffect(() => {

        getList();

    }, []);

    /**
     * 댓글 등록
    */
    const insertComment = async() => {

        if(!loginMember){

            alert("로그인 후 이용하세요.");

            return;
        }

        if(commentContent.trim() === ""){

            alert("댓글 내용을 입력하세요.");

            return;
        }

        try{

            const comment = {

                comId : comId,
                memId : loginMember,
                commentContent : commentContent
            };

            await setCommentInsert(comment);

            alert("댓글 등록 완료");
            setCommentContent("");
            getList();

        }
        
        catch(error){

            console.log(error);
        }
    };

    /**
     * 댓글 삭제
    */
    const deleteComment = async(comment) => {

        try{

            await setCommentDelete(

                comment.comId,
                comment.memId,
                comment.commentCreated
            );

            alert("삭제 완료");

            getList();

        }
        
        catch(error){

            console.log(error);
        }
    };

    

    return(
        <div style={{width : "70%",margin : "50px auto"}}>
            <h2>
                댓글
            </h2>

            <hr/>

            {/* 댓글 입력 */}
            <div style={{marginBottom : "30px"}}>
                <textarea
                    rows="4"
                    style={{width : "100%",
                            padding : "15px"
                           }}

                    value={commentContent}
                    onChange={(e) =>setCommentContent(
                            e.target.value
                        )
                    }
                />

                <button onClick={insertComment}
                        style={{marginTop : "10px",
                                padding : "10px 20px"
                          }}>
                    댓글 등록
                </button>

                <button>
                    수정
                </button>

            </div>

            {/* 댓글 목록 */}
            {commentList.map((comment, idx) => (
                    <div key={idx}
                         style={{ border : "1px solid #cccccc",
                                  padding : "15px",
                                  marginBottom : "15px",
                                  borderRadius : "10px"
                                }}>

                        <h4>
                            작성자 :
                            {" "}
                            {comment.memId}
                        </h4>

                        <p>
                            {comment.commentContent}
                        </p>

                        <small>
                            {comment.commentCreated}
                        </small>

                        <br/>
                        {loginMember === comment.memId && (
                                <button onClick={() => deleteComment(comment)}
                                        style={{marginTop : "10px"}}>
                                    삭제
                                </button>
                            )
                        }
                    </div>
                ))
            }

        </div>
    );
}

export default CommentPage;