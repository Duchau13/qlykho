import React, { useEffect, useState } from "react";
import { Button, Form } from 'antd';

import ThemViTriKho from "../Them/ThemVTKho/ThemVTKho";
import { XoaVTKhoByID } from "../../../services/ViTriKho/XoaViTriKho";
import { FormXacNhan } from "../../FormXacNhan/FormXacNhan";

import httpClient from "../../../utils/axiosInstance";
import { Messeage_ViTriKho_04 } from "../../../Messeages/Messeages";
import { Messeage_ViTriKho_05 } from "../../../Messeages/Messeages";

const CTKho = ({ error,success,setToggle, ChiTietKhoResponse, idKho, ChiTietKhoCall }) => {
    const { xoaVTKhoResponse, xoaVTKhoError, xoaVTKhoLoading, callXoaVTKho } = XoaVTKhoByID();
    const [toggleXoa, setToggleXoa] = useState(false);
    const [ID, setID] = useState();
    console.log(idKho)
    
    const handleXoa = (id) => {
        setToggleXoa(true);
        setID(id);
    }
    const actionXoa = () =>{
        callXoaVTKho(ID);
        setToggleXoa(false);

    }
    const handleCallRefetch = () => {
        ChiTietKhoCall(idKho);
    }
    const [toggleThemVTKho, setToggleThemVTKho] = useState(false);

    useEffect(()=>{
        if(xoaVTKhoResponse){
            success(Messeage_ViTriKho_04)
            handleCallRefetch();
        }
        if(xoaVTKhoError){
            error(Messeage_ViTriKho_05)
        }
    },[xoaVTKhoResponse,xoaVTKhoError])
    console.log(ChiTietKhoResponse)
    return <>
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            autoComplete="off"
            className="Form_ADD_NV"
        >
            <h5>Chi Tiết Kho</h5>
            <table className="table table__Kho">
                <thead>
                    <tr>
                        <th scope="col">Cột</th>
                        <th scope="col">Hàng</th>
                        <th scope="col">Kệ</th>
                        <th scope="col">Số Lượng</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ChiTietKhoResponse ? ChiTietKhoResponse.map((value, index) => {

                            return (
                                <tr key={index}>
                                    <th>{value.cot}</th>
                                    <th>{value.hang}</th>
                                    <th>{value.ke}</th>
                                    <th>{value.soLuong}</th>
                                    <Button onClick={() => handleXoa(value.id)} danger >
                                        Xóa
                                    </Button>
                                </tr>
                            );
                        }) : 'Chưa có dữ liệu'
                    }
                </tbody>
            </table>


            <div className="btn_Cancel_Submit">

                <Button onClick={() => { setToggle(false) }} danger >
                    Thoát
                </Button>
                <Button onClick={() => { setToggleThemVTKho(true) }} >
                    Tạo vị trí kho
                </Button>
            </div>
            {toggleThemVTKho ?
                <div className="container_FormThemTK">
                    <ThemViTriKho handleCallRefetch={handleCallRefetch} idKho={idKho} ChiTietKhoCall={ChiTietKhoCall} setToggle={setToggleThemVTKho} />
                </div> : ''
            }
            {toggleXoa ?
                <div className="container_FormThemTK">
                    <FormXacNhan message={'Bạn có chắc chắn xóa không?'} setToggle={setToggleXoa} action={actionXoa} />
                </div> : ''
            }
        </Form >
    </>
}

export default CTKho;