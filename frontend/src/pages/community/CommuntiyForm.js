import React from "react";

import {useNavigate} from "react-router-dom";

function CommunityForm({
        community,
        changeData,
        submitData,
        isUpdate = false
    })

{
    const navigate = useNavigate();

    return(

        <form onSubmit={submitData}>
             {/* 게시글 번호 */}
            <div>
                <p>
                    게시글 번호
                </p>

                <input
                    type="number"
                    name="com_id"
                    value={community?.com_id || ""}
                    onChange={changeData}
                    disabled={isUpdate}
                />
            </div>

            {/* 작성자 */}

            <div>

                <p>
                    작성자
                </p>

                <input
                    type="text"
                    name="mem_id"
                    value={community?.mem_id || ""}
                    onChange={changeData}
                />
            </div>

            {/* 제목 */}

            <div>

                <p>
                    제목
                </p>

                <input
                    type="text"
                    name="com_title"
                    value={community?.com_title || ""}
                    onChange={changeData}
                />

            </div>

            {/* 내용 */}

            <div>
                <p>
                    내용
                </p>

                <textarea
                    name="com_content"
                    rows="10"
                    cols="50"
                    value={community?.com_content || ""}
                    onChange={changeData}
                />

            </div>

            {/* 버튼 */}

            <button type="submit">

                {isUpdate ? "수정" : "등록"}

            </button>

            <button

                type="button"
                onClick={() => navigate("/community/list_paging")}
                style={{marginLeft : "10px"}}>

                취소

            </button>

        </form>
    );
}

export default CommunityForm;
