import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';

import { XoaDMByID } from '../../services/DanhMuc/XoaDM';
import { GetAllDanhMucService } from '../../services/DanhMuc/getAllDanhMuc';

import SuaDM from '../Action/Sua/SuaDM/SuaDM';
import ThemDM from '../Action/Them/ThemDM/ThemDM';
import { FormXacNhan } from '../FormXacNhan/FormXacNhan';

const DanhMuc = () => {
  const [toggle, setToggle] = useState(false);
  const [toggleSua, setToggleSua] = useState(false);
  const [idKho, setIdKho] = useState();
  const [toggleXoa, setToggleXoa] = useState(false);
  const [idXoa, setIdXoa] = useState();

  const { getAllDanhMucResponse, getAllDanhMucIsLoading, getAllDanhMucError, getAllDanhMucRefetch } = GetAllDanhMucService();

  //Call API Xóa Kho
  const { XoaDMResponse, callXoaDM } = XoaDMByID();



  useEffect(() => {
    if (XoaDMResponse) {
      success('Xóa Danh mục thành công')
      getAllDanhMucRefetch();
    }
  }, [XoaDMResponse])

  const handleXoa = (id) => {
    setIdXoa(id);
    setToggleXoa(true);

  }

  const actionXoa = () => {
    //Xóa Kho By ID
    callXoaDM(idXoa);
    setToggleXoa(false);
  }

  const handleSua = (id) => {
    setIdKho(id)
    setToggleSua(true)
  }

  // Message thông báo
  const [messageApi, contextHolder] = message.useMessage();
  const success = (mes) => {
    messageApi.open({
      type: 'success',
      content: mes,
    });
  };

  return <>
    <h4 className='title__table'>Quản Lý Danh Mục</h4>
    {contextHolder}
    <div className="add_NV_btn">
      <Button onClick={() => setToggle(true)} type="primary" className='btn_add_NV'>Thêm Danh Mục</Button>
    </div>
    <table className="table table__Kho">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">ID Danh Mục</th>
          <th scope="col">Tên Danh Mục</th>
          <th scope="col">Tác vụ</th>

        </tr>
      </thead>
      <tbody>
        {getAllDanhMucResponse ? getAllDanhMucResponse.data.map((value, index) => {
          return <tr key={value.id}>
            <th scope="row">{index + 1}</th>
            <td>{value.id}</td>
            <td>{value.tenDM}</td>
            <td>
              <Button onClick={() => handleXoa(value.id)} danger style={{ marginRight: "5px" }}>
                Xóa
              </Button>
              <Button onClick={() => handleSua(value.id)} type="primary" >
                Sửa
              </Button>
            </td>
          </tr>
        }) : '...'}

      </tbody>
    </table>
    {toggle ?
      <div className="container_FormThemTK">
        <ThemDM getAllDanhMucRefetch={getAllDanhMucRefetch} setToggle={setToggle} />
      </div> : ''
    }
    {toggleSua ?
      <div className="container_FormThemTK">
        <SuaDM idDM={idKho} getAllDanhMucRefetch={getAllDanhMucRefetch} setToggle={setToggleSua} />
      </div> : ''
    }
    {toggleXoa ?
      <div className="container_FormThemTK">
        <FormXacNhan message={'Bạn có chắc chắn xóa không?'} setToggle={setToggleXoa} action={actionXoa} />
      </div> : ''
    }
  </>
}
export default DanhMuc;