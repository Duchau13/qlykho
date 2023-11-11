import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';

import './Kho.css'
import httpClient from '../../utils/axiosInstance';
import { ChiTietKho } from '../../services/Kho/ChiTietKho';
import { GetAllKhoService } from '../../services/Kho/getAllKho';
import { XoaKhoByID } from '../../services/Kho/xoaKho';
import ThemKho from '../Action/Them/ThemKho/ThemKho';
import SuaKho from '../Action/Sua/SuaKho/SuaKho';
import CTKho from '../Action/ChiTiet/CTKho';
import { FormXacNhan } from '../FormXacNhan/FormXacNhan';
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


const Kho = () => {
  const [toggle, setToggle] = useState(false);
  const [toggleSua, setToggleSua] = useState(false);
  const [toggleCT, setToggleCT] = useState(false);
  const [toggleXoa, setToggleXoa] = useState(false);
  const [idXoa,setIdXoa] = useState();


  const [idKho, setIdKho] = useState();



  //Call API Lấy danh sách Kho
  const { getAllKhoResponse, getAllKhoIsLoading, getAllKhoError, getAllKhoRefetch } = GetAllKhoService();

  //Chi Tiet Kho
  const { ChiTietKhoResponse, ChiTietKhoIsLoading, ChiTietKhoError, ChiTietKhoCall } = ChiTietKho();

  //Call API Xóa Kho
  const { xoaKhoResponse, xoaKhoError, xoaKhoLoading, callXoaKho } = XoaKhoByID();



  useEffect(() => {
    if (xoaKhoResponse) {
      // Gọi lại danh sách Kho sau khi xóa
      getAllKhoRefetch();
      success('Xóa kho thành công')
    }
  }, [xoaKhoResponse])

  const handleCT = (id) => {
    setToggleCT(true);
    ChiTietKhoCall(id);
    setIdKho(id);
  }

  const handleXoa = (id) => {
    setToggleXoa(true);
    setIdXoa(id);
  }
  const actionXoa = () =>{
    handDeleteKho(idXoa);
  }
  const handDeleteKho = async (id) => {
    try{
        //setItems(items.filter((item) => item.id_item !== item.id_item));
        await httpClient.delete(`/kho/xoa/${id}`)
        //console.log(item.id_item)
        .then((err) =>{
            toast.success(`${err.data.message}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => {
              setToggleXoa(false);
            }, 2000);
            console.log(err);
            getAllKhoRefetch();
        })
    }
    catch (err){
      toast.success(`${err.data.message}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        setToggleXoa(false);
    }, 2000);
    }
  }
  const handleSua = (id) => {
    setIdKho(id)
    setToggleSua(true)
  };

  // Message thông báo
  const [messageApi, contextHolder] = message.useMessage();
  const success = (mes) => {
    messageApi.open({
      type: 'success',
      content: mes,
    });
  };
  const error = (mes) => {
    messageApi.open({
      type: 'error',
      content: mes,
    });
  };

  return <>
    <h4 className='title__table'>Quản Lý Kho</h4>
    {contextHolder}
    <div className="add_NV_btn">
      <Button onClick={() => setToggle(true)} type="primary" className='btn_add_NV'>Thêm Kho</Button>
    </div>
    <table className="table table__Kho">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Tên Kho</th>
          <th scope="col">Email</th>
          <th scope="col">Địa chỉ</th>
          <th scope="col">SĐT</th>
          <th scope="col">Tác vụ</th>


        </tr>
      </thead>
      <tbody>
        {getAllKhoResponse ? getAllKhoResponse.data.map((value, index) => {
          return <tr key={value.id}>
            <th scope="row">{index + 1}</th>
            <td>{value.tenKho}</td>
            <td>{value.email}</td>
            <td>{value.address}</td>
            <td>{value.sdt}</td>
            <td>
              <Button style={{ marginRight: "5px" }} type="primary" onClick={() => handleCT(value.id)}>
                Chi tiết
              </Button>
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
    {toggleCT ?
      <div className="container_FormThemTK">
        <CTKho error={error} success={success} ChiTietKhoCall={ChiTietKhoCall} getAllKhoRefetch={getAllKhoRefetch} ChiTietKhoResponse={ChiTietKhoResponse} setToggle={setToggleCT} idKho={idKho}/>
      </div> : ''
    }
    {toggle ?
      <div className="container_FormThemTK">
        <ThemKho getAllKhoRefetch={getAllKhoRefetch} setToggle={setToggle} />
      </div> : ''
    }
    {toggleSua ?
      <div className="container_FormThemTK">
        <SuaKho idKho={idKho} getAllKhoRefetch={getAllKhoRefetch} setToggle={setToggleSua} />
      </div> : ''
    }
    {toggleXoa ?
      <div className="container_FormThemTK">
        <FormXacNhan message={'Bạn có chắc chắn xóa không?'} setToggle={setToggleXoa} action={actionXoa} />
      </div> : ''
    }
     <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
  </>
}
export default Kho;