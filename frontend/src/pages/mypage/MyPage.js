import React from "react";

import {Link, useNavigate}from "react-router-dom";

function MyPage(){

    const navigate =
        useNavigate();

    /**
     * 로그인 사용자
     */
    const loginMember =
        localStorage.getItem(
            "loginMember"
        );

    /**
     * 로그아웃
    */
    const logout = () => {

        localStorage.removeItem(
            "loginMember"
        );

        alert(
            "로그아웃 완료"
        );

        navigate("/");
    };

    return(

        <div
            style={{
                    width : "80%",
                    margin : "0 auto",
                    padding : "30px"
            }}>

            {/* 제목 */}

            <div
                style={{
                        textAlign : "center",
                        marginBottom : "50px"
                }}>

                <h1>
                    마이페이지
                </h1>

                <p>
                    환영합니다!!!
                    {" "}

                    <b>
                        {loginMember}
                    </b>
                    님
                </p>

            </div>

            {/* 카드 영역 */}
            <div
                style={{display : "grid",
                        gridTemplateColumns :"repeat(3, 1fr)",
                        gap : "20px"
                }}>

                {/* 내 정보 */}

                <div
                    style={cardStyle}>
                    <h3>
                        내 정보
                    </h3>
                    <p>
                        회원 정보 조회 및 수정
                    </p>
                    <Link to="/member/list_paging">
                        <button style={buttonStyle}>
                            이동
                        </button>
                    </Link>

                </div>

                {/* 건강 데이터 */}
                <div style={cardStyle}>
                    <h3>
                        건강 데이터
                    </h3>

                    <p>
                        내 건강 데이터 조회
                    </p>

                    <Link to="/data/list_paging">

                        <button style={buttonStyle}>
                            이동
                        </button>
                    </Link>

                </div>

                {/* 내 게시글 */}
                <div
                    style={cardStyle}>
                    <h3>
                        내 게시글
                    </h3>

                    <p>
                        내가 작성한 게시글
                    </p>

                    <Link to="/community/list_paging">
                        <button style={buttonStyle}>
                            이동
                        </button>
                    </Link>

                </div>

            </div>

            {/* 하단 버튼 */}
            <div style={{
                            textAlign : "center",
                            marginTop : "50px"               
                        }}>

                {/* Home */}
                <Link to="/">
                    <button style={homeButtonStyle}>
                        Home
                    </button>
                </Link>

                {/* 로그아웃 */}
                <button style={logoutButtonStyle}
                    onClick={logout}>
                    로그아웃
                </button>

            </div>

        </div>
    );
}

/**
 * 카드 스타일
 */
const cardStyle = {
    border : "1px solid #cccccc",
    borderRadius : "10px",
    padding : "30px",
    textAlign : "center",
    boxShadow : "0 2px 5px rgba(0,0,0,0.2)"
};

/**
 * 기본 버튼 스타일
*/
const buttonStyle = {

    padding : "10px 20px",
    border : "none",
    borderRadius : "5px",
    backgroundColor : "#4CAF50",
    color : "white",
    cursor : "pointer"
};

/**
 * Home 버튼
*/
const homeButtonStyle = {

    padding : "12px 30px",
    border : "none",
    borderRadius : "5px",
    backgroundColor : "#333333",
    color : "white",
    cursor : "pointer",
    marginRight : "15px"
};

/**
 * 로그아웃 버튼
*/
const logoutButtonStyle = {

    padding : "12px 30px",
    border : "none",
    borderRadius : "5px",
    backgroundColor : "#d9534f",
    color : "white",
    cursor : "pointer"
};

export default MyPage;