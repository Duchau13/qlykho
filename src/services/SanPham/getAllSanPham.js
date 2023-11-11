import useAxios from "../../hooks/useAxios";
import httpClient from "../../utils/axiosInstance";

const getAllSanPhamUrl = '/Sanpham';

export const GetAllSanPhamService = () => {
    const {
        response: getAllSanPhamResponse,
        isLoading: getAllSanPhamIsLoading,
        error: getAllSanPhamError,
        refetch: getAllSanPhamRefetch
      } = useAxios({
        axiosInstance: httpClient,
        method: 'GET',
        url: getAllSanPhamUrl,
        requestConfig: { }
      });
    
      return { getAllSanPhamResponse, getAllSanPhamIsLoading, getAllSanPhamError, getAllSanPhamRefetch };
}