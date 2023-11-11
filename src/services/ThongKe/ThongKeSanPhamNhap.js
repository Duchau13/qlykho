import useAxios from "../../hooks/useAxios";
import httpClient from "../../utils/axiosInstance";

const getAllSanPhamNhapURL = '/phieunhap/soluongsanpham';

export const GetAllSanPhamNhapService = () => {
    const {
        response: getAllSanPhamNhapResponse,
        isLoading: getAllSanPhamNhapIsLoading,
        error: getAllSanPhamNhapError,
        refetch: getAllSanPhamNhapRefetch
      } = useAxios({
        axiosInstance: httpClient,
        method: 'GET',
        url: getAllSanPhamNhapURL,
        requestConfig: { }
      });
    
      return { getAllSanPhamNhapResponse, getAllSanPhamNhapIsLoading, getAllSanPhamNhapError, getAllSanPhamNhapRefetch };
}