import React, { useEffect, useState } from "react";
import { Button, Form, Input } from 'antd';
import { message, Select } from 'antd';

import { SuaSPByID } from "../../../../services/SanPham/SuaSP";
import { GetAllDanhMucService } from "../../../../services/DanhMuc/getAllDanhMuc";
import { GetSPByID } from "../../../../services/SanPham/getSPById";

const SuaSP = ({ setToggle, getAllSanPhamRefetch,idSP }) =>
{
    const { getAllDanhMucResponse, getAllDanhMucIsLoading, getAllDanhMucError, getAllDanhMucRefetch } = GetAllDanhMucService();
    const { SuaSPResponse, SuaSPError, callSuaSP } = SuaSPByID();
    const { getSPResponse, getSPError, getSPRefetch } = GetSPByID(idSP);

    useEffect(() => {
        if (SuaSPResponse) {
            success()
            setTimeout(() => {
                setToggle(false)
                getAllSanPhamRefetch();
            }, 2000);
        } else if (SuaSPError) {
            error();
        }
    }, [SuaSPResponse, SuaSPError]);

    const [messageApi, contextHolder] = message.useMessage();
    const [formData, setFormData] = useState({
        tenSanPham: '',
        ngaySanXuat: '',
        hanSuDung: '',
        danhmuc: {
            id: '',
        }
    });
    console.log(getSPResponse)
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Sửa thông tin sản phẩm thành công',
        });
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Sửa thông tin sản phẩm thất bại',
        });
    };

    const handleSuaSP = (e) => {
        e.preventDefault();
        callSuaSP(idSP,formData);
    }

    const handleChange = (name, value) => {
        if (name === 'danhmuc') {
            setFormData((prevState) => ({
                ...prevState,
                danhmuc: {
                    id: value,
                },
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };
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
            initialValues={getSPResponse.data}
        >
            <h5>Sửa Sản Phẩm</h5>
            <Form.Item
                label="Tên Sản Phẩm"
                name="tenSanPham"
                rules={[{ required: true, message: 'Nhập Tên Sản Phẩm!' }]}
            >
                <Input name="tenSanPham" onChange={(e) => handleChange('tenSanPham', e.target.value)} />
            </Form.Item>
            <Form.Item
                label="Ngày sản xuất"
                name="ngaySanXuat"
                rules={[{ required: true, message: 'Nhập Ngày Sản Xuất!' }]}
            >
                <Input name="ngaySanXuat" onChange={(e) => handleChange('ngaySanXuat', e.target.value)} type="date" value={formData.ngaySanXuat} />
            </Form.Item>
            <Form.Item
                label="Hạn sử dụng (tháng)"
                name="hanSuDung"
                rules={[{ required: true, message: 'Nhập Hạn Sử Dụng!' }]}
            >
                <Input name="hanSuDung" onChange={(e) => handleChange('hanSuDung', e.target.value)} type="date" value={formData.hanSuDung} />
            </Form.Item>
            <Form.Item
                label="Chọn danh mục"
                name="danhmuc"
                rules={[{ required: true, message: 'Chọn Danh Mục!' }]}>
                <Select onChange={(value) => handleChange('danhmuc', value)} value={formData.danhmuc.id} >
                    {getAllDanhMucResponse ? getAllDanhMucResponse.data.map((value) => (
                        <Select.Option key={value.id} value={value.id}>{value.tenDM}</Select.Option>
                    )) : ''}
                </Select>
            </Form.Item>
            <div className="btn_Cancel_Submit">
                <Button onClick={() => { setToggle(false) }} danger >
                    Hủy
                </Button>
                <Button onClick={handleSuaSP} type="primary" >
                    Xác nhận
                </Button>
            </div>
        </Form >
        :''
        }
    </>
}

export default SuaSP;