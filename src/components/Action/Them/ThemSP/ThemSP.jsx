import React, { useEffect, useState } from "react";
import { Button, Form, Input } from 'antd';
import { message, Select } from 'antd';

import { ThemSpService } from "../../../../services/SanPham/ThemSP";
import { GetAllDanhMucService } from "../../../../services/DanhMuc/getAllDanhMuc";
import { GetAllVTKhoService } from "../../../../services/ViTriKho/getAllViTriKho";

const ThemSP = ({ setToggle, getAllSanPhamRefetch }) => {
    const { getAllDanhMucResponse, getAllDanhMucIsLoading, getAllDanhMucError, getAllDanhMucRefetch } = GetAllDanhMucService();
    const {ThemSpResponse,ThemSpError,ThemSpLoading,callThemSp} = ThemSpService();
    const { getAllVTKhoResponse, getAllVTKhoIsLoading, getAllVTKhoError, getAllVTKhoRefetch } = GetAllVTKhoService();

    useEffect(() => {
        if (ThemSpResponse) {
            success()
            setTimeout(() => {
                setToggle(false)
                getAllSanPhamRefetch();
                getAllVTKhoRefetch();
            }, 2000);
           
        }
        else if (ThemSpError) {
            error();
        }
    }, [ThemSpResponse,ThemSpError]);

    const [messageApi, contextHolder] = message.useMessage();
    const [formData, setFormData] = useState({
        tenSanPham: '',
        ngaySanXuat: '',
        hanSuDung: '',
        danhmuc: {
            id: '',
        },
        vitrikho: {
            id: '',
        }
    });

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Thêm sản phẩm thành công',
        });
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Trùng tên Sản phẩm',
        });
    };


    const handleAddSanPham = (e) => {
        e.preventDefault();
        callThemSp(formData);
    }

    const handleChange = (name, value) => {
        if (name === 'danhmuc') {
            setFormData((prevState) => ({
                ...prevState,
                danhmuc: {
                    id: value,
                },
            }));
        }
        else if(name === 'vitrikho')
        {
            setFormData((prevState) => ({
                ...prevState,
                vitrikho: {
                    id: value,
                }
            }));
        }
        else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
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
            <h5>Thêm Sản Phẩm</h5>
            <Form.Item
                label="Tên Sản Phẩm"
                name="tenSanPham"
                rules={[{ required: true, message: 'Nhập Tên Sản Phẩm!' }]}
            >
                <Input name="tenSanPham" onChange={(e) => handleChange('tenSanPham', e.target.value)} value={formData.tenSanPham} />
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
                <Select onChange={(value) => handleChange('danhmuc', value)} value={formData.danhmuc.id}>
                    {getAllDanhMucResponse ? getAllDanhMucResponse.data.map((value) => (
                        <Select.Option key={value.id} value={value.id}>{value.tenDM}</Select.Option>
                    )) : ''}
                </Select>
            </Form.Item>
            <Form.Item
                label="Chọn vị trí kho"
                name="vitrikho"
                rules={[{ required: true, message: 'Chọn Vị Trí Kho!' }]}>
                <Select onChange={(value) => handleChange('vitrikho', value)} value={formData.vitrikho.id}>
                    {getAllVTKhoResponse ? getAllVTKhoResponse.data.map((value) => (
                        <Select.Option key={value.id} value={value.id}>{value.kho.tenKho} - Cột {value.cot} - Hàng {value.hang} - Kệ {value.ke}</Select.Option>
                    )) : ''}
                </Select>
            </Form.Item>
            <div className="btn_Cancel_Submit">
                <Button onClick={() => { setToggle(false) }} danger >
                    Hủy
                </Button>
                <Button onClick={handleAddSanPham} type="primary" >
                    Xác nhận
                </Button>
            </div>
        </Form >
    </>
}

export default ThemSP;