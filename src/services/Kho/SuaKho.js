import httpClient from "../../utils/axiosInstance";
import useAxiosFunction from "../../hooks/useAxiosFunction";

export const SuaKhoByID = () =>{
    
    const { response: SuaKhoResponse, error: SuaKhoError, loading:SuaKhoLoading, axiosFetch: SuaKhoRefetch } = useAxiosFunction();
    
    const callSuaKho = (idKho,data)=>{
        const SuaKhoUrl = `/kho/sua/${idKho}`;

        SuaKhoRefetch({
            axiosInstance:httpClient, 
            method: 'PUT', 
            url:SuaKhoUrl, 
            requestConfig:{data:data}
        });
    }
    return {SuaKhoResponse,SuaKhoError,SuaKhoLoading,callSuaKho}
}