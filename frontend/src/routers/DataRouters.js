/* 회원관련 URL 매핑 하는 파일 */

import React from "react";

// Routes 및 Route 라이브러리
import {Routes, Route} from "react-router-dom";


/* --------------- Paging 추가 ---------------- */
import DataListPaging from "../pages/data/DataListPaging";
import DataViewPaging from "../pages/data/DataViewPaging";


function DataRouters(){
    return(
        <Routes>
            {/* 회원 전체 목록 조회하기 : MemberListPage.js */}
            {/* <Route path="/data/list" element={<DataListPage />} /> */}

            {/* 회원 상세 보기 조회하기 : MemberViewPage.js
                - :mem_id : mem_id = 값 형태로 셋팅해서 전달함
            */}
            {/* <Route path="/data/view/:data_id" element={<DataViewPage />} /> */}

            {/* 회원 신규 추가하기 : MemberInsertPage.js */}
            {/* <Route path="/data/insert" element={<DataInsertPage />} /> */}

            {/* ------------- Paging 추가 ------------- */}
            {/* 회원 전체 목록 조회하기 : MemberListPaging.js */}
            <Route path="/data/list_paging" element={<DataListPaging />} />

            {/* 회원 상세 정보 조회하기 : MemberViewPage.js */}
            <Route path="/data/view_paging/:data_id/:page" 
                    element={<DataViewPaging />} />

        </Routes>
    );
}

export default DataRouters;