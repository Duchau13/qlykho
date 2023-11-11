import httpClient from "../../utils/axiosInstance";
import useAxiosFunction from "../../hooks/useAxiosFunction";

export const SuaNCCByID = () =>{
    
    const { response: SuaNCCResponse, error: SuaNCCError, loading:SuaNCCLoading, axiosFetch: SuaNCCRefetch } = useAxiosFunction();
    
    const callSuaNCC = (idNCC,data)=>{
        const SuaNCCUrl = `/NhaCungCap/sua/${idNCC}`;

        SuaNCCRefetch({
            axiosInstance:httpClient, 
            method: 'PUT', 
            url:SuaNCCUrl, 
            requestConfig:{data:data}
        });
    }
    return {SuaNCCResponse,SuaNCCError,SuaNCCLoading,callSuaNCC}
}