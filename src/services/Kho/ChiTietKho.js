import useAxiosFunction from "../../hooks/useAxiosFunction";
import httpClient from "../../utils/axiosInstance";


export const ChiTietKho = () =>{
    
    const { response: ChiTietKhoResponse, error: ChiTietKhoError, loading:ChiTietKhoIsLoading, axiosFetch: ChiTietRefetch } = useAxiosFunction();
    
    const ChiTietKhoCall = (idKho)=>{
        const ChiTietUrl = `/vitrikho/kho/${idKho}`;

        ChiTietRefetch({
            axiosInstance:httpClient, 
            method: 'GET', 
            url:ChiTietUrl, 
            requestConfig:{}
        });
    }
    return { ChiTietKhoResponse, ChiTietKhoIsLoading, ChiTietKhoError, ChiTietKhoCall }
};