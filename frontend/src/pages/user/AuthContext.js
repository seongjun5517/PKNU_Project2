// ////////// 구글 + 카카오톡 동시 사용 //////////////
// import React, { createContext, useState } from 'react';

// // 서버 전역에서 사용할 수 있는 React Context 객체를 생성
// export const AuthContext = createContext();

// // 모든 하위(children) 컴포넌트(페이지를 의미)의 상태값을 담을 -> 사용자 정의 훅(Hoc) 정의
// // - children : AuthProvider 내부에 감싸진 모든 하위 컴포넌트(페이지)들을 의미함
// //            : 하위 컴포넌트로 포함된 경우에 로그인 사용자 정보를 공유 받을 수 있음

// export const AuthProvider = ({ children }) => {
//     // 사용자 정보 관리
//     const [user, setUser] = useState(null);

//     // 로그인 함수 정의(사용자 정보 받아와서 사용자 정보에 담기)
//     const login = (userInfo) => setUser(userInfo);

//     // 로그아웃 함수 정의(사용자 정보 삭제처리)
//     const logout = () => setUser(null);

//     return (
//         // 서버 전역에서 사용할 수 있도록 처리
//         //  - AuthContext.Provider를 통해 서버 전역으로 데이터 공유가 이루어짐
//         //  - 외부 페이지에서는 아래와 같이 선언 및 정의하여 사용하면됨
//         //    const { login } = useContext(AuthContext); // 로그인시
//         //    const { logout, user } = useContext(AuthContext); // 로그아웃시
//         <AuthContext.Provider value={{ user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

////////// 구글 + 카카오톡 동시 사용 //////////////
import React, { createContext, useState } from 'react';

// 서버 전역에서 사용할 수 있는 React Context 객체를 생성
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // 1. 초기값 설정 시 로컬 스토리지 검증 (새로고침 대응 핵심)
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user_info");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // 2. 로그인 처리 함수 확장
    const login = (userInfo) => {
        setUser(userInfo);
        // 브라우저 저장소는 문자열만 지원하므로 객체를 문자열로 직렬화하여 저장
        localStorage.setItem("user_info", JSON.stringify(userInfo));
    };

    // 3. 로그아웃 처리 함수 확장
    const logout = () => {
        setUser(null);
        // 로그아웃 시 저장소 비우기
        localStorage.removeItem("user_info");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


