import httpClient from "../../utils/axiosInstance";
import useAxiosFunction from "../../hooks/useAxiosFunction";

export const XoaKhoByID = () =>{
    
    const { response: xoaKhoResponse, error: xoaKhoError, loading:xoaKhoLoading, axiosFetch: xoaKhoRefetch } = useAxiosFunction();
    
    const callXoaKho = (idKho)=>{
        const xoaKhoUrl = `/kho/xoa/${idKho}`;

        xoaKhoRefetch({
            axiosInstance:httpClient, 
            method: 'DELETE', 
            url:xoaKhoUrl, 
            requestConfig:{}
        });
    }
    return {xoaKhoResponse,xoaKhoError,xoaKhoLoading,callXoaKho}
}