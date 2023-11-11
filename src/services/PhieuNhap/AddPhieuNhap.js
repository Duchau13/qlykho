import httpClient from "../../utils/axiosInstance";
import useAxiosFunction from "../../hooks/useAxiosFunction";
const ThemPNSPUrl = 'phieunhap/create';

export const ThemPNSpService = () =>{
    
    const { response: ThemPNSPUrlResponse, 
        error: ThemPNSPUrlError, 
        loading:ThemPNSPUrlLoading, 
        axiosFetch: ThemPNSPUrlRefetch } = useAxiosFunction();
    
    const callThemPNSPUrl = (dataPNSP)=>{

        ThemPNSPUrlRefetch({
            axiosInstance:httpClient, 
            method: 'POST', 
            url:ThemPNSPUrl, 
            requestConfig:{data: dataPNSP}
        });
    }
    return {ThemPNSPUrlResponse,ThemPNSPUrlError,ThemPNSPUrlLoading,callThemPNSPUrl}
}