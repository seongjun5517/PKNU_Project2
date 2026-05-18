// 기본적으로 React 라이브러리 불러들여놓기
import React from "react";

// 페이지 이동 링크
import {Link, useNavigate} from "react-router-dom";

// 외부 CSS 파일 불러들이기
import "../css/HomePage.css";

// HomePage.js 정의
function HomePage(){

    const navigate = useNavigate(); 
    const loginMember = localStorage.getItem(
            "loginMember"
        );

    /**
     * 마이페이지 이동
     */
    const moveMyPage = () => {

        if(!loginMember){

            alert(
                "로그인 후 이용 가능합니다."
            );

            navigate("/login");
            return;
        }

        navigate("/mypage");
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
                {!loginMember ? (

                <>
                    {/* 로그인 */}
                    <Link to="/login">
                        <button className="right-menu-button">

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
                            onClick={() => {localStorage.removeItem(
                                                "loginMember"
                                            );

                            alert("로그아웃 완료되었습니다!!!");
                            navigate("/");
                        }}>

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

                    {/* 버튼 */}

                    <div style={{marginTop : "30px"}}>

                        <Link to="/login">

                            <button className="main-button">
                                로그인
                            </button>

                        </Link>

                        <Link to="/join">

                            <button className="sub-button">
                                회원가입
                            </button>

                        </Link>

                    </div>

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