// React 라이브러리 가져오기
// import React from "react";

/* ################################################################ */
/*  OAuth2.0 */
/* ################################################################ */
// useContext : 전역적(서버영역 전체 페이지)으로 관리되는 상태 관리 훅(Hoc)
//  - 이 훅에 변수 AuthContext.jsx에서 정의한 로그인 상태 정보를 저장해서 사용하게됨
import React from 'react';
/* ################################################################ */

// React Router 라이브러리 가져오기
import {BrowserRouter} from "react-router-dom";

// HomeRouters.js 컴포넌트(기능, 페이지 같은 의미) 가지고 오기
//  - 공통으로 사용할 컴포넌트
import HomeRouters from "./routers/HomeRouters";
import MemberRouters from './routers/MemberRouters';
import CommunityRouters from './routers/CommunityRouters';
import DataRouters from './routers/DataRouters';
import MyPageRouters from './routers/MypageRouters';

/* ################################################################ */
/*  OAuth2.0 */
/* ################################################################ */
// 구글 로그인 버튼 및 인증 처리
// import GoogleLoginButton from './components/user/GoogleLoginButton';

// 카카오 로그인 버튼 및 인증 처리(카카오 인증키는 이곳에 넣게 됩니다) 
// import KakaoLoginButton from './components/user/KakaoLoginButton';

// 구글 및 카카오 로그아웃 처리
// import LogoutButton from './components/user/LogoutButton';

// 회원 로그인 인증 데이터를 담아놓을 파일(로그인 처리에 사용)
import { AuthProvider } from './pages/user/AuthContext';

// 구글 인증 처리 라이브러리(사전 설치 필요)
import { GoogleOAuthProvider } from '@react-oauth/google';
/* ################################################################ */

import PredictRouters from "./routers/PredictRouters";
import GraphRouters from "./routers/GraphRouters";


/* ################################################################ */
/*  OAuth2.0 적용에 따른 -> 로그인/로그아웃 처리
/* ################################################################ */
// 실제 화면을 구성하는 컴포넌트
const Home = () => {

    return (
        <div style={{ padding: '30px' }}>

            {/* ------------------기존것 그대로 추가------------------- */}
            <BrowserRouter>

                {/* <LogoutButton /> */}
                {/* <GoogleLoginButton /> */}

                {/* HomeRouters.js 컴포넌트(페이지) 적용하기 */}
                {/*  - 공통으로 사용할 메뉴 구성에 대한 링크 처리 */}
                <HomeRouters />
                
                {/* MemberRouters.js 컴포넌트(페이지) 적용하기 */}
                {/*   - 회원정보 관리(전체조회, 상세조회, 입력, 수정, 삭제)에 대한 링크 처리 */}
                <MemberRouters />

                <CommunityRouters />

                <DataRouters />

                <MyPageRouters />

                {/* 예측 페이지 */}
                <PredictRouters />

                {/* 그래프 페이지 */}
                <GraphRouters/>

            </BrowserRouter>

        </div>


    );
};

// 최상위 App 컴포넌트 정의
const App = () => {
  
  return (
    <div style={{ padding: '50px' }}>
        {/* <h1>홈페이지</h1> */}

       {/* 구글 인증을 위햇 전체 애플리케이션을 라우터로 감싸기
          - 클라이언트 ID 넣기 */}
        <GoogleOAuthProvider 
            clientId="367426272482-ka4k6k25jnd11jhism95uocjtndnnc3v.apps.googleusercontent.com">
        
            {/* AuthContext.js에서 구현한 -> 사용자 정의 상태 관리 훅(Hoc) */}
            <AuthProvider>
            
            {/* AuthContext.js에서 children(하위 컴포넌트)으로 처리됨
                하위 컴포넌트에서는 로그인 사용자 정보를 공유 받아서 사용 가능 */}
            <Home />

            </AuthProvider>

        </GoogleOAuthProvider>
    </div>
      
    );
};

export default App;
<<<<<<< HEAD
=======
     



 

>>>>>>> minjae
