import httpClient from "../../utils/axiosInstance";
import useAxiosFunction from "../../hooks/useAxiosFunction";

export const SuaSPByID = () =>{
    
    const { response: SuaSPResponse, error: SuaSPError, loading:SuaSPLoading, axiosFetch: SuaSPRefetch } = useAxiosFunction();
    
    const callSuaSP = (idSP,data)=>{
        const SuaSPUrl = `/Sanpham/sua/${idSP}`;

        SuaSPRefetch({
            axiosInstance:httpClient, 
            method: 'PUT', 
            url:SuaSPUrl, 
            requestConfig:{data:data}
        });
    }
    return {SuaSPResponse,SuaSPError,SuaSPLoading,callSuaSP}
}