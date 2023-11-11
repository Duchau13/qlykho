import React, { useEffect, useState } from "react";
import { Button, Form, Input } from 'antd';
import { message } from 'antd';
import { ThemVTKhoService } from "../../../../services/ViTriKho/ThemViTriKho";
import { ChiTietKho } from "../../../../services/Kho/ChiTietKho";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import httpClient from "../../../../utils/axiosInstance";

import { Messeage_ViTriKho_01 } from "../../../../Messeages/Messeages";
import { Messeage_ViTriKho_02 } from "../../../../Messeages/Messeages";
import { Messeage_ViTriKho_03 } from "../../../../Messeages/Messeages";
import { ColorFactory } from "antd/es/color-picker/color";

const ThemViTriKho = ({setToggle, idKho,handleCallRefetch }) => {
    const {ThemVTKhoResponse,ThemVTKhoError,ThemVTKhoLoading,callThemVTKho} = ThemVTKhoService();
    const { ChiTietKhoResponse, ChiTietKhoIsLoading, ChiTietKhoError, ChiTietKhoCall } = ChiTietKho();
    const [messageApi, contextHolder] = message.useMessage();
    const [messeage,setMesseage] = useState(false)
    console.log(ThemVTKhoResponse);
    useEffect(() => {
        if (ThemVTKhoResponse) {
            setToggle(false);
            handleCallRefetch();
            success();
        }
        else if (ThemVTKhoError) {
            error();
        }
    }, [ThemVTKhoResponse,ThemVTKhoError]);

    const [formData, setFormData] = useState({
        hang:'',
        cot:'',
        ke:'',
        kho:{
            id: idKho,
        }
    });
    // const handleSubmit = (e) =>{
    
    //     try{
    //     {
    //         httpClient.post('vitrikho/them', formData,
    //         )
    //         .then(res =>{
    //             toast.success(`${Messeage_ViTriKho_02}`, {
    //                 position: "top-right",
    //                 autoClose: 2000,
    //                 hideProgressBar: true,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "light",
    //             });
    //             setTimeout(() => {
    //                 setToggle(false);
                    
    //             }, 2000);
    //         })
    //         .catch(err =>{
    //             toast.error(`${Messeage_ViTriKho_03}`, {
    //                 position: "top-right",
    //                 autoClose: 2000,
    //                 hideProgressBar: true,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "light",
    //             });;
    //         })
    //     }
        
    //     }catch(error){
    //         console.log(error);
    //     }
    // }
    const handleChange = (name, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [name] : value
        }));
    }

    // const handleThemViTriKho = (e) => {
        // e.preventDefault();
        // callThemVTKho(formData);
        // ChiTietKhoCall(idKho);
    // };
    const handleThemViTriKho = (e) => {
        e.preventDefault();
        console.log("1")
        if(formData.hang == '' || formData.cot == ''|| formData.ke == '') {
            setMesseage(true)
        }
        else{
            e.preventDefault();
            callThemVTKho(formData);
            toast.success('Thêm Mới Thành Công', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => {
                ChiTietKhoCall(idKho);
                
            }, 2000);    
        }
    }
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Thêm vị trí kho thành công',
        });
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Thêm thất bại',
        });
    };

    return <>
        {contextHolder}
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            autoComplete="off"
            className="Form_ADD_NV"
        >
            <Form.Item
                label="Cột"
                name="cot"
                rules={[{ required: true, message: '' }]}
            >
                <Input name="cot" onChange={(e) => handleChange('cot', e.target.value)}  value={formData.cot}/>
            </Form.Item>

            <Form.Item
                label="Hàng"
                name="hang"
                rules={[{ required: true, message: 'Nhập Tên DM!' }]}
            >
                <Input name="hang" onChange={(e) => handleChange('hang', e.target.value)}  value={formData.hang} />
            </Form.Item>

            <Form.Item
                label="Kệ"
                name="ke"
                rules={[{ required: true, message: 'Nhập Tên DM!' }]}
            >
                <Input name="ke" oninvalid="this.setCustomValidity('Lütfen işaretli yerleri doldurunuz')" required onChange={(e) => handleChange('ke', e.target.value)}  value={formData.ke}/>
            </Form.Item>
            {messeage==true
                ? <h5 style={{color:"red"}}>Vui Lòng Nhập Đầy Đủ Thông Tin</h5>
                : ""
            }
            <div className="btn_Cancel_Submit">

                <Button onClick={() => { setToggle(false) }} danger >
                    Hủy
                </Button>
                <Button  type="primary" onClick={handleThemViTriKho} >
                    Xác nhận
                </Button>
            </div>
        </Form >
        <ToastContainer 
            position="top-right"
            autoClose={1500}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    </>
}
export default ThemViTriKho;