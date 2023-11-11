import httpClient from "../../utils/axiosInstance";
import useAxiosFunction from "../../hooks/useAxiosFunction";
const ThemSPUrl = '/Sanpham/them';

export const ThemSpService = () =>{
    
    const { response: ThemSpResponse, error: ThemSpError, loading:ThemSpLoading, axiosFetch: ThemSpRefetch } = useAxiosFunction();
    
    const callThemSp = (dataSP)=>{

        ThemSpRefetch({
            axiosInstance:httpClient, 
            method: 'POST', 
            url:ThemSPUrl, 
            requestConfig:{data: dataSP}
        });
    }
    return {ThemSpResponse,ThemSpError,ThemSpLoading,callThemSp}
}