import React from 'react';
import './ThongKeSanPhamNhap.css'
import { Button, message } from 'antd';
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver';

import { GetTongTienXuatService } from '../../services/ThongKe/ThongKeTongTienXuat';

const ThongKeTienXuat = () => {

  const { getTongTienXuatResponse, getTongTienXuatIsLoading, getTongTienXuatError, getTongTienXuatRefetch }=  GetTongTienXuatService();
// console.log(getTongTienXuatResponse);
const handleExportExcelSanPhamXuat = () => {
    const workbook = XLSX.utils.book_new();

    if (getTongTienXuatResponse.data.length === 0) {
        message.error("Chưa có dữ liệu để xuất");
    }
    else {
        const modifiedData = getTongTienXuatResponse.data.map(item => ({
            'Ngày xuất': item.phieuxuat.ngayxuat,
            'Nhân viên': item.phieuxuat.user.ho + item.phieuxuat.user.ten,
            'Tổng tiền': item.tongTienXuat,
        }));

        const ThongKeSanPhamNhapSheet = XLSX.utils.json_to_sheet(modifiedData);
        XLSX.utils.book_append_sheet(workbook, ThongKeSanPhamNhapSheet, '');

        // Tính tổng tiền cho sheet Thu nhập
        const tongTienXuat = modifiedData.reduce((total, item) => total + item['Tổng tiền'], 0);
        const tongTienXuatRow = [{},  'Tổng tiền xuất', tongTienXuat];
        XLSX.utils.sheet_add_aoa(ThongKeSanPhamNhapSheet, [tongTienXuatRow], { origin: -1 });

        // Xuất file
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const fileName = 'Thống kê tổng tiền xuất';
        saveAs(dataBlob, fileName);
    }
};

  return <>
    <h4 className='title__table'>Thống kê tổng tiền xuất</h4>
    <div className="add_SP_btn">
      <Button onClick={handleExportExcelSanPhamXuat} className='btn_add_NV' type="primary">Xuất excel</Button>
    </div>
    <table className="table table__Kho">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Ngày xuất</th>
          <th scope="col">Nhân viên</th>
          <th scope='col'>Tổng tiền</th>
        </tr>
      </thead>
      <tbody>
        {getTongTienXuatResponse ? getTongTienXuatResponse.data.map((value, index) => {
          return (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{value.phieuxuat.ngayxuat}</td>
              <td>{value.phieuxuat.user.ho} {value.phieuxuat.user.ten}</td>
              <td>{value.tongTienXuat}</td>
            </tr>
          );
        }) : 'Chưa có phiếu nhập'}

      </tbody>
    </table>
  </>
}
export default ThongKeTienXuat;