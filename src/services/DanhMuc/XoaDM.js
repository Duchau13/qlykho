import httpClient from "../../utils/axiosInstance";
import useAxiosFunction from "../../hooks/useAxiosFunction";

export const XoaDMByID = () =>{
    
    const { response: XoaDMResponse, error: XoaDMError, loading:XoaDMLoading, axiosFetch: XoaDMRefetch } = useAxiosFunction();
    
    const callXoaDM = (idDM)=>{
        const XoaDMUrl = `/Danhmuc/xoa/${idDM}`;

        XoaDMRefetch({
            axiosInstance:httpClient, 
            method: 'DELETE', 
            url:XoaDMUrl, 
            requestConfig:{}
        });
    }
    return {XoaDMResponse,XoaDMError,XoaDMLoading,callXoaDM}
}