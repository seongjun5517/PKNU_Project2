import React from "react";

import {Routes,Route} from "react-router-dom";

import CommunityListPaging from "../pages/community/CommunityListPaging";
import CommunityViewPage from "../pages/community/CommunityViewPage";
import CommunityInsertPage from "../pages/community/CommunityInsertPage";

function CommunityRouters(){

    return(

        <Routes>

            {/* 게시판 목록 */}
            <Route path="/community/list_Paging"
                   element={<CommunityListPaging />}
            />

            {/* 게시글 상세 */}
            <Route path="/community/view/:com_id"
                   element={<CommunityViewPage />}
            />

            {/* 게시글 등록 */}
            <Route path="/community/insert"
                   element={<CommunityInsertPage />}
            />

            <Route path="/community/update/:com_id"
                   element={<CommunityInsertPage />}
            />

        </Routes>
    );
}

export default CommunityRouters;
