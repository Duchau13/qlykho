import httpClient from "../../utils/axiosInstance";
import useAxiosFunction from "../../hooks/useAxiosFunction";
const themDMUrl = '/Danhmuc/them';

export const ThemDMService = () =>{
    
    const { response: themDMResponse, error: themDMError, loading:themDMLoading, axiosFetch: themDMRefetch } = useAxiosFunction();
    
    const callthemDM = (dataDM)=>{

        themDMRefetch({
            axiosInstance:httpClient, 
            method: 'POST', 
            url:themDMUrl, 
            requestConfig:{data: dataDM}
        });
    }
    return {themDMResponse,themDMError,themDMLoading,callthemDM}
}