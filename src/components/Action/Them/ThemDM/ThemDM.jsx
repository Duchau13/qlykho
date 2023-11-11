import React, { useEffect, useState } from "react";
import { Button, Form, Input } from 'antd';
import { message } from 'antd';

import { ThemDMService } from "../../../../services/DanhMuc/themDM";
import './ThemDM.css';


const ThemDM = ({ setToggle, getAllDanhMucRefetch }) => {

    const { themDMResponse, themDMError, callthemDM } = ThemDMService();
    useEffect(() => {
        if (themDMResponse) {
            setTimeout(() => {
                setToggle(false)
                getAllDanhMucRefetch();
            }, 2000);
        } else if (themDMError) {
            error();
        }
    }, [themDMResponse, themDMError]);

    const [messageApi, contextHolder] = message.useMessage();
    const [formData, setFormData] = useState({
        tenDM: "",
    });


    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Thêm Danh Mục thành công',
        });
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Tên Danh Mục Bị Trùng',
        });
    };


    const handleAddKho = (e) => {
        e.preventDefault();
        callthemDM(formData);
        success();
    }

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

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
            <h5>Thêm Danh Mục</h5>
            <Form.Item
                label="Tên danh mục"
                name="tenDM"
                rules={[{ required: true, message: 'Nhập Tên DM!' }]}
            >
                <Input name="tenDM" onChange={handleChange} />
            </Form.Item>


            <div className="btn_Cancel_Submit">

                <Button onClick={() => { setToggle(false) }} danger >
                    Hủy
                </Button>
                <Button onClick={handleAddKho} type="primary" >
                    Xác nhận
                </Button>
            </div>
        </Form >
    </>
}

export default ThemDM;