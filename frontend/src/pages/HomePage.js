// 기본적으로 React 라이브러리 불러들여놓기
import React from "react";

// -------- OAuth2 인증을 위해 Paging 처리를 위해 추가 ----
//  - OAuth2 인증 체계에서는 React 라우터를 통한 페이지 이동만 유지됨
//  - 따라서, 모든 페이지 이동을 위한 링크 처리는 Link 또는 Navigate를 통해서 진행
// 페이지 이동 링크
import {Link, useNavigate} from "react-router-dom";
import { useAuth } from "../pages/user/AuthContext";

// 외부 CSS 파일 불러들이기
import "../css/HomePage.css";

function HomePage(){

    const navigate = useNavigate(); 
    const { user, logout } = useAuth();

    /**
     * 마이페이지 이동
    */
    const moveMyPage = () => {

        if(!user){

            console.log(user)

            alert(
                "로그인 후 이용 가능합니다."
            );

            navigate("/login");
            return;
        }
        console.log(user)
        navigate("/mypage");
    };

    const handleLogout = () => {
        logout(); // 상태 트리 변경 + 로컬스토리지 삭제 일괄 처리
        alert("로그아웃 완료되었습니다");
        navigate("/"); // 안전하게 메인 경로로 상태 유지 리다이렉트
    };

    return(
        <div className="home-container">

            {/* =========================
                상단 Navbar
            ========================= */}

            <div className="top-menu">

                {/* 왼쪽 로고 */}
                <div>
                    <h1 className="logo">
                        HEALTH CARE
                    </h1>
                </div>

                {/* 가운데 메뉴 */}
                <div>
                    <Link to="/member/list_paging">

                        <button className="menu-button">
                            회원
                        </button>
                    </Link>

                    <Link to="/data/list_paging">

                        <button className="menu-button">
                            건강 데이터
                        </button>

                    </Link>

                    <Link to="/chart">

                        <button className="menu-button">
                            통계/차트
                        </button>

                    </Link>

                    <Link to="/community/list_paging">

                        <button className="menu-button">
                            커뮤니티
                        </button>

                    </Link>

                </div>

                {/* =========================
                    오른쪽 메뉴
                    ========================= */}
                <div>
                {!user ? (

                <>
                    {/* 로그인 */}
                    <Link to="/login"> <button className="right-menu-button">

                            로그인

                        </button>

                    </Link>

                    {/* 회원가입 */}
                    <Link to="/join">
                        <button className="right-menu-button">

                            회원가입

                        </button>

                    </Link>

                </>

            )

            :

            (
                <>
                    {/* 마이페이지 */}
                    <button className="right-menu-button"
                            onClick={moveMyPage}>

                        마이페이지
                    </button>

                    {/* 로그아웃 */}
                    <button className="right-menu-button"
                            onClick={handleLogout}>

                        로그아웃
                    </button>

                        </>
                            )
                        }
                </div>

            </div>

            {/* =========================
                메인 배너
            ========================= */}

            <div className="banner">

                {/* 왼쪽 설명 */}
                <div>

                    <h1 className="title">

                        건강한 오늘,
                        더 나은 내일을 위해

                    </h1>

                    <h1 className="title-blue">

                        건강을 관리하고
                        예측하세요

                    </h1>

                    <p className="text">

                        건강 데이터를 기록하고
                        분석하여

                    </p>

                    <p className="text">

                        나에게 맞는 건강 습관을
                        만들어보세요.

                    </p>

                </div>

                {/* 오른쪽 이미지 */}

                <div>
                    <img
                        src="https://images.unsplash.com/photo-1518611012118-696072aa579a"
                        alt="health"
                        className="banner-image"
                    />
                </div>

            </div>

            {/* =========================
                기능 카드
            ========================= */}

            <div className="card-grid">

            {/* 회원관리 */}

            <Link to="/member/list_paging"
                  className="card-link">
                    
                <div className="card">

                    <h3>
                        회원 관리
                    </h3>

                    <p>
                        회원 정보 관리
                    </p>

                </div>

            </Link>

            {/* 건강 데이터 */}

            <Link to="/data/list_paging"
                  className="card-link">

                <div className="card">

                    <h3>
                        건강 데이터
                    </h3>

                    <p>
                        건강 데이터 기록
                    </p>

                </div>

            </Link>

            {/* 통계 */}

            <Link to="/chart"
                  className="card-link">

                <div className="card">

                    <h3>
                        통계/차트
                    </h3>

                    <p>
                        건강 통계 시각화
                    </p>

                </div>

            </Link>

            {/* 커뮤니티 */}

            <Link to="/community/list_paging"
                  className="card-link">

                <div className="card">

                    <h3>
                        커뮤니티
                    </h3>

                    <p>
                        게시글
                    </p>

                </div>

            </Link>

            {/* 마이페이지 */}

            <div className="card-link"
                onClick={moveMyPage}
                style={{cursor : "pointer"}}>

                <div className="card">

                    <h3>
                        마이페이지
                    </h3>

                    <p>
                        내 정보 및 활동
                    </p>

                </div>

            </div>

    </div>


    {/* =========================
            Footer
        ========================= */}

        <div className="footer">

            ⓒ 2026 건강 관리 시스템

        </div>

        </div>

        );
    }

export default HomePage;