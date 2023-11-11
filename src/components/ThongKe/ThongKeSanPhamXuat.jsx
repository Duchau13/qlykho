import React from 'react';
import './ThongKeSanPhamNhap.css'
import { Button, message } from 'antd';
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver';

import { GetAllSanPhamXuatService } from '../../services/ThongKe/ThongKeSanPhamXuat';
const ThongKeSanPhamNhap = () => {

  const { getAllSanPhamXuatResponse, getAllSanPhamXuatIsLoading, getAllSanPhamXuatError, getAllSanPhamXuatRefetch } = GetAllSanPhamXuatService();
  const handleExportExcelSanPhamXuat = () => {
    const workbook = XLSX.utils.book_new();

    if (getAllSanPhamXuatResponse.data.length === 0) {
        message.error("Chưa có dữ liệu để xuất");
    }
    else {
        const modifiedData = getAllSanPhamXuatResponse.data.map(item => ({
            'Tên sản phẩm': item.sanPham.tenSanPham,
            'Số lượng đã xuất': item.soLuong,
            'Số lượng tồn kho': item.sanPham.soLuong,
            'Vị trí sản phẩm trong kho':item.sanPham.vitrikho.kho.tenKho + " Cột " + item.sanPham.vitrikho.cot + " Hàng " + item.sanPham.vitrikho.hang + " Kệ "+ item.sanPham.vitrikho.ke,
        }));

        const ThongKeSanPhamNhapSheet = XLSX.utils.json_to_sheet(modifiedData);
        XLSX.utils.book_append_sheet(workbook, ThongKeSanPhamNhapSheet, '');

        // Xuất file
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const fileName = 'Thống kê sản phẩm xuất';
        saveAs(dataBlob, fileName);
    }
};
  return <>
    <h4 className='title__table'>Thống kê sản phẩm xuất</h4>
    <div className="add_SP_btn">
      <Button onClick={handleExportExcelSanPhamXuat} className='btn_add_NV' type="primary">Xuất excel</Button>
    </div>
    <table className="table table__Kho">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Tên sản phẩm</th>
          <th scope="col">Số lượng đã xuất</th>
          <th scope="col">Số lượng tồn kho</th>
          <th scope='col'>Vị trí kho</th>
        </tr>
      </thead>
      <tbody>
        {getAllSanPhamXuatResponse ? getAllSanPhamXuatResponse.data.map((value, index) => {
          return (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{value.sanPham.tenSanPham}</td>
              <td>{value.soLuong}</td>
              <td>{value.sanPham.soLuong}</td>
              <td>{value.sanPham.vitrikho.kho.tenKho} Cột {value.sanPham.vitrikho.cot} Hàng {value.sanPham.vitrikho.hang} Kệ {value.sanPham.vitrikho.ke}</td>
            </tr>
          );
        }) : 'Chưa có sản phẩm nhập'}

      </tbody>
    </table>
  </>
}
export default ThongKeSanPhamNhap;