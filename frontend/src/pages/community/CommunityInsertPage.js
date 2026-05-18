import React, {useState} from "react";

import {useNavigate}from "react-router-dom";

import {setCommunityInsert} from "../../springApi/communitySpringBootApi";

function CommunityInsertPage(){

    const navigate = useNavigate();
    const [community,setCommunity] = useState({

        mem_id : "user01",
        com_title : "",
        com_content : ""

    });

  
    const changeData = (e) => {

        setCommunity({

            ...community,

            [e.target.name]: e.target.value
        });
    };

    const submitData =
        async(e) => {

        e.preventDefault();

        await setCommunityInsert(
            community
        );

        navigate("/community/list_paging");
    };

    return(

        <div>
            <h2>게시글 등록 페이지</h2>
            <hr/>

            <form onSubmit={submitData}>

                <div>
                    <p>
                        게시글 등록하기
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
                    등록
                </button>

                <button type="button"
                        onClick={() => navigate("/community/list_paging")}>
                    취소
                </button>

            </form>

        </div>
    );
}

export default CommunityInsertPage;