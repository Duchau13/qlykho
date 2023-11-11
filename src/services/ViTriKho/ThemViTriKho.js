import httpClient from "../../utils/axiosInstance";
import useAxiosFunction from "../../hooks/useAxiosFunction";
const ThemVTKhoUrl = '/vitrikho/them';

export const ThemVTKhoService = () =>{
    
    const { response: ThemVTKhoResponse, error: ThemVTKhoError, loading:ThemVTKhoLoading, axiosFetch: ThemVTKhoRefetch } = useAxiosFunction();
    
    const callThemVTKho = (dataKho)=>{

        ThemVTKhoRefetch({
            axiosInstance:httpClient, 
            method: 'POST', 
            url:ThemVTKhoUrl, 
            requestConfig:{data: dataKho}
        });
    }
    return {ThemVTKhoResponse,ThemVTKhoError,ThemVTKhoLoading,callThemVTKho}
}