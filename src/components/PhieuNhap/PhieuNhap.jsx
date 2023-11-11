import React, { useState } from 'react';
import { Button, message } from "antd";

import './PhieuNhap.css'

import { GetAllPhieuNhapService } from '../../services/PhieuNhap/GetAllPhieuNhap';
import CTPN from '../CTPN/CTPN';
import ThemPN from '../Action/Them/ThemPN/ThemPN';

const PhieuNhap = () => {

  const [toggle, setToggle] = useState(false);
  const [toggleTao, setToggleTao] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();
  const [idPN, setIdPN] = useState();

  const { getAllPhieuNhapResponse, getAllPhieuNhapRefetch } = GetAllPhieuNhapService();

  const handleCT = (id) => {
    setToggle(true);
    setIdPN(id);
  }

  return <>
    {contextHolder}
    <h4 className='title__table'>Quản Lý Phiếu Nhập</h4>
    <div className="add_SP_btn">
      <Button onClick={() => { setToggleTao(true) }} className='btn_add_NV' type="primary">Tạo phiếu nhập</Button>
    </div>
    <table className="table table__Kho">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Nhà Cung Cấp</th>
          <th scope="col">Nhân viên tạo phiếu</th>
          <th scope="col">Ngày tạo phiếu</th>
          <th scope="col">Chi tiết phiếu nhập</th>
        </tr>
      </thead>
      <tbody>
        {
          getAllPhieuNhapResponse ? getAllPhieuNhapResponse.data.map((value, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{value.nhacungcap.tenNCC}</td>
                <td>{value.user.ho} {value.user.ten}</td>
                <td>{value.ngayNhap}</td>
                <td>
                  <Button type="primary" onClick={() => handleCT(value.id)}>
                    Chi tiết
                  </Button>
                </td>
              </tr>
            );
          }) : 'Chưa có sản phẩm'
        }
      </tbody>
    </table>
    {toggle ?
      <div className="container_FormThemTK">
        <CTPN idPN={idPN} setToggle={setToggle} />
      </div> : ''
    }
    {toggleTao ?
      <div className="container_FormThemTK">
        <ThemPN setToggle={setToggleTao} getAllPhieuNhapRefetch={getAllPhieuNhapRefetch}/>
      </div> : ''
    }
  </>
}
export default PhieuNhap;