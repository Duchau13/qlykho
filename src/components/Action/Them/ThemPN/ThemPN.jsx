import React, { useEffect, useState } from "react";
import { Button} from 'antd';
import { message } from 'antd';
import './ThemPN.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetAllSanPhamService } from "../../../../services/SanPham/getAllSanPham";
import { GetAllNccService } from "../../../../services/Nhacungcap/getAllNhaCungCap";
import { ThemPNSpService } from "../../../../services/PhieuNhap/AddPhieuNhap";

const ThemPN = ({ setToggle, getAllPhieuNhapRefetch }) => {
    const idUser = localStorage.getItem('idUser');

    const { getAllNccResponse} = GetAllNccService();
    const { ThemPNSPUrlResponse, ThemPNSPUrlError, callThemPNSPUrl } = ThemPNSpService();
    const [messageerr,Setmessageerr] = useState('')
    const [productSearch, setProductSearch] = useState()
    const [value, setValue] = useState([])
    const [ncc, setNCC] = useState()
    const { getAllSanPhamResponse } = GetAllSanPhamService();
    useEffect(() => {
        if (ThemPNSPUrlResponse) {
            setToggle(false);
            getAllPhieuNhapRefetch();
        } else if (ThemPNSPUrlError) {
            error();
        }
    }, [ThemPNSPUrlResponse, ThemPNSPUrlError]);

    const [messageApi, contextHolder] = message.useMessage();
    console.log(ncc);
    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Thêm thất bại',
        });
    };


    const handleAddKho = (e) => {
        e.preventDefault();
        const formData = {

            nhaCungCapId: ncc,
            userId: idUser,
            chiTietPhieuNhapList: value
        }
        callThemPNSPUrl(formData);
    }

    


    console.log(value)
    const sum = value.reduce((acc, value) =>{
        return acc + parseFloat(value.gia * value.soluong);
    },0)
    console.log(sum)
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });
    // const mergedArr = value.reduce((accumulator, currentValue) => {
    //     // Check if an object with the same 'sanpham.id' already exists in the accumulator
    //     const existingObject = accumulator.find(item => item.sanpham.id === currentValue.sanpham.id);
    
    //     if (existingObject) {
    //         // Sum up 'soluong' and update 'gia'
    //         existingObject.soluong = (parseInt(existingObject.soluong) || 0) + (parseInt(currentValue.soluong) || 0);
    //         existingObject.gia = currentValue.gia; // You might want to decide how to handle conflicting values
    //     } else {
    //         // If no existing object found, add the current object to the accumulator
    //         accumulator.push(currentValue);
    //     }
    
    //     return accumulator;
    // }, []);
    // console.log(mergedArr);
    return <>
        {contextHolder}
        <div className="Form_ADD_PN">
            <h4>Tạo Phiếu Nhập</h4>
            <div className="formNCC_PN">
                <span>Nha cung cap</span>
                <select onChange={(e) => { setNCC(e.target.value) }}>
                    {
                        getAllNccResponse?.data.map((item) => {
                            return (
                                <>
                                    <option value={item.id}>{item.tenNCC}</option>
                                </>
                            )
                        })
                    }
                </select>
            </div>
            <div className="formNCC_PN">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    console.log(e.target.price.value);
                    if(e.target.quantity.value <=0 || e.target.price.value <=0)
                    {
                        e.preventDefault()
                        Setmessageerr('Giá trị không được nhỏ hơn 0')
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
                    Setmessageerr('')
                    }
                }}>
                    <div style={{ display: 'flex' ,gap: '20px'}}>
                        <div style={{minWidth: '120px'}}>San pham</div>
                        <select onChange={(e) => setProductSearch(e.target.value)}>
                            {getAllSanPhamResponse?.data?.map((item) => {
                                return (
                                    <>
                                        <option value={item.id}>
                                            {item.tenSanPham}
                                        </option>
                                    </>
                                )
                            })}
                        </select>
                        <input placeholder="Giá" name="price" id="price" type="number" required />
                        <input placeholder="Số Lượng" name="quantity" id="quantity" type="number" required />
                        <button type="submit">Thêm</button>
                    </div>

                </form>
            </div>
            <h5 style={{marginTop:'10px'}}>Danh sách sản phẩm đã thêm</h5>
            <table>
                <tr>
                    <th>
                        STT
                    </th>
                    <th>
                        Tên sản phẩm
                    </th>
                    <th>
                        Đơn Giá
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
        </div>
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

export default ThemPN;