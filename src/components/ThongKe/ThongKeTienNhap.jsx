import React from 'react';
import './ThongKeSanPhamNhap.css'
import { Button, message } from 'antd';
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver';

import { GetTongTienNhapService } from '../../services/ThongKe/ThongKeTongTienNhap';
const ThongKeTienNhap = () => {

  const { getTongTienNhapResponse, getTongTienNhapIsLoading, getTongTienNhapError, getTongTienNhapRefetch }=  GetTongTienNhapService();
// console.log(getTongTienNhapResponse);
  const handleExportExcelSanPhamNhap = () => {
    const workbook = XLSX.utils.book_new();

    if (getTongTienNhapResponse.data.length === 0) {
        message.error("Chưa có dữ liệu để xuất");
    }
    else {
        const modifiedData = getTongTienNhapResponse.data.map(item => ({
            'Ngày nhập': item.phieuNhap.ngayNhap,
            'Nhân viên': item.phieuNhap.user.ho + item.phieuNhap.user.ten,
            'Nhà cung cấp': item.phieuNhap.nhacungcap.tenNCC,
            'Tổng tiền': item.tongTienNhap,
            'Nguoi in': localStorage.getItem.userName
        }));


        const ThongKeSanPhamNhapSheet = XLSX.utils.json_to_sheet(modifiedData);
        XLSX.utils.book_append_sheet(workbook, ThongKeSanPhamNhapSheet, '');
        
        // Tính tổng tiền cho sheet Thu nhập
        const tongTienNhap = modifiedData.reduce((total, item) => total + item['Tổng tiền'], 0);
        const tongTienNhapRow = [{}, {},  'Tổng tiền nhập', tongTienNhap];
        XLSX.utils.sheet_add_aoa(ThongKeSanPhamNhapSheet, [tongTienNhapRow], { origin: -1 });

        // Xuất file
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const fileName = 'Thống kê tổng tiền nhập';
        saveAs(dataBlob, fileName);
    }
};



  return <>
    <h4 className='title__table'>Thống kê tổng tiền nhập</h4>
    <div className="add_SP_btn">
      <Button onClick={handleExportExcelSanPhamNhap} className='btn_add_NV' type="primary">Xuất excel</Button>
    </div>
    <table className="table table__Kho">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Ngày nhập</th>
          <th scope="col">Nhân viên</th>
          <th scope="col">Nhà cung cấp</th>
          <th scope='col'>Tổng tiền</th>
        </tr>
      </thead>
      <tbody>
        {getTongTienNhapResponse ? getTongTienNhapResponse.data.map((value, index) => {
          return (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{value.phieuNhap.ngayNhap}</td>
              <td>{value.phieuNhap.user.ho} {value.phieuNhap.user.ten}</td>
              <td>{value.phieuNhap.nhacungcap.tenNCC}</td>
              <td>{value.tongTienNhap}</td>
            </tr>
          );
        }) : 'Chưa có phiếu nhập'}

      </tbody>
    </table>
  </>
}
export default ThongKeTienNhap;