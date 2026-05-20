/* 회원관련 URL 매핑 하는 파일 */

import React from "react";

// Routes 및 Route 라이브러리
import {Routes, Route} from "react-router-dom";

// 회원 신규 추가하기 : MemberInsertPage.js
import MemberInsertPage from "../pages/member/MemberInsertPage";

/* --------------- Paging 추가 ---------------- */
import MemberListPaging from "../pages/member/MemberListPaging";
import MemberViewPaging from "../pages/member/MemberViewPaging";
import LoginPage from "../pages/member/LoginPage";


function MemberRouters(){
    return(
        <Routes>

            {/* 회원 신규 추가하기 : MemberInsertPage.js */}
            <Route path="/member/insert" element={<MemberInsertPage />} />

            {/* ------------- Paging 추가 ------------- */}
            {/* 회원 전체 목록 조회하기 : MemberListPaging.js */}
            <Route path="/member/list_paging" element={<MemberListPaging />} />

            {/* 회원 상세 정보 조회하기 : MemberViewPage.js */}
            <Route path="/member/view_paging/:mem_id/:page" 
                   element={<MemberViewPaging />} />

            <Route path="/login" element={< LoginPage/>} />


        </Routes>
    );
}

export default MemberRouters;