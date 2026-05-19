import React, {useEffect,useState}from "react";

import {Link} from "react-router-dom";
import {getCommunityPaging} from "../../springApi/communitySpringBootApi";

function CommunityListPaging(){

    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const size = 10;

/**
 * 데이터 조회
*/
useEffect(() => {

    const loadData = async() => {

        try{

            const res = await getCommunityPaging(page,size);

            setList(
                res.data.content
            );

            setTotalPages(
                res.data.totalPages
            );
        }

        catch(error){

            console.log(error);
        }
    };

        loadData();

    }, [page]);

    /**
     * 페이지 번호 배열
    */
    const pageNumbers = [];

    for(let i = 1; i <= totalPages;i++){

        pageNumbers.push(i);
    }

    return(

        <div>

            <h2>
                게시판 목록
            </h2>

            <div
              style={{marginBottom : "10px"}}>
              <Link to="/community/insert">

              <button type="button">
                    게시글 등록
              </button>

              </Link>

            <Link to="/">

                <button type="button" style={{marginLeft : "10px"}}>
                    Home 바로가기
                </button>

            </Link>
                    
                
            </div>

            <table border="1"
                   width="100%"
                   style={{textAlign : "center"}}>

                <thead>

                    <tr>

                        <th>
                            번호
                        </th>

                        <th>
                            제목
                        </th>

                        <th>
                            작성자
                        </th>

                        <th>
                            조회수
                        </th>

                        <th>
                            좋아요
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {list.map((item) => (

                        <tr
                            key={item.com_id}>

                            <td>
                                {item.com_id}
                            </td>

                            <td>

                                <Link to={`/community/view/${item.com_id}`}>

                                    {item.com_title}

                                </Link>

                            </td>

                            <td>
                                {item.mem_id}
                            </td>

                            <td>
                                {item.com_view}
                            </td>

                            <td>
                                {item.com_like}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            {/* 페이징 버튼 */}

            <div
              style={{marginTop : "20px", textAlign : "center"}}>

                {/* 이전 */}
                <button

                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}>

                    이전

                </button>

                {/* 페이지 번호 */}

                {pageNumbers.map((num) => (

                    <button

                        key={num}

                        onClick={() =>setPage(num)}

                        style={{fontWeight :page === num? "bold" : "normal",
                                marginLeft : "5px"
                        }}>

                        {num}

                    </button>

                ))}

                {/* 다음 */}

                <button

                    disabled={
                        page === totalPages
                    }

                    onClick={() =>
                        setPage(page + 1)
                    }

                    style={{
                        marginLeft : "5px"
                    }}>

                    다음

                </button>

            </div>

        </div>
    );
}

export default CommunityListPaging;