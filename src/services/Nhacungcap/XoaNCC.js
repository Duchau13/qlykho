import httpClient from "../../utils/axiosInstance";
import useAxiosFunction from "../../hooks/useAxiosFunction";

export const XoaNCCByID = () =>{
    
    const { response: XoaNCCResponse, error: XoaNCCError, loading:XoaNCCLoading, axiosFetch: XoaNCCRefetch } = useAxiosFunction();
    
    const callXoaNCC = (idKho)=>{
        const XoaNCCUrl = `/NhaCungCap/xoa/${idKho}`;

        XoaNCCRefetch({
            axiosInstance:httpClient, 
            method: 'DELETE', 
            url:XoaNCCUrl, 
            requestConfig:{}
        });
    }
    return {XoaNCCResponse,XoaNCCError,XoaNCCLoading,callXoaNCC}
}