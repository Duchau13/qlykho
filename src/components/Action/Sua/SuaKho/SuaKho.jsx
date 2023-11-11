import React, { useEffect, useState } from "react";
import { Button, Form, Input } from 'antd';
import { message } from 'antd';
import { SuaKhoByID } from '../../../../services/Kho/SuaKho'
import { ChiTietKho } from "../../../../services/Kho/ChiTietKho";
import httpClient from "../../../../utils/axiosInstance";
import { GetKhoByID } from "../../../../services/Kho/GetCTkhoByID";

const SuaKho = ({ setToggle, getAllKhoRefetch,idKho }) => {
    const [datakho,setDataKho] = useState({})
    const { SuaKhoResponse, SuaKhoError, callSuaKho } = SuaKhoByID(idKho);
    const { getSPResponse, getSPError, getSPRefetch } = GetKhoByID(idKho);
    useEffect(() => {
        if (SuaKhoResponse) {
            success()
            setTimeout(() => {
                setToggle(false)
                getAllKhoRefetch();
            }, 2000);
        } else if (SuaKhoError) {
            error();
        }
    }, [SuaKhoResponse, SuaKhoError]);
    const [messageApi, contextHolder] = message.useMessage();
    const [formData, setFormData] = useState({
        tenKho: "",
        email: "",
        address: "",
        sdt: ""
    });

    useEffect(() => {
        
        async function getData(){
          const res = await httpClient.get(`/kho/${idKho}`)
          return res
        }
        getData().then((res) => {
            // console.log(res)
            setDataKho(res.data.data)
        })
        getData().catch((err) => {
          console.log(err)
        })
        console.log(1)
    },[])

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Sửa thông tin thành công',
        });
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Sửa thất bại',
        });
    };


    const handleSuaKho = (e) => {
        e.preventDefault();
        callSuaKho(idKho,formData);
        // success();
    }

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }
    console.log(formData)
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
            <h5>Sửa Kho</h5>
            <Form.Item
                label="Tên kho"
                name="tenKho"
                rules={[{ required: true, message: 'Nhập Tên Kho!' }]}
            >
                <Input name="tenKho" onChange={handleChange} />
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
                <Button onClick={handleSuaKho} type="primary" >
                    Xác nhận
                </Button>
            </div>
        </Form >
        :""
    }
    </>
}

export default SuaKho;