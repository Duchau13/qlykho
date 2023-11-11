import React, { useEffect, useState } from "react";
import { Button, Form, Input } from 'antd';
import { message } from 'antd';

import { ForgotPassService } from "../../../services/AuthService/ForgotPass";


const QuenMK = ({ setToggle, success }) => {

    const { ForgotPassResponse, callForgotPassRefetch } = ForgotPassService();
    
    
    useEffect(() => {
        if (ForgotPassResponse) {
            if (ForgotPassResponse.success)
                {
                    
                    success()
                    setToggle(false);
                }
                else {
                    setTimeout(() => {
                        error();
                    }, 2000);
                    setTimeout(() => {
                        error();
                        setToggle(false);
                    }, 4000);
                }
        }
        
    }, [ForgotPassResponse]);

    const [messageApi, contextHolder] = message.useMessage();
    const [formData, setFormData] = useState({
        email: "",
    });


    const loading = () => {
        messageApi.open({
          type: 'loading',
          content: 'Đang kiểm tra thông tin gmail!..',
          duration: 0,
        });
    }

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Không tìm thấy địa chỉ email',
        });
    };


    const handleAddKho = (e) => {
        e.preventDefault();
        loading()
        callForgotPassRefetch(formData.email);
        
    }

    const handleChange = (e) => {
        setFormData(() => ({
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
            <h5>Quên mật khẩu</h5>

            <Form.Item
                label="Nhập email xác thực"
                name="email"
                rules={[{ required: true, message: 'Nhập email!' }]}
            >
                <Input name="email" onChange={handleChange} />
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

export default QuenMK;