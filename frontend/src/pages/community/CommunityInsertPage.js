import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {setCommunityInsert, getCommunityView, setCommunityUpdate} from "../../springApi/communitySpringBootApi";

function CommunityInsertPage(){

    const navigate = useNavigate();

    const {com_id} = useParams();

    const [community,setCommunity] = useState({

        mem_id : "shintra0070@gmail.com",
        com_title : "",
        com_content : ""

    });

    // 수정 페이지일 때 기존 데이터 불러오기
    useEffect(() => {

        if(com_id){

            const loadData = async() => {
                const res = await getCommunityView(com_id);
                setCommunity(res.data);
            };

            loadData();
        }

    }, [com_id]);

    const changeData = (e) => {

        setCommunity({

            ...community,

            [e.target.name]: e.target.value
        });
    };

    const submitData =
        async(e) => {

        e.preventDefault();

        // 수정
        if(com_id){

            await setCommunityUpdate(
                community
            );

            navigate(`/community/view/${com_id}`);
        }

        // 등록
        else{

            await setCommunityInsert(
                community
            );

            navigate("/community/list_paging");
        }
    };

    return(

        <div>

            <h2>

                {com_id ? "게시글 수정 페이지" : "게시글 등록 페이지"}

            </h2>

            <hr/>

            <form onSubmit={submitData}>

                <div>

                    <p>

                        {com_id ? "게시글 수정하기" : "게시글 등록하기"}

                    </p>

                </div>

                <div>

                    <input
                        type="text"
                        name="com_title"
                        placeholder="제목"
                        value={community.com_title}
                        onChange={changeData}
                    />

                </div>

                <div>

                    <textarea
                        name="com_content"
                        placeholder="내용"
                        value={community.com_content}
                        onChange={changeData}
                    />

                </div>

                <button type="submit">

                    {com_id ? "수정" : "등록"}

                </button>

                <button
                    type="button"
                    onClick={() => navigate("/community/list_paging")}>

                    취소

                </button>

            </form>

        </div>
    );
}

export default CommunityInsertPage;
