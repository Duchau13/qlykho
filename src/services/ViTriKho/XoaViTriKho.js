import httpClient from "../../utils/axiosInstance";
import useAxiosFunction from "../../hooks/useAxiosFunction";

export const XoaVTKhoByID = () =>{
    
    const { response: xoaVTKhoResponse, error: xoaVTKhoError, loading:xoaVTKhoLoading, axiosFetch: xoaVTKhoRefetch } = useAxiosFunction();
    
    const callXoaVTKho = (idVTKho)=>{
        const xoaVTKhoUrl = `/vitrikho/xoa/${idVTKho}`;

        xoaVTKhoRefetch({
            axiosInstance:httpClient, 
            method: 'DELETE', 
            url:xoaVTKhoUrl, 
            requestConfig:{}
        });
    }
    return {xoaVTKhoResponse,xoaVTKhoError,xoaVTKhoLoading,callXoaVTKho}
}