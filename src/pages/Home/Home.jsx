import React, { useEffect, useState } from 'react';
import {
    AppstoreOutlined, IdcardOutlined, DropboxOutlined, FolderOpenOutlined, CrownOutlined,
    VerticalAlignBottomOutlined,
    VerticalAlignTopOutlined,
    PieChartOutlined,
    ShopOutlined,
    GroupOutlined
} from '@ant-design/icons';
import { message } from 'antd';
import { Menu } from 'antd';

import Header from '../../components/Header/Header';
import Kho from '../../components/Kho/Kho';
import DanhMuc from '../../components/DanhMuc/DanhMuc';
import NhaCungCap from '../../components/NhaCungCap/NhaCungCap';
import QuanLyNhanVien from '../../components/QuanLyNhanVien/QuanLyNhanVien';
import PhieuNhap from '../../components/PhieuNhap/PhieuNhap';
import PhieuXuat from '../../components/PhieuXuat/PhieuXuat';
import ThongKe from '../../components/ThongKe/ThongKeSanPhamNhap';

import './Home.css'
import QuanLySanPham from '../../components/SanPham/QuanLySanPham';
import Footer from '../../components/Footer/Footer';
import ThongKeSanPhamNhap from '../../components/ThongKe/ThongKeSanPhamNhap';
import ThongKeSanPhamXuat from '../../components/ThongKe/ThongKeSanPhamXuat';
import ThongKeTienNhap from '../../components/ThongKe/ThongKeTienNhap';
import ThongKeTienXuat from '../../components/ThongKe/ThongKeTienXuat';

import { Messeage_login_03 } from '../../Messeages/Messeages';


function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

//Roll nhân viên thì tạo 1 items mới




const Home = () => {
    const NhanVienROLE = localStorage.getItem('role')
    const items = NhanVienROLE === "ADMIN" ? [
        {
            type: 'divider',
        },
        getItem('ADMIN', 'sub1', <CrownOutlined />, [
            getItem('Kho', '1', <DropboxOutlined />),
            getItem('Danh Mục', '2', <GroupOutlined />),
            getItem('Nhà Cung Cấp', '3', <ShopOutlined />),
            getItem('Quản lý Sản Phẩm', '4', <IdcardOutlined />),
            getItem('Quản lý Nhân Viên', '5', <IdcardOutlined />),
        ]),
        getItem('Thống kê', 'sub3', <FolderOpenOutlined />, [
            getItem('Thống kê sản phẩm nhập', '8', <PieChartOutlined />),
            getItem('Thống kê sản phẩm xuất', '9', <PieChartOutlined />),
            getItem('Thống kê doanh thu nhập', '10', <PieChartOutlined />),
            getItem('Thống kê doanh thu xuất', '11', <PieChartOutlined />),
        ]),
        getItem('Nhân Viên', 'sub2', <AppstoreOutlined />, [
            getItem('Phiếu Nhập', '6', <VerticalAlignBottomOutlined />),
            getItem('Phiếu xuất', '7', <VerticalAlignTopOutlined />),
        ]),

    ]
        :
        [
            {
                type: 'divider',
            },
            getItem('ADMIN', 'sub1', <CrownOutlined />, [
            ]),
            getItem('Thống kê', 'sub3', <FolderOpenOutlined />, [
                getItem('Thống kê sản phẩm nhập', '8', <PieChartOutlined />),
                getItem('Thống kê sản phẩm xuất', '9', <PieChartOutlined />),
                getItem('Thống kê doanh thu nhập', '10', <PieChartOutlined />),
                getItem('Thống kê doanh thu xuất', '11', <PieChartOutlined />),
            ]),
            getItem('Nhân Viên', 'sub2', <AppstoreOutlined />, [
                getItem('Phiếu Nhập', '6', <VerticalAlignBottomOutlined />),
                getItem('Phiếu xuất', '7', <VerticalAlignTopOutlined />),
            ]),

        ];



    const [tab, setTab] = useState('1');
    var [render, setRender] = useState(true);

    const [messageApi, contextHolder] = message.useMessage();

    const success = (message) => {
        messageApi.open({
            type: 'success',
            content: message,
        });
    };

    useEffect(() => {
        if (render) {
            setRender(false);
        } else {
            success(Messeage_login_03);

        }
    }, [render]);


    const onClick = (e) => {
        setTab(e.key);
    };

    return (
        <>
            {contextHolder}

            <Header UserInfor />

            <div className='Container'>
                <div>
                    <Menu className='Menu__navbar'
                        onClick={onClick}
                        style={{
                            width: 256,
                        }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        items={items}
                    />
                </div>

                <div className="table__content" style={{ flex: 1 }}>

                    {
                        tab === '1' ? <Kho /> : ''
                    }
                    {
                        tab === '2' ? <DanhMuc /> : ''
                    }
                    {
                        tab === '3' ? <NhaCungCap /> : ''
                    }
                    {
                        tab === '4' ? <QuanLySanPham /> : ''
                    }
                    {
                        tab === '5' ? <QuanLyNhanVien /> : ''
                    }
                    {
                        tab === '6' ? <PhieuNhap /> : ''
                    }
                    {
                        tab === '7' ? <PhieuXuat /> : ''
                    }
                    {
                        tab === '8' ? <ThongKeSanPhamNhap /> : ''
                    }
                    {
                        tab === '9' ? <ThongKeSanPhamXuat /> : ''
                    }
                    {
                        tab === '10' ? <ThongKeTienNhap /> : ''
                    }
                    {
                        tab === '11' ? <ThongKeTienXuat /> : ''
                    }
                </div>

            </div>
            <Footer />
        </>
    );
};
export default Home;