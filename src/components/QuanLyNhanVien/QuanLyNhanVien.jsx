import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';



import './QuanLyNhanVien.css'
import ThemTK from '../Action/Them/ThemTaiKhoan/ThemTK';

//CallAPI ALL Nhân Viên
import { GetAllNVService } from '../../services/NhanVien/getAllNhanVien';

const QuanLyNhanVien = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const success = (mess) => {
    messageApi.open({
      type: 'success',
      content: mess,
    });
  };
  const [toggle, setToggle] = useState(false);

  const { getAllNVResponse, getAllNVIsLoading, getAllNVError, getAllNVRefetch } = GetAllNVService();

  useEffect(() => {
    if (getAllNVResponse) {
      console.log(getAllNVResponse);
    }
  }, [getAllNVResponse, getAllNVError]);

  const handleXoa = (id) => {
    console.log(id);

    getAllNVRefetch();
    success('Đã khóa nhân viên thành công');
  }

  return <>
    {contextHolder}
    <h4 className='title__table'>Quản Lý Nhân Viên </h4>
    <div className="add_NV_btn">
      <Button onClick={() => { setToggle(true) }} className='btn_add_NV' type="primary">Thêm tài khoản</Button>
    </div>
    <table className="table table__Kho">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Họ và Tên</th>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
          <th scope="col">Chức vụ</th>
        </tr>
      </thead>
      <tbody>

        {
          getAllNVResponse ? getAllNVResponse.data.map((value, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{value.ho} {value.ten}</td>
                <td>{value.userName}</td>
                <td>{value.email}</td>
                <td>{value.role}</td>
                <td>
                  <Button onClick={() => handleXoa(value.id)} danger style={{ marginRight: "5px" }}>
                    Khóa
                  </Button>
                </td>
              </tr>
            );
          }) : 'Chưa có nhân viên'
        }

      </tbody>
    </table>
    {toggle ?
      <div className="container_FormThemTK">
        <ThemTK getAllNVRefetch={getAllNVRefetch} success={success} setToggle={setToggle} />
      </div> : ''
    }
  </>
}
export default QuanLyNhanVien;

