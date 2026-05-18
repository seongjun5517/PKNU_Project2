import React from "react";
import {Routes,Route} from "react-router-dom";
import MyPage from "../pages/mypage/MyPage";

function MyPageRouters(){
    return(
        <Routes>
            <Route path="/mypage" element={<MyPage />}/>
        </Routes>
    );
}

export default MyPageRouters;