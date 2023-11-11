import httpClient from "../../utils/axiosInstance";
import useAxiosFunction from "../../hooks/useAxiosFunction";
const ThemNCCUrl = '/NhaCungCap/them';

export const ThemNCCService = () =>{
    
    const { response: themNCCResponse, error: themNCCError, loading:themNCCLoading, axiosFetch: themNCCRefetch } = useAxiosFunction();
    
    const callThemNCC = (dataNCC)=>{

        themNCCRefetch({
            axiosInstance:httpClient, 
            method: 'POST', 
            url:ThemNCCUrl, 
            requestConfig:{data: dataNCC}
        });
    }
    return {themNCCResponse,themNCCError,themNCCLoading,callThemNCC}
}