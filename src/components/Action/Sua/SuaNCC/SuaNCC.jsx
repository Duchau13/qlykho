import React, { useEffect, useState } from "react";
import { Button, Form, Input } from 'antd';
import { message } from 'antd';
import httpClient from "../../../../utils/axiosInstance";
import { SuaNCCByID } from "../../../../services/Nhacungcap/SuaNCC";
import { GetNCCByID } from "../../../../services/Nhacungcap/GetNccByID";
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const SuaNCC = ({ setToggle, getAllNccRefetch,idKho }) => {

    const { SuaNCCResponse, SuaNCCError, callSuaNCC } = SuaNCCByID();
    const { getSPResponse, getSPError, getSPRefetch } = GetNCCByID(idKho);
    useEffect(() => {
        if (SuaNCCResponse) {
            success()
            setTimeout(() => {
                setToggle(false)
                getAllNccRefetch();
            }, 2000);
        } else if (SuaNCCError) {
            error();
        }
    }, [SuaNCCResponse, SuaNCCError]);
    console.log(getSPResponse);
    const [messageApi, contextHolder] = message.useMessage();
    const [formData, setFormData] = useState({
        tenKho: "",
        email: "",
        address: "",
        sdt: ""
    });


    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'sửa thông tin danh mục thành công',
        });
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Thay đổi thông tin thất bại',
        });
    };


    const handleSuaKho = (e) => {
        console.log(idKho,formData);
        e.preventDefault();
        callSuaNCC(idKho,formData);
        console.log(callSuaNCC(idKho,formData));
        success();
    }
    const handleSuaNcc = async(id) => {
        try{
            //setItems(items.filter((item) => item.id_item !== item.id_item));
            await httpClient.put(`/NhaCungCap/sua/${idKho}`,formData)
            //console.log(item.id_item)
            .then((err) =>{
                toast.success(`${err.data.message}`, {
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
                    setToggle(false)
                  }, 2000);
                console.log(err);
            })
        }
        catch (err){
          toast.error(`${err.data.message}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          console.log(err);
        }

    }
    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    return <>
        {contextHolder}
        {
            getSPResponse ?
        
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            autoComplete="off"
            className="Form_ADD_NV"
            initialValues = {getSPResponse.data}
        >
            <h5>Sửa Nhà Cung Cấp</h5>
            <Form.Item
                label="Tên nhà cung cấp"
                name="tenNCC"
                rules={[{ required: true, message: 'Nhập Tên Nhà Cung Cấp!' }]}
            >
                <Input name="tenNCC" onChange={handleChange} />
            </Form.Item>
            <Form.Item
                label="email"
                name="email"
                rules={[{ required: true, message: 'Nhập email!' }]}
            >
                <Input name="email" onChange={handleChange} />
            </Form.Item>
            <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: 'Nhập Địa chỉ kho!' }]}
            >
                <Input name="address" onChange={handleChange} />
            </Form.Item>
            <Form.Item
                label="Số điện thoại"
                name="sdt"
                rules={[{ required: true, message: 'Nhập Số đt!' }]}
            >
                <Input name="sdt" onChange={handleChange} />
            </Form.Item>



            <div className="btn_Cancel_Submit">

                <Button onClick={() => { setToggle(false) }} danger >
                    Hủy
                </Button>
                <Button onClick={handleSuaNcc} type="primary" >
                    Xác nhận
                </Button>
            </div>
        </Form >:""
    }
    <ToastContainer 
                position="top-right"
                autoClose={5000}
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

export default SuaNCC;