import React, { useEffect, useState } from "react";
import { Button, Form, Input } from 'antd';
import { message } from 'antd';
import '../CTPN/CTPN.css'

import { GetCTPNByID } from "../../services/PhieuNhap/getCTPNByIdPN";
import { GetAllPhieuNhapService } from "../../services/PhieuNhap/GetAllPhieuNhap";

const CTPN = ({ setToggle, idPN }) => {
    const { getCTPNReponse, getCTPNError, getCTPNRefetch } = GetCTPNByID(idPN);
    const [messageApi, contextHolder] = message.useMessage();

    const { getAllPhieuNhapResponse, getAllPhieuNhapRefetch } = GetAllPhieuNhapService();
    useEffect(() => {
        if (getAllPhieuNhapResponse) {
            setToggle(true);
            getAllPhieuNhapRefetch();
            getCTPNRefetch();
        } else if (getCTPNError) {
            error();
        }
    }, [getCTPNReponse, getCTPNError]);

    console.log(idPN)

    console.log(getCTPNReponse);

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Thất bại',
        });
    };

    return <>
        {contextHolder}
        {
            getCTPNReponse ?
                <Form name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    autoComplete="off"
                    className="Form_ADD_NV"

                    initialValues={getCTPNReponse.data}

                >
                    <table className="table table__Kho">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Tên sản phẩm</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getCTPNReponse ? getCTPNReponse.map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{value.sanpham.tenSanPham}</td>
                                            <td>{value.soluong}</td>
                                            <td>{value.gia}</td>
                                        </tr>
                                    );
                                }) : 'Chưa có dữ liệu'
                            }
                        </tbody>
                    </table>

                    <div className="btn_Cancel_Submit">
                        <Button onClick={() => { setToggle(false) }} danger >
                            Thoát
                        </Button>
                    </div>
                </Form>
                : 'Chưa có dữ liệu'
        }
    </>

}
export default CTPN;