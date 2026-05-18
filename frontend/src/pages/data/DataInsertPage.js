import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import {setDataInsert}from "../../springApi/dataSpringBootApi";

import DataForm from "./DataForm";

function DataInsertPage(){

    const navigate = useNavigate();

    const [data, setData] = useState({

        mem_id : "user01",
        he_hp : "",
        he_glu : "",
        he_chol : "",
        he_bmi : "",
        predict : ""

    });

    /**
     * 수정
    */
    const changeData = (e) => {

        setData({

            ...data,

            [e.target.name]
                : e.target.value
        });
    };

    /**
     * 등록
    */
    const submitData =
        async(e) => {

        e.preventDefault();

        try{
            await setDataInsert(data);
            alert("등록 완료");
            navigate("/data/list_paging");

        }

        catch(error){

            console.log(error);
            console.log(error.response);
        }
    };

    return(

        <div>

            <h2>
                건강 데이터 등록
            </h2>

            <DataForm

                data={data}
                changeData={changeData}
                submitData={submitData}

            />

        </div>
    );
}

export default DataInsertPage;
