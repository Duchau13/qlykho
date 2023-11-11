import httpClient from "../../utils/axiosInstance";
import useAxiosFunction from "../../hooks/useAxiosFunction";
const ThemKhoUrl = '/kho/them';

export const ThemKhoService = () =>{
    
    const { response: themKhoResponse, error: themKhoError, loading:themKhoLoading, axiosFetch: themKhoRefetch } = useAxiosFunction();
    
    const callThemKho = (dataKho)=>{

        themKhoRefetch({
            axiosInstance:httpClient, 
            method: 'POST', 
            url:ThemKhoUrl, 
            requestConfig:{data: dataKho}
        });
    }
    return {themKhoResponse,themKhoError,themKhoLoading,callThemKho}
}