import useAxios from "../../hooks/useAxios";
import httpClient from "../../utils/axiosInstance";

const getAllSanPhamXuatURL = '/PhieuXuat/soluongsanpham';

export const GetAllSanPhamXuatService = () => {
    const {
        response: getAllSanPhamXuatResponse,
        isLoading: getAllSanPhamXuatIsLoading,
        error: getAllSanPhamXuatError,
        refetch: getAllSanPhamXuatRefetch
      } = useAxios({
        axiosInstance: httpClient,
        method: 'GET',
        url: getAllSanPhamXuatURL,
        requestConfig: { }
      });
    
      return { getAllSanPhamXuatResponse, getAllSanPhamXuatIsLoading, getAllSanPhamXuatError, getAllSanPhamXuatRefetch };
}