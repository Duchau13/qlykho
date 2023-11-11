import httpClient from "../../utils/axiosInstance";
import useAxiosFunction from "../../hooks/useAxiosFunction";

export const SuaDMByID = () =>{
    
    const { response: SuaDMResponse, error: SuaDMError, loading:SuaDMLoading, axiosFetch: SuaDMRefetch } = useAxiosFunction();
    
    const callSuaDM = (idDM,data)=>{
        const SuaDMUrl = `/Danhmuc/sua/${idDM}`;

        SuaDMRefetch({
            axiosInstance:httpClient, 
            method: 'PUT', 
            url:SuaDMUrl, 
            requestConfig:{data:data}
        });
    }
    return {SuaDMResponse,SuaDMError,SuaDMLoading,callSuaDM}
}