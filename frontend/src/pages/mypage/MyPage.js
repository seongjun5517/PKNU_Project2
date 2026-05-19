import React from "react";

import {Link, useNavigate} from "react-router-dom";

import "../../css/MyPage.css";

function MyPage() {

    const navigate = useNavigate();

    /**
     * 로그인 사용자
    */
    const user_info = JSON.parse(
        localStorage.getItem("user_info")
    );

    console.log(user_info);

    /**
     * 로그아웃
    */
    const logout = () => {localStorage.removeItem("user_info");

        alert(
            "로그아웃 완료되었습니다.."
        );

        navigate("/");
    };

    return (

        <div className="mypage-container">

            {/* 제목 */}
            <div className="mypage-header">

                <h1>
                    마이페이지
                </h1>

                <p>
                    환영합니다!!!
                    {" "}

                    <b>
                        {JSON.parse(localStorage.getItem('user_info')).name}
                    </b>
                    님
                </p>

            </div>

            {/* 카드 영역 */}
            <div className="mypage-card-grid">

                {/* 내 정보 */}
                <div className="mypage-card">

                    <h3>
                        내 정보
                    </h3>

                    <p>
                        회원 정보 조회 및 수정
                    </p>

                    <Link to={`/member/view_paging/${user_info.id}/${1}`}>

                        <button className="mypage-button">
                            이동
                        </button>

                    </Link>

                </div>

                {/* 건강 데이터 */}
                <div className="mypage-card">

                    <h3>
                        건강 데이터
                    </h3>

                    <p>
                        내 건강 데이터 조회
                    </p>

                    <Link to="/data/list_paging">

                        <button className="mypage-button">
                            이동
                        </button>

                    </Link>

                </div>

                {/* 내 게시글 */}
                <div className="mypage-card">

                    <h3>
                        내 게시글
                    </h3>

                    <p>
                        내가 작성한 게시글
                    </p>

                    <Link to={`/community/list_paging?mem_id=${user_info.id}`}>

                        <button className="mypage-button">
                            이동
                        </button>

                    </Link>

                </div>

            </div>

            {/* 하단 버튼 */}
            <div className="mypage-footer">

                {/* Home */}
                <Link to="/">
                    <button className="home-button">
                        Home
                    </button>

                </Link>

                {/* 로그아웃 */}
                <button className="logout-button" onClick={logout}>
                    로그아웃
                </button>

            </div>

        </div>
    );
}

export default MyPage;