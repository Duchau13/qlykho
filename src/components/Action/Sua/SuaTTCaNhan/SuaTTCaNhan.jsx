import React, { useState, useEffect } from "react";
import { Button, Form, Input } from 'antd';
import { message } from 'antd';

import { EditUserInfor } from "../../../../services/AuthService/editUserInfor";
import './SuaTTCaNhan.css';
import ChangePass from "./ChangePass";


const SuaTTCaNhan = ({ successTT,setToggle, getRefetch, getInforUserResponse }) => {


    const { editUserInforResponse, editUserInforError, callEditUserRefetch } = EditUserInfor();

    useEffect(() => {
        if (getInforUserResponse) {
            setFormData(() => ({
                ...getInforUserResponse.data,
            }));
        }

    }, [getInforUserResponse]);

    useEffect(() => {
        if (editUserInforError) {
            error();
        } else if (editUserInforResponse) {
            setToggle(false);
            successTT();
            getRefetch();
        }

    }, [editUserInforResponse, editUserInforError]);


    const [messageApi, contextHolder] = message.useMessage();
    const [formData, setFormData] = useState({});
    const [toggleDoiMK, setToggleDoiMK] = useState(false);


    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Đổi thành công',
        });
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Sửa thất bại',
        });
    };


    const handleAddTK = (e) => {
        e.preventDefault();
        callEditUserRefetch(formData);
    }

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }
    const handleDoiMK = () => {
        setToggleDoiMK(true)
    }

    return <>
        {contextHolder}
        {
            getInforUserResponse ? <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={getInforUserResponse.data}
                autoComplete="off"
                className="Form_SuaTTCN"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ message: 'Nhập username!' }]}
                >
                    <Input name="username" disabled={true} onChange={handleChange} placeholder={getInforUserResponse.data.userName} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ message: 'Nhập password!' }]}
                >
                    <div className="btn_doimatkhau">
                        <Input.Password disabled={true} name="password" placeholder='**********' />
                        <Button onClick={handleDoiMK} type="primary" >
                            Đổi mật khẩu
                        </Button>
                    </div>
                </Form.Item>

                <Form.Item
                    label="Chức vụ"
                    name="role"
                    rules={[{ message: 'Nhập Chức vụ!' }]}
                >
                    <Input.Password disabled={true} name="role" onChange={handleChange} placeholder={getInforUserResponse.data.role} />
                </Form.Item>

                <Form.Item
                    label="Họ"
                    name="ho"
                    rules={[{ message: 'Nhập Họ' }]}
                >
                    <Input name="ho" onChange={handleChange} />
                </Form.Item>

                <Form.Item
                    label="Tên"
                    name="ten"
                    rules={[{ message: 'Nhập Tên' }]}
                    initialValues="Default Username"
                >
                    <Input name="ten" onChange={handleChange} />
                </Form.Item>

                <Form.Item
                    label="email"
                    name="email"
                    rules={[{ message: 'Nhập email!' }]}
                >
                    <Input name="email" onChange={handleChange} />
                </Form.Item>
                <Form.Item
                    label="Địa chỉ"
                    name="address"
                    rules={[{ message: 'Nhập Địa chỉ!' }]}
                >
                    <Input name="address" onChange={handleChange} />
                </Form.Item>

                <Form.Item
                    label="Số điện thoại"
                    name="sdt"
                    rules={[{ message: 'Nhập Số điện thoại!' }]}
                >
                    <Input name="sdt" onChange={handleChange} />
                </Form.Item>

                <Form.Item
                    label="CCCD"
                    name="cccd"
                    rules={[{ message: 'Nhập CCCD!' }]}
                >
                    <Input name="cccd" onChange={handleChange} />
                </Form.Item>


                <div className="btn_Cancel_Submit">

                    <Button onClick={() => { setToggle(false) }} danger >
                        Hủy
                    </Button>
                    <Button onClick={handleAddTK} type="primary" >
                        Xác nhận
                    </Button>
                </div>
            </Form> : ''
        }
        {toggleDoiMK ?
            <div className="container_FormThemTK">
                <ChangePass success={success} setToggle={setToggleDoiMK} />
            </div> : ''
        }
    </>
}

export default SuaTTCaNhan;