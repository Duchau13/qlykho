import React, { useEffect, useState } from "react";
import { Button } from 'antd';
import { message } from 'antd';

import { GetAllSanPhamService } from "../../../../services/SanPham/getAllSanPham";
import { ThemPXSpService } from "../../../../services/PhieuXuat/AddPhieuXuat";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ThemPX = ({ setToggle, getAllPhieuXuatRefetch }) => {
    const idUser = localStorage.getItem('idUser');

    const { ThemPXSPUrlResponse, ThemPXSPUrlError, callThemPXSPUrl } = ThemPXSpService();

    useEffect(() => {
        if (ThemPXSPUrlResponse) {
            if (ThemPXSPUrlResponse.success) {
                setToggle(false);
                getAllPhieuXuatRefetch();
            } else if(!ThemPXSPUrlResponse.success) {
                 error(ThemPXSPUrlResponse.message);
            }
        } else if (ThemPXSPUrlError) {
            error('Thêm thất bại');
        }
    }, [ThemPXSPUrlResponse, ThemPXSPUrlError]);

    const [messageApi, contextHolder] = message.useMessage();


    const error = (mes) => {
        messageApi.open({
            type: 'error',
            content: mes,
        });
    };


    const handleAddKho = (e) => {
        e.preventDefault();
        const formData = {
            userId: idUser,
            chiTietPhieuXuatList: value
        }
        callThemPXSPUrl(formData);
    }




    const [productSearch, setProductSearch] = useState()
    const [value, setValue] = useState([])
    const { getAllSanPhamResponse } = GetAllSanPhamService();
    const sum = value.reduce((acc, value) =>{
        return acc + parseFloat(value.gia * value.soluong);
    },0)
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });
    return <>
        {contextHolder}
        <div className="Form_ADD_PN">
            <h4>Tạo Phiếu Xuất</h4>

            <div className="formNCC_PN">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    console.log(e.target.price.value);

                    if(e.target.quantity.value <=0 || e.target.price.value <=0)
                    {
                        e.preventDefault()
                        toast.error('Giá trị nhập vào phải lớn hơn 0', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                    else{
                    setValue([...value, {
                        sanpham: {
                            id: productSearch
                        },
                        gia: e.target.price.value,
                        soluong: e.target.quantity.value
                    }])
                    }
                }}>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div style={{ minWidth: '120px' }}>San pham</div>
                        <select onChange={(e) => setProductSearch(e.target.value)}>
                            {getAllSanPhamResponse?.data?.map((item) => {
                                return (
                                    <>
                                        <option value={item.id}>
                                            {item.tenSanPham}
                                        </option >
                                    </>
                                )
                            })}
                        </select>
                        <input placeholder="Giá" name="price" id="price" type="number" />
                        <input placeholder="Số Lượng" name="quantity" id="quantity" type="number" />
                        <button type="submit">Thêm</button>
                    </div>

                </form>
            </div >
            <h5 style={{ marginTop: '10px' }}>Danh sách sản phẩm đã thêm vào Phiếu Xuất</h5>
            <table>
                <tr>
                    <th>
                        STT
                    </th>
                    <th>
                        Tên sản phẩm
                    </th>
                    <th>
                        Giá
                    </th>
                    <th>
                        Số lượng
                    </th>
                    <th>
                        Thành Tiền
                    </th>
                </tr>

                {value.length > 0 && value.map((item, index) => {
                    return (
                        <>
                            <tr>
                                {/* <th scope="row">{index + 1}</th> */}
                                <td>{index + 1}</td>
                                <td>{getAllSanPhamResponse?.data?.find((x) => x.id == item.sanpham.id) && getAllSanPhamResponse?.data?.find((x) => x.id == item.sanpham.id).tenSanPham

                                }</td>
                                <td>{formatter.format(item.gia)}</td>
                                <td>{item.soluong}</td>
                                <td>{formatter.format(item.soluong * item.gia)}</td>
                            </tr>
                        </>
                    )
                })}
            </table>
            <h5 style={{marginTop:'10px'}}>Tổng Tiền :{formatter.format(sum)}</h5>
            <div className="btn_Cancel_Submi button_Bottom">

                <Button onClick={() => { setToggle(false) }} danger >
                    Hủy
                </Button>
                <Button onClick={handleAddKho} type="primary" >
                    Xác nhận
                </Button>
            </div>
        </div >
        <ToastContainer 
            position="top-right"
            autoClose={1500}
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

export default ThemPX;