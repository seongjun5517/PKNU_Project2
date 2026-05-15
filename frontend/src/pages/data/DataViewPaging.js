// 기본 라이브러리 불러들이기
import React, {useState, useEffect} from "react";

// 링크처리를 위한 네비게이션 및 파라메터값을 전달 받을 때 사용하는 라이브러리 불러들이기
// - useParams : 요청시 전달받아온 파라메터를 자동으로 받아내는 상태 파라메터 변수
import {useNavigate, useParams} from "react-router-dom";

// SpringBoot 백엔드 요청 및 응답 처리를 위한 함수가 정의된 파일 불러들이기
import {getDataView} from "../../springApi/dataSpringBootApi";

// SpringBoot 백엔드에서 삭제 처리 함수 호출
import {setDataDelete} from "../../springApi/dataSpringBootApi";



// 해당 페이지 몸체 정의
const DataViewPaging = () => {
    
    // 전달 받은 파라메터를 담을 상태변수 정의
    //  - 이미 메모리에 저정되어 있는 파라메터 변수를 사용하기에 중괄호로 사용
    const {data_id, page} = useParams();

    // 페이지 이동을 위한 네비게이트 정의
    const navigate = useNavigate();

    // SpringBoot 백엔드에서 처리한 회원상세정보를 담을 상태변수 정의
    //  - 회원 정보 하나의 행값은 -> 딕셔너리 타입으로 정의되어 있음
    const [data, setData] = useState({});

    
    // 최초 페이지 로딩(실행)시 중간에 백엔드 요청 처리 함수 호출
    useEffect(() => {
        //SpringBoot 상세정보 요청 및 응답 받아오기 위한 함수 정의
        const dataView = () => {
            // 상세정보 요청 함수 호출
            //  - 상세보기에서는 특정 회원의 아이디(전달 받은 파라메터)를 매개변수로 넘겨주기
            getDataView(data_id)
                // 백엔드로부터 응답 받아온 데이터 처리 영역
                .then((res) => {
                    // 응답 받은 res.data 값을 상태변수에 저장시키기
                    setData(res.data);
                })
                // 백엔드 처리시 오류 처리 영역
                .catch((err) => {
                    console.error(">>>>>>> 상세조회 오류 발생 : ", err);
                });
        };

        // 함수는 호출해야 사용 가능
        // - 페이지 리로드시 항상 실행됨
        dataView();

    }, [data_id]);


    // 회원 [삭제] 버튼 처를 위한 함수 정의(SpringBoot 백엔드 처리 진행됨)
    const handleDelete = () => {
        // 정말로 삭제할 것인지 물어보기(재확인)
        //  - 삭제 안할래요~처리
        if(!window.confirm("정말로 삭제하시겠어요?(예:삭제, 아니오:취소)"))
            return;

        // SpringBoot 백엔드에 삭제 요청하기
        // - 삭제 함수 호출하기
        setDataDelete(data_id)
            // 정상 처리
            .then(() => {
                alert("정상적으로 삭제 되었습니다.");

                // 삭제 후 전체 리스트 페이지로 이동
                navigate("/data/list_paging?page="+page);
            })
            // 오류 처리
            .catch((err) => {
                console.error(">>>>>>>>>>> 회원 삭제 오류 : ", err);
            });
    };


    // 브라우저에 보여질 페이지 그리기
    return(
        <div>
            <h3>데이터 정보</h3>
            <hr/>
            {/* 테이블 형식으로 모든 컬럼 출력 */}
            <table>
                <tbody>
                    {data && Object.entries(data).map(([key, value]) => (
                        <tr key={key}>
                            <td>
                                {key}
                            </td>
                            <td>
                                {typeof value === 'object' ? JSON.stringify(value) : String(value ?? '')}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button onClick={() => handleDelete()}>삭제</button>
                <button onClick={() => navigate("/data/list_paging?page="+page)}>목록</button>
            </div>


        </div>
    );
};

export default DataViewPaging;