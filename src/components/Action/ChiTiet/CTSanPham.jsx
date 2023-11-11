import React, { useEffect, useState } from "react";
import { Button, Form } from 'antd';


const CTSanPham = ({ setToggle, ChiTietSanPhamResponse }) => {


    return <>
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            autoComplete="off"
            className="Form_ADD_NV"
        >
            <h5>Chi tiết sản phẩm</h5>
            <table className="table table__Kho">
                <thead>
                    <tr>
                        <th scope="col">Tên Kho</th>
                        <th scope="col">Hàng</th>
                        <th scope="col">Cột</th>
                        <th scope="col">Kệ</th>
                        <th scope="col">Số lượng</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>{ChiTietSanPhamResponse?.data?.vitrikho?.kho?.tenKho}</th>
                        <th>{ChiTietSanPhamResponse?.data?.vitrikho?.hang}</th>
                        <th>{ChiTietSanPhamResponse?.data?.vitrikho?.cot}</th>
                        <th>{ChiTietSanPhamResponse?.data?.vitrikho?.ke}</th>
                        <th>{ChiTietSanPhamResponse?.data?.soLuong}</th>
                    </tr>
                </tbody>
            </table>

            <div className="btn_Cancel_Submit">

                <Button onClick={() => { setToggle(false) }} danger >
                    Thoát
                </Button>
            </div>
        </Form >
    </>
}

export default CTSanPham;