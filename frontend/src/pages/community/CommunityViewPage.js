import React, {useEffect, useState, useCallback} from "react";

import {useParams} from "react-router-dom";
import {useNavigate}from "react-router-dom";
import {getCommunityView,setCommunityLike} from "../../springApi/communitySpringBootApi";

function CommunityViewPage(){

    const navigate = useNavigate();

    const { com_id } =
        useParams();

    const [data, setData]
        = useState({});

    const loadData = useCallback(
    async() => {const res =await getCommunityView(com_id);

        setData(res.data);

    },

    [com_id]
);

useEffect(() => {

    loadData();

}, [loadData]);

const likePost = async() => {

    await setCommunityLike(com_id);
    loadData();
};

    return(

        <div>

            <h2>
                게시글 상세
            </h2>

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

        </div>
    );
}

export default CommunityViewPage;