import React, { useEffect, useState } from "react";
import { DoubleRightOutlined, LoginOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

import { message } from 'antd';
import Avatar from "../../accets/ImgUser/Avatar.jpg";
import './Header.css'
import SuaTTCaNhan from "../Action/Sua/SuaTTCaNhan/SuaTTCaNhan";

import { GetUserByID } from "../../services/AuthService/getUserByID";


const Header = () => {
    const { getInforUserResponse, getInforUserIsLoading, getInforUserError, getRefetch } = GetUserByID();
    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Đổi thông tin thành công!',
        });
    };


    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <>
        {contextHolder}
            <div className="header">
                <div className={getInforUserResponse ? "" : "color-White"} style={{ display: 'flex', alignItems: 'center', gap: 20 + 'px' }}>
                    <div className="Header__IconTitle">
                        <DoubleRightOutlined />
                    </div>
                    <div className="header__NamePage">Quản Lý Kho</div>
                </div>

                {getInforUserResponse ? <div style={{ display: 'flex', alignItems: 'center', gap: 20 + 'px' }}>
                    <div className="User" title="SỬa thông tin cá nhân!" onClick={() => setToggle(!toggle)}>
                        <div className="User__Img">
                            <img src={Avatar} alt="Avartar" />
                        </div>
                        <div className="User_name">
                            {getInforUserResponse.data.ho + " " + getInforUserResponse.data.ten}
                        </div>
                    </div>
                    <div onClick={handleLogOut} title="Đăng Xuất" className="LogOut">
                        <LoginOutlined />
                    </div>
                </div> : ''}

            </div>
            {toggle ?
                <div className="container_FormThemTK">
                    <SuaTTCaNhan successTT={success} getInforUserResponse={getInforUserResponse} setToggle={setToggle} getRefetch={getRefetch}/>
                </div> : ''
            }
        </>
    )
}
export default Header;