import React, { useEffect, useState } from "react";
import { Button, Form, Input } from 'antd';
import { message } from 'antd';

import { RegisterUser } from "../../../../services/AuthService/registerUser";
import './ThemTK.css';


const ThemTK = ({ setToggle, success, getAllNVRefetch }) => {
    const { registerUserResponse, registerUserError, callRegisterUserRefetch } = RegisterUser();

    useEffect(() => {
        if (registerUserResponse) {
            success('tạo tài khoản thành công');
            setToggle(false);
            getAllNVRefetch();

        } else if (registerUserError) {
            error();
        }
    }, [registerUserResponse, registerUserError]);

    const [messageApi, contextHolder] = message.useMessage();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'tài khoản đã tồn tại',
        });
    };


    const handleAddTK = (e) => {
        e.preventDefault();
        callRegisterUserRefetch(formData);
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
            initialValues={{ remember: true }}
            autoComplete="off"
            className="Form_ADD_NV"
        >
            <h5>Thêm tài khoản Nhân Viên mới</h5>
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Nhập username!' }]}
            >
                <Input name="username" onChange={handleChange} />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Nhập password!' }]}
            >
                <Input.Password name="password" onChange={handleChange} />
            </Form.Item>
            <div className="btn_Cancel_Submit">

                <Button onClick={() => { setToggle(false) }} danger >
                    Hủy
                </Button>
                <Button onClick={handleAddTK} type="primary" >
                    Xác nhận
                </Button>
            </div>
        </Form>
    </>
}

export default ThemTK;