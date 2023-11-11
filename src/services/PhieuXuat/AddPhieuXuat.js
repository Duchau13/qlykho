import httpClient from "../../utils/axiosInstance";
import useAxiosFunction from "../../hooks/useAxiosFunction";
const ThemPXSPUrl = '/PhieuXuat/create';

export const ThemPXSpService = () =>{
    
    const { response: ThemPXSPUrlResponse, 
        error: ThemPXSPUrlError, 
        loading:ThemPXSPUrlLoading, 
        axiosFetch: ThemPXSPUrlRefetch } = useAxiosFunction();
    
    const callThemPXSPUrl = (dataPXSP)=>{

        ThemPXSPUrlRefetch({
            axiosInstance:httpClient, 
            method: 'POST', 
            url:ThemPXSPUrl, 
            requestConfig:{data: dataPXSP}
        });
    }
    return {ThemPXSPUrlResponse,ThemPXSPUrlError,ThemPXSPUrlLoading,callThemPXSPUrl}
}