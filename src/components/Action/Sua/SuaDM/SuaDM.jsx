import React, { useEffect, useState } from "react";
import { Button, Form, Input } from 'antd';
import { message } from 'antd';

import { SuaDMByID } from "../../../../services/DanhMuc/SuaDM";


const SuaDM = ({ setToggle, getAllDanhMucRefetch,idDM }) => {

    const { SuaDMResponse, SuaDMError, callSuaDM } = SuaDMByID();

    useEffect(() => {
        if (SuaDMResponse) {
            success()
            setTimeout(() => {
                setToggle(false)
                getAllDanhMucRefetch();
            }, 2000);
            // setToggle(false);
            // getAllDanhMucRefetch();
        } else if (SuaDMError) {
            error();
        }
    }, [SuaDMResponse, SuaDMError]);
    const [messageApi, contextHolder] = message.useMessage();
    const [formData, setFormData] = useState({
        tenDM: "",
    });


    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Sửa thành công',
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
        callSuaDM(idDM,formData);
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
            <h5>Sửa Danh Mục</h5>
            <Form.Item
                label="Tên danh mục"
                name="tenDM"
                rules={[{ required: true, message: 'Nhập Tên Danh Mục!' }]}
            >
                <Input name="tenDM" onChange={handleChange} />
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
    </>
}

export default SuaDM;