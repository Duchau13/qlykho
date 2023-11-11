import React, { useEffect, useState } from "react";
import { Button, Form, Input } from 'antd';
import { message } from 'antd';
import '../CTPX/CTPX.css'

import { GetCTPXByID } from "../../services/PhieuXuat/GetCTPXByIdPX";
import { GetAllPhieuXuatService } from "../../services/PhieuXuat/GetAllPhieuXuat";
const CTPX = ({setToggleCT, idPX }) => {
    const {getCTPXReponse, getCTPXError, getCTPXRefetch} = GetCTPXByID(idPX);
    const [messageApi, contextHolder] = message.useMessage();

    const { getAllPhieuXuatResponse, getAllPhieuXuatRefetch } = GetAllPhieuXuatService();
    useEffect(() => {
        if (getAllPhieuXuatResponse) {
            setToggleCT(true);
            getAllPhieuXuatRefetch();
            getCTPXRefetch();
        } else if (getCTPXError) {
            error();
        }
    }, [getCTPXReponse, getCTPXError]);

    console.log(idPX)

    console.log(getCTPXReponse);

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Thất bại',
        });
    };

    return <>
        {contextHolder}
            {
                getCTPXReponse ? 
                <Form name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                autoComplete="off"
                className="Form_ADD_NV"
                
                initialValues={getCTPXReponse.data}
                
                >
                <table className ="table table__Kho">
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
                    getCTPXReponse ? getCTPXReponse.map((value, index) => {
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
                <Button onClick={() => { setToggleCT(false) }} danger >
                    Thoát
                </Button>
            </div>
                </Form>
                : 'Chưa có dữ liệu'
            }
    </>

}
export default CTPX;