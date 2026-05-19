import React, {useEffect, useState, useCallback} from "react";

import {useParams,useNavigate} from "react-router-dom";

import {getCommunityView,setCommunityLike} from "../../springApi/communitySpringBootApi";

import {getCommentList,setCommentInsert,setCommentDelete,setCommentUpdate} from "../../springApi/commentSpringBootApi";

function CommunityViewPage(){

    const navigate = useNavigate();
    const { com_id } = useParams();

    /**
     * 로그인 사용자
    */
    const user_info = JSON.parse(localStorage.getItem("user_info"));

    /**
     * 게시글 데이터
    */
    const [data, setData] = useState({});

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

    /**
     * 게시글 조회
    */
    const loadData = useCallback(

        async() => {

            const res = await getCommunityView(com_id);

            setData(res.data);
        },

        [com_id]
    );

    /**
     * 댓글 조회
    */
    const getList = useCallback(

        async() => {

            try{const response = await getCommentList(com_id);

                setCommentList(
                    response.data
                );

            }

            catch(error){

                console.log(error);
            }
        },

        [com_id]
    );

    /**
     * 최초 실행
    */
    useEffect(() => {

        loadData();

        getList();

    }, [loadData, getList]);

    /**
     * 좋아요
    */
    const likePost = async() => {

        await setCommunityLike(
            com_id
        );

        setData({
            
            ...data,
            com_like : data.com_like + 1
        });
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
                comid : Number(com_id),
                memid : user_info.id,
                commentcontent : commentContent
            };

            await setCommentInsert(
                comment
            );

            alert(
                "댓글 등록 완료되었습니다!!!"
            );

            setCommentContent("");
            getList();

        }

        catch(error){

            console.log(error);

            console.log(
                error.response
            );

            console.log(
                error.response?.data
            );

            alert(
                JSON.stringify(
                    error.response?.data
             ))           
        }
    };

    /**
     * 댓글 수정
    */
    const updateComment = async() => {

        try{
            const comment = {

                comid : editComment.comId,
                memid :editComment.memId,
                commentcreated :  editComment.commentCreated,
                commentcontent : commentContent
            };

            await setCommentUpdate(
                comment
            );

            alert(
                "수정 완료되었습니다!!!"
            );

            setEditComment(null);
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
            const result = await setCommentDelete(
                comment.comid,
                comment.memid,
                comment.commentcreated.substring(0, 19)
            );

            console.log(result.data);
            alert(result.data);
            getList();

        }

        catch(error){

            console.log(error);
            alert("삭제 실패하였습니다!!!");
        }
    };

    return(

        <div style={{
                width : "70%",
                margin : "50px auto"
            }}>

            <h2>
                게시글 상세
            </h2>

            <hr/>

            <p>
                번호 :
                {data.com_id}
            </p>

            <p>
                제목 :
                {data.com_title}
            </p>

            <p>
                작성자 :
                {data.mem_id}
            </p>

            <p>
                내용 :
                {data.com_content}
            </p>

            <p>
                조회수 :
                {data.com_view}
            </p>

            <p>
                좋아요 :
                {data.com_like}
            </p>

            <button onClick={likePost}>
                좋아요
            </button>

            <button onClick={() => navigate("/community/list_paging")}>
                이전
            </button>

            <button onClick={() => navigate(`/community/update/${com_id}`)}>
                수정
            </button>

            <hr/>

            <h2>
                댓글
            </h2>

            {/* 댓글 입력 */}

            <div style={{marginBottom : "30px"}}>

                <textarea
                    rows="4"
                    style={{
                        width : "100%",
                        padding : "15px"
                    }}

                    value={commentContent}
                    onChange={(e) => setCommentContent(
                            e.target.value
                        )
                    }
                />

                <br/>

                <button  onClick={() => {

                        if(editComment){
                            updateComment();
                        }

                        else{

                            insertComment();
                        }
                    }}

                    style={{
                        marginTop : "10px",
                        padding : "10px 20px"
                    }}>

                    {editComment ? "댓글 수정"  : "댓글 등록"}

                </button>

            </div>

            {/* 댓글 목록 */}

            { commentList.map(

                    (comment, idx) => (

                    <div
                        key={idx}
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

                                            setEditComment(
                                                comment
                                            );

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

                                    <button onClick={() => deleteComment(comment)}
                                            style={{ marginTop : "10px" }}>
                                        삭제
                                    </button>

                                </>
                            )
                        }

                    </div>
                ))
            }

        </div>
    );
}

export default CommunityViewPage;
