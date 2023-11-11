import React, { useEffect, useState } from "react";
import { Button, Form, Input } from 'antd';
import { message } from 'antd';

import { ChangepasswordService } from "../../../../services/AuthService/ChangePass";

const ChangePass = ({ setToggle, success }) => {

    const { changepasswordResponse, changepasswordIsLoading, changepasswordError, callchangepasswordRefetch } = ChangepasswordService();
    useEffect(() => {
        if (changepasswordResponse) {
            setToggle(false);
            success();
        } else if (changepasswordError) {
            error();
        }
    }, [changepasswordResponse, changepasswordError]);

    const [messageApi, contextHolder] = message.useMessage();
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: ''
    });



    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Mật khẩu sai,hãy kiểm tra lại',
        });
    };


    const handleDoiMatKhau = (e) => {
        e.preventDefault();
        callchangepasswordRefetch(formData);
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
            <h5>Đổi mật khẩu</h5>
            <Form.Item
                label="Mật khẩu cũ"
                name="oldPassword"
                rules={[{ required: true, message: 'Nhập Tên Danh Mục!' }]}
            >
                <Input name="oldPassword" onChange={handleChange} />
            </Form.Item>
            <Form.Item
                label="Mật khẩu mới"
                name="newPassword"
                rules={[{ required: true, message: 'Nhập Tên Danh Mục!' }]}
            >
                <Input name="newPassword" onChange={handleChange} />
            </Form.Item>


            <div className="btn_Cancel_Submit">

                <Button onClick={() => { setToggle(false) }} danger >
                    Hủy
                </Button>
                <Button onClick={handleDoiMatKhau} type="primary" >
                    Xác nhận
                </Button>
            </div>
        </Form >
    </>
}

export default ChangePass;