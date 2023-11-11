import React, { useState } from 'react';
import { Button, message } from "antd";
import './PhieuXuat.css'

import { GetAllPhieuXuatService } from '../../services/PhieuXuat/GetAllPhieuXuat';
import CTPX from '../CTPX/CTPX';
import ThemPX from '../Action/Them/ThemPX/ThemPX';

const PhieuXuat = () => {
  const [toggle, setToggle] = useState(false);
  const [toggleCT, setToggleCT] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [idPX, setIdPX] = useState();

  const {getAllPhieuXuatResponse, getAllPhieuXuatRefetch} = GetAllPhieuXuatService();
  const handleCT = (id) => {
    setToggleCT(true);
    setIdPX(id);
  }
  return <>
  {contextHolder}
    <h4 className='title__table'>Quản Lý Phiếu Xuất</h4>
    <div className="add_SP_btn">
      <Button onClick={() => { setToggle(true) }} className='btn_add_NV' type="primary">Tạo phiếu xuất</Button>
    </div>
    <table className ="table table__Kho">
    <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Nhân viên tạo phiếu</th>
          <th scope="col">Ngày tạo phiếu</th>
          <th scope="col">Chi tiết phiếu xuất</th>
        </tr>
      </thead>
      <tbody>
      {
          getAllPhieuXuatResponse ? getAllPhieuXuatResponse.data.map((value, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{value.user.ho} {value.user.ten}</td>
                <td>{value.ngayxuat}</td>
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
    {toggleCT ?
      <div className="container_FormThemTK">
        <CTPX idPX={idPX} setToggleCT={setToggleCT} />
      </div> : ''
    }
    {toggle ?
      <div className="container_FormThemTK">
        <ThemPX setToggle={setToggle} getAllPhieuXuatRefetch={getAllPhieuXuatRefetch}/>
      </div> : ''
    }
  </>
}
export default PhieuXuat;