import useAxiosFunction from "../../hooks/useAxiosFunction";
import httpClient from "../../utils/axiosInstance";


export const GetChiTietSanPham = () =>{
    
    const { response: ChiTietSanPhamResponse, error: ChiTietSanPhamError, loading:ChiTietSanPhamIsLoading, axiosFetch: ChiTietSanPhamRefetch } = useAxiosFunction();
    
    const ChiTietSanPhamCall = (idSP)=>{
        const ChiTietUrl = `/Sanpham/${idSP}`;

        ChiTietSanPhamRefetch({
            axiosInstance:httpClient, 
            method: 'GET', 
            url:ChiTietUrl, 
            requestConfig:{}
        });
    }
    return { ChiTietSanPhamResponse, ChiTietSanPhamIsLoading, ChiTietSanPhamError, ChiTietSanPhamCall }
};